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

        
        getSearaBaseRacIndicadoresSemFiltro2: (p) =>
        instance({
            method: "POST",
            url: `/RACTotalIndicadoresSemFiltro2`, 
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
    getSearaBaseRacIndicadores_: (p) =>
        instance({
            method: "POST",
            url: `/RacTotalIndicadoresSemFiltro`, 
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
    
    getSearaBaseRacME: (p) =>
        instance({
            method: "POST",
            url: `/RacME`, 
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
    
        getSearaBaseNCCMPUnidade: (p) =>
        instance({
            method: "POST",
            url: `/NNCMPUnicoUnidade`, 
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

        getSearaBaseNCCMPProblema: (p) =>
        instance({
            method: "POST",
            url: `/NNCMPUnicoProblema`, 
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

    getSearaBaseNCCLOG: (p) =>
        instance({
            method: "POST",
            url: `/NNCLogTotal`, 
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

        getSearaBaseRAC3niveis: (p) =>
        instance({
            method: "POST",
            url: `/RAC3niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseRAC2niveis: (p) =>
        instance({
            method: "POST",
            url: `/RAC2niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseRAC3niveisDesvio: (p) =>
        instance({
            method: "POST",
            url: `/RAC3niveisDesvio`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNCLog3niveis: (p) =>
        instance({
            method: "POST",
            url: `/NNCLog3niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNCLog2niveis: (p) =>
        instance({
            method: "POST",
            url: `/NNCLog2niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNCMP2niveis: (p) =>
        instance({
            method: "POST",
            url: `/NNCMP2niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNCMP3niveis: (p) =>
        instance({
            method: "POST",
            url: `/NNCMP3niveis`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseRAC3niveisPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/RAC3niveisPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseRAC1niveisPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/RAC1niveisPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3]},
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        

        getSearaBaseNNCLog1nivelPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/NNCLOG1nivelPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3], 'campoPivotAlias': p[4]}, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNC1nivelPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/NNC1nivelPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3], 'campoPivotAlias': p[4]}, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNC2niveisPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/NNC2niveisPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3], 'campoPivotAlias': p[4]}, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseNNC3niveisPIVOTDIA: (p) =>
        instance({
            method: "POST",
            url: `/NNC3niveisPIVOTDIA`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3], 'campoPivotAlias': p[4]}, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseCE2niveisPIVOTmesDesvio: (p) =>
        instance({
            method: "POST",
            url: `/CE2niveisPIVOTmesDesvio`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2], 'campoPivot': p[3], 'campoPivotAlias': p[4]}, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

        getSearaBaseICBarras: (p) =>
        instance({
            method: "POST",
            url: `/ICBarras`, 
            data: {'where': p[0], 'campos': p[1], 'groupBy': p[2]},
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
