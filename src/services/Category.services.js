import { ApiService } from "./api.service";

const Category = {
    addCategory: async (data) => {
        return await ApiService.post('/category/add', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },

    listCategory: async (perPage = 12, page = 1) => {
        return await ApiService.get("/category/list?perPage=" + perPage + "&page=" + page).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });

    },

    deleteCategory: async (uuid) =>{
        return await ApiService.post('/category/delete/'+uuid).then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    },

    categoryDetail: async (uuid) =>{
        return await ApiService.get('/category/details/'+uuid).then((res)=> {
            return Promise.resolve(res.data);
        }).catch((error) =>{
            return Promise.reject(error.response.data);
        });
    },

};



export { Category };


