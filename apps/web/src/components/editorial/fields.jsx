
import { useState, useEffect } from 'react'
import { defaultLocale } from '../../lib/moonbase'
import FieldInput from './field-input'

export default function Fields({ fields, field, onChange, ...rest }) {
    let localizedValues;
    if (field.localized) {
        localizedValues = Object.entries(fields[field.id])
    }
    return (<div>
        <div className={"md:flex md:items-center" + (!field.list && !field.localized ? " mb-6" : "")}>
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={field.id}>
                    {field.label}
                </label>
            </div>
            <div className="md:w-2/3">
                {!field.list && !field.localized &&
                    <Field className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={fields[field.id] && fields[field.id][defaultLocale]} onChange={onChange} field={field} locale={defaultLocale} />
                }
                {/* {field.list && !field.localized &&
                    <div className="md:w-1/6">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded" onClick={onListAddDelete} id={`${field.id}_${defaultLocale}-add`}>
                            +
                        </button>
                    </div>
                } */}
            </div>
        </div>
        {field.localized ? localizedValues.map(([l, v], i) => {
            return (<div className={"md:flex md:items-center " + (i == localizedValues.length - 1 ? "mb-6" : "mb-1")} key={`${field.id}_${l}`}>
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={`${field.id}_${l}`}>
                        {l}
                    </label>
                </div>
                <div className="md:w-2/3">
                    <Field className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={v} onChange={onChange} field={field} locale={l} />
                </div>
            </div>
            )
        }) : field.list && (<div className="md:flex md:items-center mb-1" key={`${field.id}`}>
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={`${field.id}`}>
                </label>
            </div>
            <div className="md:w-2/3">
                <Field className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={fields[field.id] && fields[field.id][defaultLocale]} onChange={onChange} field={field} locale={defaultLocale} />
            </div>
        </div>
        )}
    </div>)
}


const Field = ({ field, ...rest }) => {
    return (field.list ?
        <FieldList field={field} {...rest} /> :
        <FieldInput field={field} {...rest} />
    )
}


const FieldList = ({ field, value, onChange, locale }) => {
    const [list, setList] = useState(value)

    const onListChange = (idx) => (value) => {
        list[idx] = value
        onChange(list, field.id, locale)
        setList(list)
    }

    const onListMove = (elem, to) => {
        const s = Number(elem.dataset.idx)
        list.splice(to, 0, list.splice(idx, 1)[0]);
        onChange(list, field.id, locale)
        setList(list)
    }

    const onListAdd = () => {
        list.push(null)
        onChange(list, field.id, locale)
        setList(list)
    }

    const onListDelete = (e) => {
        const idx = Number(e.currentTarget.dataset.idx)
        list.splice(idx, 1)
        onChange(list, field.id, locale)
        setList(list)
    }

    return (<div>
        {list?.map((e, i) => (<div className="md:flex md:items-center mb-1" key={`${field.id}_${locale}-${i}`} draggable="true">
            <div className="md:flex md:items-center w-full">
                <div className="flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400 mr-2 draggable" >
                    <svg className="w-4 fill-current text-gray-600" color="gray-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </div>
                <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={e} onChange={onListChange(i)} field={field} id={`${field.id}_${locale}-${i}`} />
            </div>
            <div className="flex-auto ml-2">
                <button className="border-2 border-gray-200 hover:bg-blue-200 text-gray font-bold py-2 px-3 rounded" onClick={onListDelete} id={`${field.id}_${locale}-${i}-delete`} data-idx={i}>
                    <svg className="w-4 fill-current text-gray" color="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>
            </div>
        </div>))}
        <div className="md:flex md:items-center mb-6">
            <button className="border-2 border-gray-200 hover:bg-blue-200 text-gray font-bold py-2 px-3 rounded" onClick={onListAdd} id={`${field.id}_${locale}-add`}>
                <svg className="w-4 fill-current text-gray" color="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
            </button>
        </div>
    </div>)
}





//     (<div className="md:flex md:items-center mb-6" key={`${field.id}-${i}`}>
//             <div className="md:w-1/3">
//                 {!i && (<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={`${field.id}-0`}>
//                     {field.label}
//                 </label>)}
//             </div>
//             <div className="md:w-2/3">
//                 <div className="md:w-5/6">
//                     <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value={e} onChange={onListChange} field={field} id={`${field.id}-${i}`} data-idx={i} />
//                 </div>
//                 <div className="md:w-1/6">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onListDelete} id={`${field.id}-${i}-delete`} data-idx={i}>
//                         -
//                     </button>
//                 </div>
//             </div>
//         </div >))}
//         {(!items.length || items[items.length - 1] != '') && (<div className="md:flex md:items-center mb-6" key={field.id}>
//             <div className="md:w-1/3">
//                 {!items.length && (<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={field.id}>
//                     {field.label}
//                 </label>)}
//             </div>
//             <div className="md:w-2/3">
//                 {showAdd ? (
//                     <FieldInput className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-zinc-400" value="" onChange={onListAdd} field={field} id={`${field.id}-${items.length}`} data-idx={items.length} />
//                 ) : (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showAddClick} id={field.id}>
//                     Add new
//                 </button>)}
//             </div>
//         </div >)}
//     </>)
// }