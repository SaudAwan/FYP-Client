import Config from '../../config'
const host = Config.host

export async function addEvent(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/event/create'
        })
        const respJson=await resp.json()
        return respJson
    } catch(err) {
        return err
    }
}

export async function getEvents(company_id) {
    try {
        var resp = await API('GET', {
            path: `/api/event/getall?company_id=${company_id}`
        });
        const respJson=await resp.json()
        return respJson
    } catch(err) {
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
        return resp
    } catch(err) {
        return err
    }
}

export async function getEventCategories(){
    try{
        var resp=await API('GET',{
            path: '/api/event/categories/getall'
        })
        const respJson=await resp.json()
        return respJson
    } catch(err){
        return err
    }
}

export async function removeEvent(id) {
    try {
        var resp = await API('DELETE', {
            path: '/api/event',
            id: id
        });
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
            path: '/api/speaker'
        })
        return resp;
    } catch(err) {
        return err;
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
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function getEventSpeakersCount(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/speaker/ev/count' + (queryParams ? queryParams : '')
        })
        return resp;
    } catch(err) {
        console.log(err)
        return err;
    }
}

export async function updateEventSpeaker(body, id) {
    try {
        var resp = await API('PATCH', {
            path: '/api/speaker/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
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

export async function addMediaPartner(body) {
    try {
        var resp = await API('POST', {
            body: body,
            path: '/api/media-partner'
        })
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getMediaPartners(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/media-partner' + (queryParams ? queryParams : '')
        });
        return resp;
    } catch(err) {
        return err;
    }
}

export async function getEventMediaPartners(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/media-partner/ev' + (queryParams ? queryParams : '')
        })
        return resp;
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
        return resp;
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
            path: '/api/media-partner/ev',
            id: id,
            body: body
        });
        return resp;
    } catch(err) {
        return err;
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

export async function getSpeakers(queryParams) {
    try {
        var resp = await API('GET', {
            path: '/api/speaker' + (queryParams ? queryParams : '')
        });
        return resp;
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

async function API(method, params) {
    try {
        var url = host + params.path
        var payload = {
            method: method,
            headers: {}
        }
        if (method === 'POST' || method === 'PATCH') {
            payload.body = JSON.stringify(params.body)
            payload.headers["Content-Type"] = "application/json"
        }
        if (params.id) {
            url += '/' + params.id
        }
        var resp = await fetch(url, payload)
        return resp
    } catch(err) {
        return Promise.reject(err)
    }
}