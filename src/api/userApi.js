import axios from 'axios'

// const instance = axios.create({
//     baseURL: "http://179.184.236.89" //"http://179.184.236.89"
// })
const instance = axios.create({
    //baseURL: "http://192.168.25.200/Seara" //"http://179.184.236.89/Seara" "http://localhost"
    //baseURL: "https://localhost:44317/SearaDashboard"
    //baseURL: "http://192.168.25.200/KPISeara/APISeara/PainelKPIAdm"
    baseURL: "http://intranet.grxsolucoes.com.br/KPISeara/APISeara/PainelKPIAdm"
})

export default {
    getOne: (id) =>
        instance({
            method: "GET",
            url: `/get-users?userId=${id}`,
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    get: () =>
        instance({
            method: "GET",
            url: `/get-users`,
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    post: (user) =>
        instance({
            method: "POST",
            url: `/create-user`,
            data: user,
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    put: (user) =>
        instance({
            method: "PUT",
            url: `/edit-user`,
            data: user,
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
}