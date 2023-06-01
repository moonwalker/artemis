import * as React from "react";
import { getToken, unauthorized } from '../auth'
export * from './endpoints'
export * from './utils'

interface ClientType {
    apiUrl: string,
    get: (endpoint: string, params?: any) => Promise<any>
    post: (endpoint: string, data: any) => Promise<any>
    del: (endpoint: string) => Promise<any>
}

const ClientContext = React.createContext<ClientType>(null!);

class Client implements ClientType {
    apiUrl: string
    get = (url: string, params?: any): Promise<any> => {
        if (!!params) {
            url += `?${new URLSearchParams(params).toString()}`
        }
        return call('GET', this.apiUrl + url)
    }
    post = (url: string, data: any): Promise<any> => {
        return call('POST', this.apiUrl + url, data)
    }
    put = (url: string, data: any): Promise<any> => {
        return call('PUT', this.apiUrl + url, data)
    }
    del = (url: string): Promise<any> => {
        return call('DELETE', this.apiUrl + url)
    }
    upload = (url: string, file: any, cb?: () => void): Promise<any> => {
        return upload(this.apiUrl + url, file, cb)
    }
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }
}

const call = async (method: string, url: string, data?: any): Promise<any> => {
    const body = data ? JSON.stringify(data) : null
    const headers = {
        'Content-Type': 'application/json'
    }

    const authtoken = getToken()
    if (!!authtoken) {
        Object.assign(headers, {
            'Authorization': `Bearer ${authtoken}`
        })
    }

    const response = (await fetch(url, { method, headers, body }))
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const res = response.json()
        if (!response.ok) {
            return res.then(data => {
                if (response.status == 401 || response.status == 403) {
                    unauthorized()
                    history.replaceState(location.pathname, '', '/error/403')
                } else
                    return { error: data.message }
            })
        }
        return res
    }

    return response.text()
}

const upload = async (url: string, file: any, onProgress?: (p: string) => void): Promise<any> => {
    if (!file) {
        return Promise.resolve(null)
    }

    const start = new Date().getTime();
    var data = new FormData();
    data.append("file", file);

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        const authtoken = getToken()
        if (!!authtoken) {
            xhr.setRequestHeader('Authorization', `Bearer ${authtoken}`)
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let resp;
                try {
                    resp = JSON.parse(xhr.response);
                    const err = resp && (resp.error || (xhr.status == 500 && resp.message));
                    if (err) {
                        reject(err);
                    }
                } catch (e) {
                    reject(e.message);
                }
                resolve(resp);
            }
        }
        xhr.upload.addEventListener("progress", function (e) {
            if (e.lengthComputable && !!onProgress) {
                onProgress((e.loaded / e.total).toFixed(2));
            }
        }, false);
        xhr.onerror = () => {
            reject("request failed");
        }
        xhr.send(data);
    })
}

export function useClient(): ClientType {
    return React.useContext(ClientContext);
}

export function ClientProvider({ apiUrl, children }: { apiUrl: string, children: React.ReactNode }) {
    const client = new Client(apiUrl)
    return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>;
}
