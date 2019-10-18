import {ApiService} from "./api.service";

const Category = {
    addFood: async (data) => {
        return await ApiService.post('/food/add', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    addExtra: async (data) => {
        return await ApiService.post('/food/add/extra', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },


    listFood: async (perPage = 12, page = 1) => {
    return await ApiService.get("/food/list?perPage=" + perPage + "&page=" + page).then((res) => {
        return Promise.resolve(res.data.data);
    }).catch(() => {
        return Promise.reject(false);
    });
},
    

    
    
};



export {Category};


