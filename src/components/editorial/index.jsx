import { useParams } from 'react-router-dom'
import Collections from './collections'
import Documents from './documents'
import Editor from './editor'

export default () => {
    const { owner, repo, branch, collection, document } = useParams()

    if (!collection)
        return <Collections owner={owner} repo={repo} branch={branch} />
    if (!document)
        return <Documents owner={owner} repo={repo} branch={branch} collection={collection} />
    return <Editor owner={owner} repo={repo} branch={branch} collection={collection} document={document} />
}