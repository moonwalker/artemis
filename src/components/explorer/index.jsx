import { Navigate, useParams } from 'react-router-dom'
import Editor from './editor'
import Explorer from './explorer'

export default () => {
    const { owner, repo, element, branch, ['*']: path } = useParams()

    if (element == 'blob')
        return <Editor owner={owner} repo={repo} branch={branch} path={path} />
    if (element == 'tree')
        return <Explorer owner={owner} repo={repo} branch={branch} path={path} />
    return <Navigate to="/error/404" />
}