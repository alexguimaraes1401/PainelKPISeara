import axios from 'axios'
import {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators,
    AddItensToJsonArray,
} from '../domain/kpiservice'
import { months } from '../domain/constants'

const instance = axios.create({
    //baseURL: "http://192.168.25.200/Seara" //"http://179.184.236.89/Seara" "http://localhost"
    baseURL: "http://localhost/SearaDashboard"
})



export default {

    getSearaBaseRacBar: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/Rac?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseRacBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/RacTotal?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
    getSearaBaseRacCEBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/RacTotalCE?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
    
    getSearaBaseRacME: (params) =>
        instance({
            method: "GET",
            url: `/RacME?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseNCCMPBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCMPTotal?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseNCCMPCEBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCMPTotalCE?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseNCCLogBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCLogTotal?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseCEBar2: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/CETotal?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    
}
