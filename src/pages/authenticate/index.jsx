import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { useClient } from '../../lib/moonbase'
import Error from '../../components/error'
import Loader from '../../components/loader'

export default () => {
    const auth = useAuth()
    const client = useClient()
    const navigate = useNavigate()
    const { code } = useParams()
    const [error, setError] = useState(null)

    const onError = () => {
        navigate('/login', { replace: true })
    }
    useEffect(() => {
        if (!localStorage.getItem("artemis_auth")) {
            // React.StrictMode renders components twice (on dev but not production)
            localStorage.setItem("artemis_auth", code)
            return
        }
        localStorage.removeItem("artemis_auth")
        client.get(`/login/github/authenticate/${code}`).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            auth.signin(data, () => {
                navigate('/', { replace: true })
            })
        }).catch(err => {
            setError(err.message)
        })
    }, [code])

    return <div className="flex items-center justify-center h-screen">
        {!error ? <Loader color="text-zinc-700" /> : <Error error={error} onClose={onError} />}
    </div>
}
