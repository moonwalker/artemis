import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../../lib/auth'
import { useClient } from '../../lib/moonbase'
import Error from '../../components/error'
import Loader from '../../components/loader'

export default () => {
    const [error, setError] = useState(null)
    const auth = useAuth()
    const client = useClient()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { code } = state || {}

    const onError = () => {
        navigate('/login', { replace: true });
    }
    useEffect(() => {
        if (!localStorage.getItem("moonbase_auth")) {
            // StrictMode renders components twice (on dev but not production)
            localStorage.setItem("moonbase_auth", code)
            return
        }
        localStorage.removeItem("moonbase_auth")
        client.get(`/login/github/authenticate/${code}`).then(data => {
            if (data.error) {
                return setError(data.error)
            }
            auth.signin(data, () => {
                navigate('/', { replace: true });
            })
        }).catch(err => {
            setError(err.message)
        })
    }, [])

    return <div className="flex items-center justify-center h-screen">
        {!error ? <Loader color="text-zinc-700" /> : <Error error={error} onClose={onError} />}
    </div>
}
