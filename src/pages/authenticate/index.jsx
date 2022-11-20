import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../../lib/auth'
import { useClient } from '../../lib/moonbase'
import Error from '../../components/error'
import Loader from '../../components/loader'

export default () => {
    const [error, setError] = useState()
    const auth = useAuth()
    const client = useClient()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { code, from = '/' } = state || {}

    const onError = () => {
        navigate('/login', { replace: true });
    }

    useEffect(() => {
        if (!!code && !auth.user && !error) {
            client.get(`/login/github/authenticate/${code}`).then(user => {
                auth.signin(data, () => {
                    navigate(from, { replace: true });
                })
            }).catch(err => {
                setError(err.message)
            })
        }
    }, [])

    return <div class="flex items-center justify-center h-screen">
        {!error ? <Loader color="text-zinc-700" /> : <Error error={error} onClose={onError} />}
    </div>
}
