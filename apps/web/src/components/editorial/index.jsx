import { useParams } from 'react-router-dom'
import Collections from './collections'
import Entries from './entries'
import Editor from './editor'

export default () => {
    const { owner, repo, branch, collection, entry } = useParams()

    if (!collection)
        return <Collections owner={owner} repo={repo} branch={branch} />
    if (!entry)
        return <Entries owner={owner} repo={repo} branch={branch} collection={collection} />
    return <Editor owner={owner} repo={repo} branch={branch} collection={collection} entry={entry} />
}