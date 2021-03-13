
import { colorsBars, months } from './constants'

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
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 135]
    });
}

function SetParamsToQuery() {
    const ano = "2020";
    const dateField = "Data Fab.";
    const field = "Problema";
    return { dateField, field, ano };
}

function SetDateInJsonArrayToQueryOverObjects(json, dateField) {
    // json.forEach(r => {
    //     let abc = r[dateField].replace(" 00:00:00", "").split("/");
    //     r['day'] = abc[0];
    //     r['month'] = abc[1];
    //     r['mes'] = months[(Math.floor(abc[1] - 1))];
    //     r['year'] = abc[2];
    // });
}

export {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators,
    AddItensToJsonArray,
};