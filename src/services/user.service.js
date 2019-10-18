import {ApiService} from "./api.service";

const userService = {
    login: ({email, password,}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/authenticate', {email: email, password: password, client_id:3}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': "Bearer "+token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/authorize"
        }).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    register: async ({name,email,password}) => {
        return await ApiService.post('/oauth/register', {
            name:name,
            email: email,
            password: password,
            client_id:3
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }
};

export {userService};
