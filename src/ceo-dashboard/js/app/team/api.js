import Config from '../../config'
const host = Config.host

export async function addTeam(user_id,company_id,body) {
    try {
        var resp = await API('POST', {
            body,
            path: `/api/team/create?user_id=${user_id}&company_id=${company_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getTeams(company_id) {
    try{
        var resp = await API('GET', {
            path: `/api/team/getall?company_id=${company_id}`
        })
        const respJson = await resp.json()
        return respJson
    } catch(err){
        throw err
    }
}

export async function getTeamUsers(team_id) {
    try {
        var resp = await API('GET', {
            path: `/api/team/users/getall?team_id=${team_id}`
        })
        const respJson= await resp.json()
        return respJson
    } catch(err) {
        throw err
    }
}

export async function updateTeam(id, body) {
    try {
        var resp = await API('PATCH', {
            body: body,
            path: '/api/team',
            id: id
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeTeam(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/team',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

async function API(method, params) {
    try {
        var url = host + params.path;
        var payload = {
            method: method,
            headers: {}
        }
        if (method == 'POST' || method == 'PATCH') {
            payload.body = JSON.stringify(params.body)
            payload.headers["Content-Type"] = "application/json"
            
        }
        // if (method == 'POST' || method == 'PATCH' && params.user) {
        //     payload.body = JSON.stringify(params.body);
        //     payload.headers["Content-Type"] = "application/json";
        //     url+= '/' + `?company_id=${params.user.company_id}&user_id=${params.user.id}`
        // }
        // if(method=='GET' && params.company_id){
        //     url+='/'+ `?company_id=${params.company_id}`
        // }
        // if(method=='GET' && params.team_id){
        //     url+=''+ `?team_id=${params.team_id}`
        // }
        // if (params.id) {
        //     url += '/' + params.id;
        // }
        var resp = await fetch(url, payload)
        return resp
    } catch(err) {
        return Promise.reject(err)
    }
}