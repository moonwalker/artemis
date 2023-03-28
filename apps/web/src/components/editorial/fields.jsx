
import { useState, useEffect } from 'react'
import FieldInput from './field-input'

export default function Fields({ schema, content, setValue }) {

    return schema?.fields?.map(f =>
        f.list ?
            (<FieldList field={f} list={content[f.id]} onChange={setValue} key={f.id}></FieldList>)
            :
            (<div className="md:flex md:items-center mb-6" key={f.id}>
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={f.id}>
                        {f.label}
                    </label>
                </div>
                <div className="md:w-2/3">
                    <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={content.fields[f.id]} onChange={setValue} field={f} id={f.id} />
                </div>
            </div >)
    )
}

const FieldList = ({ field, list, onChange }) => {
    let [items, setItems] = useState([])
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        // action on update of movies
        console.log(list)
    }, [list]);

    if (!!list) {
        list.each(e => items.push(e))
    }

    const onListChange = (value, elem) => {
        const s = elem.split('-')
        const id = s[0]
        const idx = Number(s[1])
        items[idx] = value
        onChange(items, id)
        setItems(items)
    }

    const onListMove = (elem, to) => {
        const s = elem.split('-')
        const id = s[0]
        const idx = Number(s[1])
        items.splice(to, 0, items.splice(idx, 1)[0]);
        onChange(items, id)
        setItems(items)
    }

    const onListAdd = (value, id) => {
        items.push(value)
        onChange(items, id)
        setItems(items)
    }

    const onListDelete = (e) => {
        const s = e.target.id.split('-')
        const id = s[0]
        const idx = Number(s[1])
        items.splice(idx, 1)
        onChange(items, id)
        setItems(items)
    }

    const showAddClick = () => {
        setShowAdd(true)
    }

    return (<>{(!items.length || items[items.length - 1] != '') && items?.length || 0}
        {items.map((e, i) => (<div className="md:flex md:items-center mb-6" key={`${field.id}-${i}`}>
            <div className="md:w-1/3">
                {!i && (<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={`${field.id}-0`}>
                    {field.label}
                </label>)}
            </div>
            <div className="md:w-2/3">
                <div className="md:w-5/6">
                    <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={e} onChange={onListChange} field={field} id={`${field.id}-${i}`} data-idx={i} />
                </div>
                <div className="md:w-1/6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onListDelete} id={`${field.id}-${i}-delete`} data-idx={i}>
                        -
                    </button>
                </div>
            </div>
        </div >))}
        {(!items.length || items[items.length - 1] != '') && (<div className="md:flex md:items-center mb-6" key={field.id}>
            <div className="md:w-1/3">
                {!items.length && (<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={field.id}>
                    {field.label}
                </label>)}
            </div>
            <div className="md:w-2/3">
                {showAdd ? (
                    <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value="" onChange={onListAdd} field={field} id={`${field.id}-${items.length}`} data-idx={items.length} />
                ) : (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showAddClick} id={field.id}>
                    Add new
                </button>)}
            </div>
        </div >)}
    </>)
}