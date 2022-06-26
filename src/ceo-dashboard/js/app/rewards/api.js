import Config from '../../config';
const host = Config.host;

export async function getRewardsHistory() {
    try {
        var resp = await API('GET', {
            path: `/api/rewards/history`,
        })
        const res=await resp.json()
        return res    
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