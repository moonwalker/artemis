import './loader.css'

export default function Loader({ color }) {
    return <div className={"loader" + (color ? (' ' + color) : '')}></div>
}