
import { useState } from 'react'

const pad = (num) => (num < 10 ? '0' + num : num + '')

const fieldValidators = {
    required: {
        pattern: /.+/,
        message: 'This field is required'
    },
    nowhitespace: {
        pattern: /[^\s]*/,
        message: 'Whitespaces are not allowed'
    },
    number: {
        pattern: /^(\d+)?$/,
        message: 'Only whole numbers are allowed'
    },
    float: {
        pattern: /^(\d+(\.\d+)?)?$/,
        message: 'Only numeric values are allowed'
    },
    fraction: val => (!!val && (val < 0 || val > 1) &&
        'Value has to be greater or equal to 0 and lower or equal to 1'
    ),
    date: (val, time) => {
        if (val) {
            const date = new Date(val);
            const valid = date instanceof Date && !isNaN(date);
            if (!valid) return `Please enter a valid ${time ? 'date and time' : 'date'}`;
        }
        return null;
    },
    datetime: val => fieldValidators.date(val, true),
    match: (field, fieldName, name) => val => {
        if (field != val) {
            return `${name || 'Value'} doesn't match ${fieldName}`
        }
    },
    json: val => {
        try {
            JSON.parse(val);
            return;
        } catch (e) { }
        return 'JSON is invalid'
    },
    size: (s) => (val) => (!!val && val.length != s),
    min: (m) => (val) => (!!val && val < m),
    max: (m) => (val) => (!!val && val > m)
}

const getType = (type) => {
    switch (type) {
        case 'int':
        case 'float':
        case 'fraction':
            return 'number'
        case 'bool':
            return 'checkbox'
        case 'date':
            return 'date'
        case 'datetime':
            return 'datetime-local'
        case 'text':
        default: // reference
            return 'text'
    }
}

const parseValue = (type, value) => {
    switch (type) {
        case 'int':
            return parseInt(value)
        case 'float':
        case 'fraction':
            return parseFloat(value)
        case 'date':
        case 'datetime':
            return new Date(value)
        case 'text':
        case 'object':
        default: // reference
            return value
    }
}

export default function FieldInput({ field, value, onChange, ...rest }) {
    const [invalid, setInvalid] = useState(false)
    let initialValues

    const validate = (value) => {
        // TODO: use validators by field.validations
        onChange(parseValue(field.type, value), field.id)
    }

    if (field.type == 'bool') {
        initialValues = {
            value: field.id,
            name: field.id,
            defaultChecked: ((!!value || !!field.defaultValue) && 'checked') || '',
            onClick: (e) => onChange(e.target.checked, field.id)
        }
    } else if (field.type == 'date' || field.type == 'datetime' && (value || field.defaultValue)) {
        const date = new Date(value || field.defaultValue);
        let dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
        if (field.type == 'datetime') {
            dateString += `T${pad(date.getHours())}:${pad(date.getMinutes())}`
        }
        initialValues = {
            defaultValue: dateString,
            onChange: (e) => validate(e.target.value)
        }
    } else {
        initialValues = {
            defaultValue: value || field.defaultValue || '',
            onChange: (e) => validate(e.target.value)
        }
    }

    return ((field.type == 'object') ?
            (<textarea rows="10" {...initialValues} {...rest} />) :
            (<input type={getType(field.type)} {...initialValues} {...rest} />))
}

