import Config from '../ceo-dashboard/js/config'
const host = Config.host

export async function login(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/auth/login'
        })
        const responseJson=await resp.json()
        return responseJson
    } catch (err) {
        return err
    }
}

export async function joinWithGoogle(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/auth/google'
        })
        const responseJson=await resp.json()
        return responseJson
    } catch (err) {
        return err
    }
}


export async function getCompanies() {
    try {
        var resp = await API('GET', {
            path: `/api/companies`
        });
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getUser(email) {
    
    try {
        var resp = await API('GET', {
            path: `/api/user?email=${email}`
        });
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}
export async function jwtVerifier(body) {
    try {
        var resp = await API('POST', {
            body,
            path: '/api/auth/jwtverify'
        })
        const responseJson=await resp.json()
        return responseJson
    } catch (err) {
        return err
    }
}

export async function forgotPassword(email) {
    try {
        var resp = API('POST', {
            body: {email: email}
        })
        return resp
    } catch (err) {
        return err
    }
}

async function API(method, params) {
    try {
        var url = host + params.path
        var payload = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (method === 'POST') {
            payload.body = JSON.stringify(params.body)
        }
        var resp = await fetch(url, payload)
        return resp
    } catch(err) {
        return Promise.reject(err)
    }
}