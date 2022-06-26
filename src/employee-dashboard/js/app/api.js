import Config from '../config'
const host = Config.host

export async function addEvent(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/event'
        })
        return resp
    } catch(err) {
        return err
    }
}

export async function addSponsor(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/sponsor'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function addDelegate(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/delegate'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function addSpeaker(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/speaker/create'
        })
        const respJson=await resp.json()
        console.log(respJson)
        return respJson
    } catch(err) {
        return err
    }
}

export async function addAssosciation(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/assosciation'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function tagSponsors(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/sponsor/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagDelegates(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/delegate/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagSpeakers(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/speaker/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagAssosciations(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/assosciation/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventSponsors(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/sponsor/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventSponsorsCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/sponsor/ev/count' + (queryParams ? queryParams : '')
        })
        const data=await resp.json()
        return data;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventDelegates(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/delegate/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventDelegatesCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/delegate/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function updateEventDelegate(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/delegate/ev/' + id,
            body: body
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventSpeakers(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/speaker/ev' + (queryParams ? queryParams : '')
        })
        const data=await resp.json()
        return data;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function fetchEventSpeakers(event_id){
    try {
        var resp = await API('GET', {
            path: `/api/speaker/event/getall?event_id=${event_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getEventSpeakersCount(queryParams) {
    const path= '/api/speaker/ev/count' + (queryParams ? queryParams : '')
    console.log(path)
    try {
        var resp = await API('GET', {
           path
        })
        const data=await resp.json()
        return data;
    } catch(err) {
        return {message:'No events found yet.',err}
    }
}

export async function updateSpeaker(body,speaker_id) {
    try {
        var resp = await API('PATCH', {
            path: `/api/speaker/update?speaker_id=${speaker_id}`,
            body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getEventAssosciations(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/assosciation/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventAssosciationsCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/assosciation/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventWebsites(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/website/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventBlogs(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/blog/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventBlogsCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/blog/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeBlog(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/blog',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function addPartner(body) {
    try {
        var resp = await API('POST', {
            path: '/api/partner/create',
            body: body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getPartners(company_id) {
    try {
        var resp = await API('GET', {
            path: `/api/partner/getall?company_id=${company_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getEventMediaPartners(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/media-partner/ev' + (queryParams ? queryParams : '')
        })
        const data=await resp.json()
        return data;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventMediaPartnersCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/media-partner/ev/count' + (queryParams ? queryParams : '')
        })
        const data=await resp.json()
        return data;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagMediaPartners(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/media-partner/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeMediaPartner(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/media-partner/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventMediaPartner(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/event-media-partner/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updatePartner(body,partner_id) {
    try {
        var resp = await API('PATCH', {
            path: `/api/partner/update?partner_id=${partner_id}`,
            body,
        });
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function addVenue(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/venue'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getVenues(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/venue' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventVenues(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/venue/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventVenuesCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/venue/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagVenues(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/venue/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeVenue(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/venue/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventVenue(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/venue/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventTickets(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/ticket/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventTicketsCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/ticket/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagTickets(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/ticket/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeTicket(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/ticket/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventTicket(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/ticket/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventAssosciation(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/assosciation/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getDelegates(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/delegate' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getSponsors(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/sponsor' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getSpeakers(company_id){
    try {
        var resp = await API('GET', {
            path: `/api/speaker/getall?company_id=${company_id}`
        });
        const data=await resp.json()
        console.log(data)
        return data;
    } catch(err) {
        return err;
    }
}

export async function addInventory(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/inventory'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getInventory(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/inventory' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventInventory(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/inventory/ev' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventInventoryCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/inventory/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagInventorys(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/inventory/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeInventory(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/inventory/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventInventory(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/inventory/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function addVendor(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/vendor'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getVendors(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/vendor' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventVendors(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/vendor/ev' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventVendorsCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/vendor/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function tagVendors(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/vendor/ev'
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function removeVendor(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/vendor/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventVendor(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/vendor/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getAssosciations(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/assosciation' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEvents(queryParams,employeeId) {
    try {
        var resp = await API('GET', {
            path: '/api/event' + (queryParams ? queryParams : '') + `&employee_id=${employeeId}`
        });
        const data= await resp.json()
        return data
    } catch(err) {
        return err;
    }
}

export async function getEmployeeEvents(employee_id){
    try{
        var resp = await API('GET',{
            path: '/api/event/employeeevents/getall'+`?employee_id=${employee_id}`,
        })
        const data=await resp.json()
        return data
    } catch(err){
        return err
    }
}

export async function getEventUsers(event_id){
    try{
        var resp = await API('GET',{
            path: '/api/event/eventusers'+`?event_id=${event_id}`,
        })
        const data=await resp.json()
        return data
    } catch(err){
        return err
    }
}

export async function updateEvent(id, body) {
    try {
        var resp = await API('PATCH', {
            body: body,
            path: '/api/event',
            id: id
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeSponsor(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/sponsor',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeDelegate(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/event/delegate',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeSpeaker(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/speaker/ev',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeAssosciation(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/assosciation',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function updateEventSponsor(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/sponsor/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function removeEvent(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/event',
            id: id
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function addAgenda(body){
    try {
        var resp = await API('POST', {
            path: '/api/agenda/create',
            body: body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err;
    }
}

export async function getAgendas(company_id){
    try{
        var resp = await API('GET',{
            path: `/api/agenda/getall?company_id=${company_id}`
            
        })
        const respJson = await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function updateAgenda(body,agenda_id) {
    try {
        var resp = await API('PATCH', {
            path: `/api/agenda/update?agenda_id=${agenda_id}`,
            body
        });
        return resp
    } catch(err) {
        return err
    }
}

export async function fetchSessionDays(agenda_id){
    try {
        var resp = await API('GET', {
            path: `/api/agenda/session/day/getall?agenda_id=${agenda_id}`
        });
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function addSessionDay(body){
    try {
        var resp = await API('POST', {
            path: '/api/agenda/session/day/create',
            body
        })
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function editSession(body,session_id){
    try {
        var resp = await API('PATCH', {
            path: `/api/agenda/session/update?session_id=${session_id}`,
            body
        })
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function deleteSessionDay(id){
    try {
        var resp = await API('DELETE', {
            path: `/api/agenda/session/day/delete?session_day_id=${id}`
        })
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getSessions(agenda_id,session_day_id){
    try {
        var resp = await API('GET', {
            path: `/api/agenda/session/getall?agenda_id=${agenda_id}&session_day_id=${session_day_id}`
        })
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function addSession(body){
    try {
        var resp = await API('POST', {
            path: '/api/agenda/session/create',
            body
        })
        const respJson=resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function openGoogleDrive(){
    try{
        var resp=await API('GET',{
            path: '/api/agenda/sessions/googledrive'
        })
        const data=await resp.json()
        return data
    } catch(err){
        return err
    }
}

export async function googleDriveUpload(agenda_id,day_id){
    try{
        var resp=await API('GET',{
            path: '/api/agenda/sessions/googledriveupload' + `?agenda_id=${agenda_id}&day_id=${day_id}`
        })
        const data=await resp.json()
        return data
    } catch(err){
        return err
    }
}

export async function addTask(body){
    try{
        var resp=await API('POST',{
            path: '/api/task/create',
            body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function getAllTasks(company_id){
    try{
        var resp=await API('GET',{
            path: `/api/task/getall?company_id=${company_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function getEmployeeTasks(operator_id){
    try{
        var resp=await API('GET',{
            path: `/api/task/employee/getall?operator_id=${operator_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function addTaskComment(body){
    try{
        var resp=await API('POST',{
            path: '/api/task/comment/create',
            body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function updateTaskStatus({taskId, status, userId}){
    try{
        var resp=await API('PATCH',{
            path: `/api/task/${taskId}/status?user_id=${userId}`,
            body: {
                status
            }
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function getTaskComments(task_id){
    try{
        var resp=await API('GET',{
            path: `/api/task/comment/getall?task_id=${task_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function deleteTaskComment(comment_id){
    try{
        var resp=await API('DELETE',{
            path: `/api/task/comment/delete?comment_id=${comment_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function deleteTask(task_id){
    try{
        var resp=await API('DELETE',{
            path: `/api/task/delete?task_id=${task_id}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function getTemplates(folderId){
    console.log(folderId)
    try{
        var resp=await API('GET',{
            path: `/api/templatefactory/getall?folderId=${folderId}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function accessTokenVerifier(fileId,accessToken,idToken){
    try{
        var resp=await API('GET',{
            path: `/api/googleauth?fileId=${fileId}&accessToken=${accessToken}&idToken=${idToken}`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function sendEmails(body){
    try{
        var resp=await API('POST',{
            path: '/api/emails/bulkSend',
            body
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function getEmails(userId){

    try{
        var resp=await API('GET',{
            path: `/api/emails?user_id=${userId}`
        })
        const respJson=await resp.json()
        console.log(respJson)
        return respJson
    } catch(err){
        return err
    }
}

export async function getEmailAddresses() {
    
    try{
        var resp=await API('GET',{
            path: `/api/emails/adresses`
        })
        const respJson=await resp.json()
        console.log(respJson)
        return respJson
    } catch(err){
        return err
    }
}

export async function deleteEmail(emailId){

    try{
        var resp=await API('DELETE',{
            path: `/api/emails/${emailId}`
        })
        const respJson = await resp.json();
        return respJson;
    } catch(err){
        return err
    }
}

export async function getRewardsHistory(userId) {
    try {
        var resp = await API('GET', {
            path: `/api/users/${userId}/rewards/history`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getRewards() {
    try {
        var resp = await API('GET', {
            path: `/api/rewards`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function claimReward({employeeId, rewardId}) {
    try {
        var resp = await API('POST', {
            body: {},
            path: `/api/users/${employeeId}/rewards/${rewardId}/claim`
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}



async function API(method, params) {
    try {
        
        var url = host + params.path;
        var payload = {
            method: method,
            headers: {}
        }
        if (method === 'POST' || method === 'PATCH') {
            payload.body = JSON.stringify(params.body);
            payload.headers["Content-Type"] = "application/json";
        }
        if (params.id) {
            url += '/' + params.id
        }
        var resp = await fetch(url, payload)
        return resp;
    } catch(err) {
        return Promise.reject(err);
    }
}