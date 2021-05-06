import axios from 'axios'

// const instance = axios.create({
//     baseURL: "http://179.184.236.89" //"http://179.184.236.89"
// })
const instance = axios.create({
     //baseURL: "http://192.168.25.200/Seara" //"http://179.184.236.89/Seara" "http://localhost"
   //baseURL: "http://localhost/SearaDashboard"
   baseURL: "http://192.168.25.200/KPISeara/APISeara/PainelKPIAdm"
   //baseURL: "http://intranet.grxsolucoes.com.br/KPISeara/APISeara/PainelKPIAdm"
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