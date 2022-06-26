import Config from '../../config';
const host = Config.host;

export async function addUser(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/user/create'
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getUsers(company_id) {
    try {
        var resp = await API('GET', {
            path: `/api/user/getall?company_id=${company_id}`,
        })
        const users=await resp.json()
        return users    
    } catch(err) {
        return err
    }
}


export async function updateUser(id, body) {
    try {
        var resp = await API('PATCH', {
            path: `/api/user/edit?userId=${id}`,
            body: body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function removeUser(id) {
    try {
        var resp = await API('DELETE', {
            path: `/api/user/delete?user_id=${id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

async function API(method, params) {
    try {
        var url = host + params.path
        var payload = {
            method: method,
            headers: {}
        }
        if (method == 'POST' || method == 'PATCH') {
            payload.body = JSON.stringify(params.body)
            payload.headers["Content-Type"] = "application/json"
        }
        var resp = await fetch(url, payload)
        return resp;
    } catch(err) {
        return Promise.reject(err)
    }
}