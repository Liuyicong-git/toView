import {get , post} from '../util/http.js'

class OrgInfoApi {
    getComponentInfo(params = {}){
        return get(`/common/org/getComponentInfo${ params.id ? ('?num='+ params.id) : '' }`)
    }
    addComponentInfo(param){
        return post('/common/org/addComponentInfo', param)
    }
    updateComponentInfo(param){
        return post('/common/org/updateComponentInfo', param)
    }
    deleteComponentInfo(param){
        return get(`/common/org/deleteComponentInfo?num= ${param.id}`)
    }
}
let baseOrg = new OrgInfoApi();
export default baseOrg;