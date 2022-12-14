export const endpoints = {
    repos: () => ("/repos"),
    branches: (owner, repo) => (`/repos/${owner}/${repo}/branches`),
    tree: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/tree/${branch}/${path}`),
    blob: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/blob/${branch}/${path}`),

    info: (owner, repo, branch) => (`/cms/${owner}/${repo}/${branch}`),
    collections: (owner, repo, branch) => (`/cms/${owner}/${repo}/${branch}/collections`),
    collection: (owner, repo, branch, collection) => (`/cms/${owner}/${repo}/${branch}/collections/${collection}`),
    entry: (owner, repo, branch, collection, entry) => (`/cms/${owner}/${repo}/${branch}/collections/${collection}/${entry}`),

    components: (owner, repo, branch, sandpack) => (`/cms/${owner}/${repo}/${branch}/components?sandpack=${sandpack}`),
}
