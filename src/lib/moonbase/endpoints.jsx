export const endpoints = {
    repos: () => ("/repos"),
    branches: (owner, repo) => (`/repos/${owner}/${repo}/branches`),
    tree: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/tree/${branch}/${path}`),
    blob: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/blob/${branch}/${path}`),

    collections: (owner, repo, branch) => (`/cms/${owner}/${repo}/${branch}`),
    documents: (owner, repo, branch, collection) => (`${this.collections(owner, repo, branch)}/${collection}`),
    document: (owner, repo, branch, collection, document) => (`${this.documents(owner, repo, branch, collection)}/${document}`),
}