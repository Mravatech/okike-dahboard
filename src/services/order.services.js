import {ApiService} from "./api.service";

const Order = {
    accept: async (uuid) => {
        return await ApiService.post("/order/accept/"+uuid, uuid).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    reject: async (uuid) => {
        return await ApiService.post("/order/reject/"+uuid, uuid).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },

    list: async (perPage = 12, page = 1) => {
    return await ApiService.get("/order/list?perPage=" + perPage + "&page=" + page).then((res) => {
        return Promise.resolve(res.data.data);
    }).catch(() => {
        return Promise.reject(false);
    });
},
    

    
    
};



export {Order};


