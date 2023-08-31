
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
        case 'json':
        default: // reference
            return value
    }
}

export default function FieldInput({ field, value, onChange, locale, ...rest }) {
    const [invalid, setInvalid] = useState(false)
    let initialValues

    const validate = (value) => {
        // TODO: use validators by field.validations
        onChange(parseValue(field.type, value), field.id, locale)
    }

    if (field.type == 'bool') {
        initialValues = {
            value: field.id,
            name: field.id,
            defaultChecked: ((!!value || !!field.defaultValue) && 'checked') || '',
            onClick: (e) => onChange(e.target.checked, field.id, locale),
            style: { 'width': 'auto' }
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
    } else if (field.type == 'json') {
        initialValues = {
            defaultValue: JSON.stringify(value || field.defaultValue || {}, null, 2),
            onChange: (e) => validate(e.target.value)
        }
    } else {
        initialValues = {
            defaultValue: value || field.defaultValue || '',
            onChange: (e) => validate(e.target.value)
        }
    }

    if (field.type == 'object' || field.type == 'json' || field.type == 'longtext') {
        return (<textarea rows="10" {...initialValues} {...rest} />)
    }
    if (field.type == 'bool') {
        // return (<button className="border-2 border-gray-200 text-gray py-2 px-3 rounded" {...initialValues} >
        //     {value ? (<svg className="w-4 fill-current text-gray" color="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        //         <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        //     </svg>) :
        //         (<svg className="w-4 fill-current text-gray" color="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        //             <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        //         </svg>)}
        // </button>)
        return (<label className="ml-2">
            <input className="tick" type="checkbox" {...initialValues} />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current text-gray" color="gray" viewBox="0 0 448 512">
                <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current text-gray" color="gray" viewBox="0 0 448 512">
                <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
        </label>)
    }
    return (<input type={getType(field.type)} {...initialValues} {...rest} />)
}
