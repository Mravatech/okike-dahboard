import {ApiService} from "./api.service";

const settings = {

    changePassword: async (data) => {
        return await ApiService.post('/oauth/reset/password',data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },



};

export {settings};


