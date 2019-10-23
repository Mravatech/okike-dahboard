import {ApiService} from "./api.service";

const dashboardService = {
    fetchStats: async () => {
        return new Promise(function (resolve, reject) {
            ApiService.get("/report/stats").then((res) => {
                resolve(res.data);
            }).catch(() => {
                reject(false);
            });
        });
    },
};

export {dashboardService};
