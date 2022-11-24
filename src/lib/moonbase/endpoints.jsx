export const endpoints = {
    repos: () => ("/repos"),
    branches: (owner, repo) => (`/repos/${owner}/${repo}/branches`),
    tree: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/tree/${branch}/${path}`),
    blob: (owner, repo, branch, path) => (`/repos/${owner}/${repo}/blob/${branch}/${path}`),

    collections: (owner, repo, branch) => (`/cms/${owner}/${repo}/${branch}`),
    collection: (owner, repo, branch, collection) => (`/cms/${owner}/${repo}/${branch}/${collection}`),
    document: (owner, repo, branch, collection, document) => (`/cms/${owner}/${repo}/${branch}/${collection}/${document}`),
}