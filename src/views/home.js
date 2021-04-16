//#region Imports
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import api from '../api/api'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';

import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';

import classNames from 'classnames';


import 'react-pro-sidebar/dist/css/styles.css';
import '../index.css';
import '../css/sidebar-desktop.css';
import '../css/login.css';
import '../css/charts.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { ProgressBar } from 'primereact/progressbar';
import { months, colorsBars, lightOptions, optionsComparativo } from '../domain/constants';
import {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators
} from '../domain/kpiservice';


import { LoadingSkeletonSquare, LoadingSkeletonCard } from '../components/skeletons';

import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
    orientation: 'retrait',
    unit: 'px',
    format: [1200,16000]
};

var cors = require('cors'); // Already done “npm i cors --save-dev”

//#endregion

function Home() {
 
    const [isUpdatingData, setIsUpdatingData] = React.useState(false)
    const toast = React.useRef(null);

    var numeroChamados = [  false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false]

    function percorreNumeroChamados(){
        //debugger
        for(var i=0; i < numeroChamados.length; i++){
            if(numeroChamados[i] == false){
                return false
            }
        }
        return true
    }

    //chamadas
    let [responseGraficoCETotal, setresponseGraficoCETotal] = React.useState({})
    let [GraficoCETotal, setGraficoCETotal] = React.useState()

    let [responseGraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE] = React.useState({})
    let [GraficoNNCMPTotalCE, setGraficoNNCMPTotalCE] = React.useState()

    let [responseGraficoRACTotalCE, setresponseGraficoRACTotalCE] = React.useState({})
    let [GraficoRACTotalCE, setGraficoRACTotalCE] = React.useState()

    let [responseGraficoRAC, setresponseGraficoRAC] = React.useState({})
    let [GraficoRAC, setGraficoRAC] = React.useState()

    let [responseGraficoNCCMP, setresponseGraficoNCCMP] = React.useState({})
    let [GraficoNCCMP, setGraficoNCCMP] = React.useState()

    //Aves pesadas RAC
    let [responseGraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas] = React.useState({})
    let [GraficoCETotalAvesPesadas, setGraficoCETotalAvesPesadas] = React.useState()

    let [responseGraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas] = React.useState({})
    let [GraficoNNCMPTotalCEAvesPesadas, setGraficoNNCMPTotalCEAvesPesadas] = React.useState()

    let [responseGraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas] = React.useState({})
    let [GraficoRACTotalCEAvesPesadas, setGraficoRACTotalCEAvesPesadas] = React.useState()

    let [responseGraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas] = React.useState({})
    let [GraficoRACAvesPesadas, setGraficoRACAvesPesadas] = React.useState()

    let [responseGraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas] = React.useState({})
    let [GraficoNCCMPAvesPesadas, setGraficoNCCMPAvesPesadas] = React.useState()

    //Testes
    let [responseGrafico5, setresponseGrafico5] = React.useState({})
    let [Grafico_5, setGrafico_5] = React.useState()

    let [responseTable, setresponseTable] = React.useState({})
    let [TableRacME, setTableRacME] = React.useState()

    //Handlers
    React.useEffect(() => {
               
        chamarAPI("CETotal",GraficoCETotal, "GraficoCETotal", [' where 1=1 '], setGraficoCETotal, setresponseGraficoCETotal, 0)     // 1
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCE, "GraficoNNCMPTotalCE", [' where 1=1 '], setGraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, 1)       // 2
        chamarAPI("RACTotalCE",GraficoRACTotalCE, "GraficoRACTotalCE", [' where 1=1 '], setGraficoRACTotalCE, setresponseGraficoRACTotalCE, 2)     // 3
        chamarAPI("RAC",GraficoRAC, "GraficoRAC", [' where 1=1 '], setGraficoRAC, setresponseGraficoRAC, 3)    // 4
        chamarAPI("NCCMP",GraficoNCCMP, "GraficoNCCMP", [' where 1=1 '], setGraficoNCCMP, setresponseGraficoNCCMP, 4)    // 5 
        
        chamarAPI("CETotal",GraficoCETotalAvesPesadas, "GraficoCETotalAvesPesadas", [' where 1=1 '], setGraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, 5)     // 6
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCEAvesPesadas, "GraficoNNCMPTotalCEAvesPesadas", [' where 1=1 '], setGraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, 6)       // 7
        chamarAPI("RACTotalCE",GraficoRACTotalCEAvesPesadas, "GraficoRACTotalCEAvesPesadas", ['  WHERE [Negócio (Qualidade)] = \'Aves Pesadas\'   '], setGraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, 7)     // 8
        chamarAPI("RAC",GraficoRACAvesPesadas, "GraficoRACAvesPesadas", [' WHERE [Negócio (Qualidade)] = \'Aves Pesadas\'  '], setGraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, 8)    // 9
        chamarAPI("NCCMP",GraficoNCCMPAvesPesadas, "GraficoNCCMPAvesPesadas", [' where 1=1 '], setGraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, 9)    // 10


        chamarAPI("RACUnico",Grafico_5, "Grafico_5", [' where 1=1 '], setGrafico_5, setresponseGrafico5,10)  // 11                                                                    // 6

    }, []);

    function chamarAPI(apiNome, objeto, numGrafico, parametros, funcao, funcaoRetorno, numeroChamado){

        switch(apiNome){
            case 'CETotal':
                
                api.getSearaBaseCE(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    console.log("Rodou "+apiNome)
                    if(percorreNumeroChamados()){
                        console.log("0 Rodou "+apiNome)
                        document.getElementById("btnAplicar").click()
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'NNCMPTotalCE':
                
                api.getSearaBaseNNCMPTotalCE(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    console.log("Rodou "+apiNome)
                    if(percorreNumeroChamados()){
                        console.log("0 Rodou "+apiNome)
                        document.getElementById("btnAplicar").click()
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'RACTotalCE':
                
                api.getSearaBaseRACTotalCE(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    console.log("Rodou "+apiNome)
                    if(percorreNumeroChamados()){
                        console.log("0 Rodou "+apiNome)
                        document.getElementById("btnAplicar").click()
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break

                    
            case 'RAC':
                
                api.getSearaBaseRac(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    console.log("Rodou "+apiNome)
                    if(percorreNumeroChamados()){
                        console.log("0Rodou "+apiNome)
                        document.getElementById("btnAplicar").click()
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'NCCMP':
                
                api.getSearaBaseNCCMP(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    console.log("Rodou "+apiNome)
                    if(percorreNumeroChamados()){
                        console.log("0Rodou "+apiNome)
                        document.getElementById("btnAplicar").click()
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);      
                });
                break

            case 'NCCLOG':
                
                    api.getSearaBaseNCCLOG(parametros).then((response) => {
                        buscarDados(response, funcao, objeto, funcaoRetorno)
                        numeroChamados[numeroChamado] = true;
                        console.log("Rodou "+apiNome)
                        if(percorreNumeroChamados()){
                            console.log("0Rodou "+apiNome)
                            document.getElementById("btnAplicar").click()
                            //aplicar()
                        }
                        return response
                    }).catch(err => {
                        // what now?
                        console.log(err);       
                    });
                    break  
            case 'RACUnico':
                
                    api.getSearaBaseRACUnico(parametros).then((response) => {
                            
                            buscarDados(response, funcao, objeto, funcaoRetorno)
                            numeroChamados[numeroChamado] = true;
                            console.log("Rodou "+apiNome)
                            if(percorreNumeroChamados()){
                                console.log("0Rodou "+apiNome)
                                document.getElementById("btnAplicar").click()
                                //aplicar()
                            }
                            return response
                        }).catch(err => {
                            // what now?
                            console.log(err);       
                        });
                        break  

            default:
                break    
            
        }

        return
    }

    function aplicar() {
        setTimeout(function(){
            GerarGraficoHistorico(GraficoCETotal, setresponseGraficoCETotal)
            GerarGraficoHistorico(GraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE)
            GerarGraficoHistorico(GraficoRACTotalCE, setresponseGraficoRACTotalCE)
            GerarGraficoHistorico(GraficoRAC, setresponseGraficoRAC)
            GerarGraficoHistorico(GraficoNCCMP, setresponseGraficoNCCMP)

            GerarGraficoHistorico(GraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas)
            GerarGraficoHistorico(GraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas)
            GerarGraficoHistorico(GraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas)
            GerarGraficoHistorico(GraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas)
            GerarGraficoHistorico(GraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas)

            GerarGraficoBarras(Grafico_5, setresponseGrafico5)
        }, 0)
        
    }

    const GerarGraficoHistorico = (objeto, funcao) => {
            
            setIsUpdatingData(true)
            let json = objeto; 
            let indicators = Object.keys(json[0]).map(key => key);

            let groupBy = function groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                    const key = keyGetter(item);
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                });
                return map;
            }

            let xaxis = Array.from(groupBy(json, x => x["Periodo"]), ([name, value]) => ({ name, value }));
            let yaxis = [{name:'Evolutivo 2020'},{name:'Evolutivo 2021'},{name:'Evolutivo Meta'},{name:'Meta'},{name:'2019'},{name:'2020'},{name: '2021'}];

            xaxis.forEach(x => {
                if (x.name == "2019"){
                    x['yaxis'] = [{name: "2019", value: x.value[0].Valor == "" ? null : x.value[0].Valor}]
                }else if (x.name == "2020"){
                    x['yaxis'] = [{name: "2020", value: x.value[0].Valor == "" ? null : x.value[0].Valor}]
                }else if(x.name == "Meta"){
                    x['yaxis'] = [{name: "Meta", value: x.value[0].Valor == "" ? null : x.value[0].Valor}]
                }else if(x.name == "2021"){
                    x['yaxis'] = [{name: "2021", value: x.value[0].Valor == "" ? null : x.value[0].Valor}]
                }else{
                    x['yaxis'] = [
                                    {name: "Evolutivo 2020", value: x.value[0].a2020},
                                    {name: "Evolutivo Meta", value: x.value[0].aMeta},
                                    {name: "Evolutivo 2021", value: x.value[0].a2021}
                                ]
                }
            })

            let series = []
            yaxis.forEach((y, index) => {
                let dataset = xaxis.map(xx => {
                    let yaxysvalue = xx.yaxis.filter(r => r.name === y.name);
                    if (yaxysvalue.length)
                        return yaxysvalue[0].value

                    return null
                })

                let tipo = 'line'
                let cor = '#bfbfbf'
                let corLabel = '#bfbfbf'
                let yAx = "B"
                let varborderDash = [0,0]

                switch (y.name){

                    case "2019": 
                                    tipo = "bar"
                                    cor = "#bfbfbf"
                                    corLabel = "#bfbfbf"
                                    yAx = "A"
                                    break
                    case "2020": 
                                    tipo = "bar"
                                    cor = "#bfbfbf"
                                    corLabel = "#bfbfbf"
                                    yAx = "A"
                                    break
                    case "Meta": 
                                    tipo = "bar"
                                    cor = "rgb(204,0,0)" //"rgb(245,156,0)"
                                    corLabel = "rgb(245,156,0)"
                                    yAx = "A"
                                    break
                    case "2021": 
                                    tipo = "bar"
                                    cor = "#cccccc"
                                    corLabel = "#cccccc"
                                    yAx = "A"
                                    break
                    case "Evolutivo 2020": 
                                    tipo = "line"
                                    cor = "rgb(166, 166, 166)"
                                    corLabel = "rgb(166, 166, 166)"
                                    varborderDash = [10,5]
                                    yAx = "B"
                                    break
                    case "Evolutivo Meta": 
                                    tipo = "line"
                                    cor = "rgb(245,156,0)"
                                    corLabel = "rgb(245,156,0)"
                                    yAx = "B"
                                    break
                    case "Evolutivo 2021": 
                                    tipo = "line"
                                    cor = "rgb(89,89,89)"
                                    corLabel = "rgb(89,89,89)"
                                    yAx = "B"
                                    break
                                 
                    default:
                                    break


                }

                for(var i = 0; i < dataset.length; i++){
                    if(dataset[i] == "") dataset[i] = null
                }

                let serie = {
                    type: tipo,
                    yAxisID: yAx,
                    label: y.name,
                    backgroundColor: cor,
                    fill: false,
                    borderColor: cor,
                    borderWidth: 1,
                    pointRadius: 5,
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderDash: varborderDash, 
                    data: dataset,
                    datalabels: {
                    
                        align: "top",
                        anchor: "end",
                        offset: 10,
                        padding: -2,
                        color: corLabel,
                        //clip: true,
                        font: {
                            size: "12",
                        },
                        
                    }
                     
                }
                series.push(serie)
            })

            let seriesAdd = []
            
                series.filter(s => s.label != null).forEach(element => {
                    seriesAdd.push(element)
                });
           

            const dashboardData = {
                labels: xaxis.map(r => r.name),
                datasets: seriesAdd,
                indicators
                
            };

            if(typeof(funcao)=="function"){
                funcao(dashboardData);
            }

            setIsUpdatingData(false)
    }

    const GerarGraficoBarras = (objeto, funcao) => {
            
        setIsUpdatingData(true)
        let json = objeto; 
        let indicators = Object.keys(json[0]).map(key => key);

        let groupBy = function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }

        let xaxis = Array.from(json);//groupBy(json, x => x["Periodo"]), ([name, value]) => ({ name, value }));
        let yaxis = [{name: 'Valor'}];

        xaxis.forEach(x => {          
            x['yaxis'] = [{name: "Valor", value: x.value}]            
        })

        let series = []
        yaxis.forEach((y, index) => {
            let dataset = xaxis.map(xx => {
                let yaxysvalue = xx.yaxis.filter(r => 1===1);
                if (yaxysvalue.length)
                    return yaxysvalue[0].value

                return null
            })

            let tipo = 'bar'
            let cor = '#bfbfbf'
            let corLabel = '#000000'
            let yAx = "B"
            let varborderDash = [0,0]

            let serie = {
                type: tipo,
                yAxisID: yAx,
                label: y.name,
                backgroundColor: cor,
                fill: false,
                borderColor: cor,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
                borderDash: varborderDash, 
                data: dataset,
                datalabels: {
                
                    align: "top",
                    anchor: "end",
                    offset: 10,
                    padding: -2,
                    color: corLabel,
                    //clip: true,
                    font: {
                        size: "11",
                    },
                    
                }
                 
            }
            series.push(serie)
        })

        let seriesAdd = []
        
            series.filter(s => s.label != null).forEach(element => {
                seriesAdd.push(element)
            });
       

        const dashboardData = {
            labels: xaxis.map(r => r.name),
            datasets: seriesAdd,
            indicators
            
        };

        if(typeof(funcao)=="function"){
            funcao(dashboardData);
        }

        setIsUpdatingData(false)
    }

    const DataTableRACME = () => {

        if (!TableRacME) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacME.length; i++) {
            json.push(TableRacME[i])
        }

        

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestante" header="Manifestante"></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const buscarTabelaRACUnico = () => {
        let parm = " ";
        
        api.getSearaBaseRacME(parm).then((response) => {
            let json = JSON.parse(response.data)

            return  (
                <div>
                    <div className="card">
                        <DataTable value={json} sortMode="multiple">
                            <Column field="Unidade" header="Unidade"></Column>
                            <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                            <Column field="Manifestante" header="Manifestante"></Column>
                            <Column field="Nº RAC" header="Nº RAC"></Column>
                        </DataTable>
                    </div>
                </div>
            );

        })
    }

    const buscarDados = (response, funcao, graficoRetorno, funcaoRetorno ) => {
  
        setIsUpdatingData(true)

        let parm = " ";

        api.getSearaBaseRacME(parm).then((response) => {

            let json = JSON.parse(response.data)
            setTableRacME(json)
        })        

        let json = JSON.parse(response.data)

        let datasets = [];
        let indicators = Object.keys(json[0]).map(key => key);

        if(typeof(funcao)=="function"){
            funcao(json);
        }

        setIsUpdatingData(false)

        //GerarGraficoHistorico(graficoRetorno, funcaoRetorno)
  
    };

    const showSuccess = (errorMessage, detailMessage) => {
        toast.current.show({ severity: 'success', summary: errorMessage, detail: detailMessage });
    }

    const showError = (errorMessage, detailMessage) => {
        toast.current.show({ severity: 'error', summary: errorMessage, detail: detailMessage, life: 6000 });
    }

    const UpdatingDatabase = () => {
        return (
            <div>
                <h1 className={'h2'}>
                    Atualizando a base
                    <br />
                    <small>Puxando dados da RAC</small>
                    <br />
                </h1>
                <ProgressBar mode="indeterminate" style={{ height: '16px' }}></ProgressBar>
            </div>
        )
    }

    // Se esta logado exibe tela do dashboard:
    return (
        // <div style="width: 1220px !important;">
        <div> 
            <Row>
                <Col lg={12} className="cssSeara2021">
                    {isUpdatingData ? (<UpdatingDatabase />) : (
                        <div>
                            <h1 className={'h2'}>
                                Relatório KPI Seara
                                    <br />
                                <small>por GRX Soluções</small>
                            </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                {/* <div className="btn-group mr-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={buscarDados}>Atualizar</button>
                                </div>   */}

                                <Pdf targetRef={ref} filename="KPI.pdf" options={options} x={1} scale={0.8}>
                                    {({toPdf}) => (
                                        <button className="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={toPdf} id="btnPDF">Gerar PDF</button>
                                    )}
                                </Pdf>

                            </div>
                        </div>
                    )}
                </Col>
            </Row>

            <hr></hr>

            {/* Botão aplicar */}
            {isUpdatingData ? (<div> </div>) : (
                <Row style={{ paddingRight: '15px', paddingLeft: '15px', display: 'none' }}>
                    <button className="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={aplicar} id="btnAplicar">Aplicar</button>
                </Row>
            )}

            

            {/* Graficos */}
            <div className="pad10" ref={ref}  >
                <Row>
                    <Col className="mt-1 col-12 cssSeara2021">
                        <h1>Relatório de Atendimento ao Consumidor (RAC)</h1>
                    </Col>
                    
                </Row>

                <reg id="region RAC - Totais">

                <Row>
                    <Col className=" col-12 cssSeara2021_titulo">
                        Totais
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                    <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior"/>
                            </Card>
                        )}
                    </Col>
                    <Col className="col-lg-6 col-md-6 col-sm-12">
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="cssSeara2021_tituloGrafico ">
                                    <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="cssSeara2021_tituloGrafico ">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                    </Col>
                    
                </Row>
                <Row>
                    <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                        Reclamações
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoNCCMP} options={lightOptions} className="divMedia" />
                            </Card>
                        )}
                    </Col>
                    
                </Row>

                </reg>
                
                <reg id="region RAC - Aves Pesadas">

                <Row>
                    <Col className="mt-1 col-12 cssSeara2021_titulo">
                        Aves Pesadas
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                <Chart type="bar" data={responseGraficoCETotalAvesPesadas} options={lightOptions} className="divMaior"/>
                            </Card>
                        )}
                    </Col>
                    <Col className="col-lg-6 col-md-6 col-sm-12">
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACTotalCEAvesPesadas} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico divMenor">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadas} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                    </Col>
                    
                </Row>
                <Row>
                    <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                        Reclamações
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoRACAvesPesadas} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoNCCMPAvesPesadas} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    
                </Row>

                </reg>
                
                <reg id="region RAC - Aves Pesadas PR">

                <Row>
                    <Col className="mt-1 col-12 cssSeara2021_titulo">
                        Aves Pesadas PR
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                    <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior"/>
                            </Card>
                        )}
                    </Col>
                    <Col className="col-lg-6 col-md-6 col-sm-12">
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                    </Col>
                    
                </Row>
                <Row>
                    <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                        Reclamações
                        <hr></hr>
                    </Col>    
                </Row>
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    
                </Row>

                </reg>

                <reg id="region RAC - Aves Leves">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Aves Leves
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                            Reclamações
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        
                    </Row>

                </reg>

                <reg id="region RAC - Suínos">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Suínos
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                            Reclamações
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        
                    </Row>

                </reg>

                <reg id="region RAC - Preparados">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Preparados
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_subTitulo">
                            Reclamações
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        
                    </Row>

                </reg>

                <reg id="region RAC - Reclamações - Aves Pesadas">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Aves Pesadas
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                
                </reg>

                <reg id="region RAC - Reclamações - Aves Pesadas PR">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Aves Pesadas PR
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>

                </reg>

                <reg id="region RAC - Reclamações - Suínos">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Suínos
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>


                </reg>

                <reg id="region RAC - Reclamações - Preparados">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Preparados
                            <hr></hr>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGrafico5} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>


                </reg> 


                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                {/* Testes finais */}

                                {/* <Row>
                                    <Col>
                                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                            <Card title="Total RAC" subTitle="RA" className="mt-5">
                                                <Chart type="bar" data={responseGrafico5} options={lightOptions}/>
                                            </Card>
                                        )}
                                    </Col>

                                    <Col className="mt-5">                     

                                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                            
                                            DataTableRACME() 
                                        
                                        )}

                                    </Col>  
                                </Row> */}
                                        
            </div>

        </div>
    )
}

export default Home;