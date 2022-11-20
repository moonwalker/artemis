import * as React from "react";
import { token } from '../token'

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
        return call('POST', url, data)
    }
    del = (url: string): Promise<any> => {
        return call('DELETE', url)
    }
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
        console.log(apiUrl)
    }
}

const call = async (method: string, url: string, data?: any): Promise<any> => {
    const body = data ? JSON.stringify(data) : null
    const headers = {
        'Content-Type': 'application/json'
    }

    const authtoken = token.get()
    if (!!authtoken) {
        Object.assign(headers, {
            'Authorization': `Bearer ${authtoken}`
        })
    }

    const response = (await fetch(url, { method, headers, body }))
    const res = response.json()
    if (!response.ok) {
        return res.then(data => {
            if (data.code == 403) {
                history.replaceState(location.pathname, '', '/restricted')
            }
            return { error: data.message };
        })
    }

    return res;
}

export function useClient(): ClientType {
    return React.useContext(ClientContext);
}

export function ClientProvider({ apiUrl, children }: { apiUrl: string, children: React.ReactNode }) {
    const client = new Client(apiUrl)
    return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>;
}