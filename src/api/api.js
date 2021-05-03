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
    //baseURL: "http://localhost/SearaDashboard"
    baseURL: "http://192.168.25.200/KPISeara/APISeara/PainelKPIAdm"
    //baseURL: "http://intranet.grxsolucoes.com.br/KPISeara/APISeara/PainelKPIAdm"
})



export default {

    getSearaBaseRac: (params) =>
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
    getSearaBaseRacIndicadores: (p) =>
        instance({
            method: "POST",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/RacTotalIndicadores`, 
            data: {'where': p[0]},
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
    getSearaBaseNNCMPTotalCE: (p) =>
        instance({
            method: "POST",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCMPTotalCE`, 
            data: {'where': p[0]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
    getSearaBaseRACTotalCE: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/RACTotalCE?where=${params[0]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        
    getSearaBaseRacCE: (params) =>
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

    getSearaBaseNCCMP: (p) =>
        instance({
            method: "POST",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCMPTotal`, 
            data: {'where': p[0]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseNCCMPCE: (p) =>
        instance({
            method: "POST",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/NNCMPTotalCE`, 
            data: {'where': p[0]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseNCCLOG: (params) =>
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

    getSearaBaseCE: (params) =>
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

    getSearaBaseRACUnico: (params) =>
        instance({
            method: "GET",
            //url: `/Service/RAC?data=${params[0]}&nome=${params[1]}`, //`/SearaDashboard/RAC?data=${params[0]}&nome=${params[1]}`,
            //url: `/RACTotal?data=${params[0]}&nome=${params[1]}`, 
            url: `/RACUnico?where=${params[0]}`, 
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
