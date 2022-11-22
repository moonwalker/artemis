import { useParams, useLocation } from 'react-router-dom'

export default () => {
    const location = useLocation()
    const params = useParams()
    console.log(location, params)

    return <div>Tree/Blob</div>
}