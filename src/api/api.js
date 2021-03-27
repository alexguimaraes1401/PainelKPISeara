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
            url: `/Api/BaseRac?data=${params[0]}&nome=${params[1]}`, 
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }),

    getSearaBaseRacLine: () =>
        instance({
            method: "GET",
            url: `/Api/BaseRac`,
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    // Do whatever you want to transform the data
                    let json = JSON.parse(data)
                    let indicators = Object.keys(json[0]).map(key => key);
                    //AddItensToJsonArray(json, 100000, "line")

                    console.time("ProcessResponseLineChart")
                    let datasets = []
                    let { dateField, field, ano } = SetParamsToQuery()
                    SetDateInJsonArrayToQueryOverObjects(json, dateField)
                    let problemas = GetIndicators(json, field)
                    AddLineMockData(datasets)
                    AddDataByFilters(problemas, json, ano, field, datasets, "line")
                    console.timeEnd("ProcessResponseLineChart")
                    return {
                        labels: months,
                        datasets: datasets,
                        indicators
                    }

                }
            ]
        })
}
