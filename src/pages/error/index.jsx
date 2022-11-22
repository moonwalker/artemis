import { useParams } from 'react-router-dom'
import Error403 from './403'
import Error404 from './404'
import Error500 from './500'
import networkImage from '../../assets/logo.png'

export default () => {
    const { code } = useParams()
    return <div className="flex items-center justify-center h-screen">
        <div className="rounded-lg border shadow-lg p-10">
            <div>
                <img className="mx-auto w-auto" src={networkImage} alt="Artemis" />
            </div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    {
                        {
                            '403': <Error403 />,
                            '404': <Error404 />,
                            '500': <Error500 />
                        }[code]
                    }
                </div>
            </div>
        </div>
    </div>
}
