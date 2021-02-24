import axios from 'axios'

const instance = axios.create({
    baseURL: "http://179.184.236.89"
})


const colorsBars = [
    '#66BB6A',
    '#FFA726',
    '#03a9f4'
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export default {

    getSearaBaseRacBar: () =>
        instance({
            method: "GET",
            url: "/Seara/Service/Api/BaseRac",
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {

                    return data;
                    // // Do whatever you want to transform the data
                    // let json = JSON.parse(data)
                    // let indicators = Object.keys(json[0]).map(key => key);

                    // AddItensToJsonArray(json, 100000, "bar")

                    // console.time("ProcessResponseBarChart")
                    // let datasets = [];
                    // let { dateField, field, ano } = SetParamsToQuery();
                    
                    // SetDateInJsonArrayToQueryOverObjects(json, dateField);
                    // let problemas = GetIndicators(json, field);
                    // AddLineMockData(datasets);
                    // AddDataByFilters(problemas, json, ano, field, datasets, "bar");
                    // console.timeEnd("ProcessResponseBarChart")

                    // return {
                    //     labels: months,
                    //     datasets: datasets,
                    //     indicators
                    // };
                }
            ]
        }),

    getSearaBaseRacLine: () =>
        instance({
            method: "GET",
            url: "/Seara/Service/Api/BaseRac",
            params: {
                datatype: "json"
            },
            transformResponse: [
                function (data) {
                    // Do whatever you want to transform the data
                    let json = JSON.parse(data)
                    console.log(json)
                    let indicators = Object.keys(json[0]).map(key => key);
                    AddItensToJsonArray(json, 100000, "line")

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

function AddItensToJsonArray(json, size, typechart) {
    console.time("AddItensToJsonArray" + typechart)
    const start = (Math.random(0, json.length) - 1)
    const limit = json.length
    let batch = Object.assign([], json.slice(start, limit));
    while (json.length < size) {
        batch.forEach(element => {
            json.push(element)
        });
    }
    console.timeEnd("AddItensToJsonArray" + typechart)
    console.log("json.length: " + json.length)
}

function GetIndicators(json, field) {
    return [...new Set(json.map(item => item[field]))].slice(0, 3);
}

function AddDataByFilters(problemas, json, ano, field, datasets, type) {
    problemas.forEach((element, i) => {
        let data = months.map((mes, index) => json
            .filter(r => r.year !== undefined && r.year === ano
                && r.mes !== undefined && r.mes === mes
                && r[field] !== undefined && r[field] === element)
            .length
        );
        if (type === "line") {
            datasets.push({
                type: type,
                label: element,
                borderColor: colorsBars[i],
                backgroundColor: "white",
                data: data,
                fill: false,
                // borderColor: "white",
                borderWidth: 2
            });
        } else {
            datasets.push({
                type: type,
                label: element,
                backgroundColor: colorsBars[i],
                data: data,
                fill: false,
                borderColor: "white",
                borderWidth: 2
            });
        }
    });
}

function AddLineMockData(datasets) {
    datasets.push({
        type: "line",
        label: "Dataset 1",
        borderColor: 'red',
        backgroundColor: '#edc4c736',
        borderWidth: 2,
        fill: true,
        borderDash: [5, 5],
        data: [150, 125, 112, 148, 146, 346, 232, 210, 330, 320, 25, 340, 135]
    });
}

function SetParamsToQuery() {
    const ano = "2020";
    const dateField = "Data Fab.";
    const field = "Problema";
    return { dateField, field, ano };
}

function SetDateInJsonArrayToQueryOverObjects(json, dateField) {
    json.forEach(r => {
        let abc = r[dateField].replace(" 00:00:00", "").split("/");
        r['day'] = abc[0];
        r['month'] = abc[1];
        r['mes'] = months[(Math.floor(abc[1] - 1))];
        r['year'] = abc[2];
    });
}