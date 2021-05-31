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
    //baseURL: "http://192.168.25.200/KPISeara/APISeara/PainelKPIAdm"
    //baseURL: "http://intranet.grxsolucoes.com.br/KPISeara/APISeara/PainelKPIAdm"
})



export default {

    getSearaBaseRac: (params) =>
        instance({
            method: "GET",
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
    getSearaBaseSQLNINJA: (p) =>
        instance({
            method: "POST",
            url: `/SQLNINJA`, 
            data: {'where': p[0]},
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),
    getSearaBaseRacIndicadores: (p) =>
        instance({
            method: "POST",
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

    getSearaBaseRacFinal: (p) =>
        instance({
            method: "POST",
            url: `/RacFinal`, 
            data: {'where': p[0]},
            transformResponse: [
                function (data) {
                    
                    return data;
                }
            ]
            
        }),

    getSearaBaseNCCMP: (p) =>
        instance({
            method: "POST",
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

    getSearaBaseRACUnicoUnidade: (p) =>
        instance({
            method: "POST",
            url: `/RACUnicoUnidade`, 
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

    getSearaBaseRACUnicoProblema: (p) =>
        instance({
            method: "POST",
            url: `/RACUnicoProblema`, 
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

    getSearaBaseRacAberturaME: (p) =>
        instance({
            method: "POST",
            url: `/RACAberturaME`, 
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

        getSearaBaseRacAberturaME2: (p) =>
        instance({
            method: "POST",
            url: `/RACAberturaME2`, 
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
  
}
