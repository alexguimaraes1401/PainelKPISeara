import axios from 'axios'

// const instance = axios.create({
//     baseURL: "http://179.184.236.89" //"http://179.184.236.89"
// })
const instance = axios.create({
    baseURL: "https://localhost:44317/SearaDashboard" //"http://179.184.236.89"
})

export default {
    post: (user) =>
        instance({
            method: "POST",
            url: `/login`,
            data: user,
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
}