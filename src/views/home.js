//#region Imports
import React, { useState, useEffect, useRef } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactDOM from 'react-dom'; 
import $ from 'jquery';
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

import {testeSQLPivotRollup} from '../domain/sql';

import {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators
} from '../domain/kpiservice';


import { LoadingSkeletonSquare, LoadingSkeletonCard } from '../components/skeletons';

import Pdf from "react-to-pdf";
import { LineWeight } from '@material-ui/icons';

import Funcao from "./funcoes"

const ref = React.createRef();
const options = {
    orientation: 'retrait',
    unit: 'px',
    format: [1200, 16000]
};

var cors = require('cors'); // Already done “npm i cors --save-dev”

//#endregion



function Home() {

    const [isUpdatingData, setIsUpdatingData] = React.useState(false)
    const [estaRodandoAplicar, setEstaRodandoAplicar] = React.useState(false)
    const toast = React.useRef(null);
    const canvasRef = React.useRef();

    

    
    
    var numeroChamados = [false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false]  
        
        
    function arrumaTabela(classTable){

        
        var linhas = 0
        
        try{
            linhas = $('.'+classTable+' table').rows.length
        
           
            for (var i=0; i<linhas;i++){
                //console.log($('.'+classTable+' table').rows[i].cells[0].innerText);
                if($('.'+classTable+' table').rows[i].cells[0].innerText.match(/.*@@.*/)  ){
                    //alert($('.'+classTable+' table').rows[i].cells[0].innerText)
                    $('.'+classTable+' table').rows[i].style.background = '#cccccc'
                }
            }
        
            $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll(".....","&nbsp;&nbsp;&nbsp;&nbsp;")
        
            $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll("@@","")
        
            $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll("&lt;b&gt;","<b>")
        
            $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll("&lt;/b&gt;","</b>")
        
            if($('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].cells[0].innerText == "Total"){
                $('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].style.background = '#999999'
                $('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].style.color = 'white'
        
            }
        }catch(e){
            linhas = 0
        }
    }
        
        
        

    const percorreNumeroChamados = () => {
        
        // debugger
        for (var i = 0; i < numeroChamados.length; i++) {
            if (numeroChamados[i] == false) {
                return false
            }
        }


        if(document.getElementsByClassName('clOrienteMedio').length > 0) {
            arrumaTabela('clOrienteMedio')
            //arrumaTabela('clEuropa')
            //arrumaTabela('clJapao')
        }

        return true
    }

    let [backgroundGradient, SetBackgroundGradient] = React.useState();
    let [backgroundGradientCinza, SetBackgroundGradientCinza] = React.useState();

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

    //Aves pesadas PR RAC
    let [responseGraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR] = React.useState({})
    let [GraficoCETotalAvesPesadasPR, setGraficoCETotalAvesPesadasPR] = React.useState()

    let [responseGraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR] = React.useState({})
    let [GraficoNNCMPTotalCEAvesPesadasPR, setGraficoNNCMPTotalCEAvesPesadasPR] = React.useState()

    let [responseGraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR] = React.useState({})
    let [GraficoRACTotalCEAvesPesadasPR, setGraficoRACTotalCEAvesPesadasPR] = React.useState()

    let [responseGraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR] = React.useState({})
    let [GraficoRACAvesPesadasPR, setGraficoRACAvesPesadasPR] = React.useState()

    let [responseGraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR] = React.useState({})
    let [GraficoNCCMPAvesPesadasPR, setGraficoNCCMPAvesPesadasPR] = React.useState()

    //Aves pesadas SP/CO/NE RAC
    let [responseGraficoCETotalAvesPesadasSP, setresponseGraficoCETotalAvesPesadasSP] = React.useState({})
    let [GraficoCETotalAvesPesadasSP, setGraficoCETotalAvesPesadasSP] = React.useState()

    let [responseGraficoNNCMPTotalCEAvesPesadasSP, setresponseGraficoNNCMPTotalCEAvesPesadasSP] = React.useState({})
    let [GraficoNNCMPTotalCEAvesPesadasSP, setGraficoNNCMPTotalCEAvesPesadasSP] = React.useState()

    let [responseGraficoRACTotalCEAvesPesadasSP, setresponseGraficoRACTotalCEAvesPesadasSP] = React.useState({})
    let [GraficoRACTotalCEAvesPesadasSP, setGraficoRACTotalCEAvesPesadasSP] = React.useState()

    let [responseGraficoRACAvesPesadasSP, setresponseGraficoRACAvesPesadasSP] = React.useState({})
    let [GraficoRACAvesPesadasSP, setGraficoRACAvesPesadasSP] = React.useState()

    let [responseGraficoNCCMPAvesPesadasSP, setresponseGraficoNCCMPAvesPesadasSP] = React.useState({})
    let [GraficoNCCMPAvesPesadasSP, setGraficoNCCMPAvesPesadasSP] = React.useState()

    //Aves pesadas RS/SC/SP RAC
    let [responseGraficoCETotalAvesPesadasRS, setresponseGraficoCETotalAvesPesadasRS] = React.useState({})
    let [GraficoCETotalAvesPesadasRS, setGraficoCETotalAvesPesadasRS] = React.useState()

    let [responseGraficoNNCMPTotalCEAvesPesadasRS, setresponseGraficoNNCMPTotalCEAvesPesadasRS] = React.useState({})
    let [GraficoNNCMPTotalCEAvesPesadasRS, setGraficoNNCMPTotalCEAvesPesadasRS] = React.useState()

    let [responseGraficoRACTotalCEAvesPesadasRS, setresponseGraficoRACTotalCEAvesPesadasRS] = React.useState({})
    let [GraficoRACTotalCEAvesPesadasRS, setGraficoRACTotalCEAvesPesadasRS] = React.useState()

    let [responseGraficoRACAvesPesadasRS, setresponseGraficoRACAvesPesadasRS] = React.useState({})
    let [GraficoRACAvesPesadasRS, setGraficoRACAvesPesadasRS] = React.useState()

    let [responseGraficoNCCMPAvesPesadasRS, setresponseGraficoNCCMPAvesPesadasRS] = React.useState({})
    let [GraficoNCCMPAvesPesadasRS, setGraficoNCCMPAvesPesadasRS] = React.useState()

    //Aves Leves RAC
    let [responseGraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves] = React.useState({})
    let [GraficoCETotalAvesLeves, setGraficoCETotalAvesLeves] = React.useState()

    let [responseGraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves] = React.useState({})
    let [GraficoNNCMPTotalCEAvesLeves, setGraficoNNCMPTotalCEAvesLeves] = React.useState()

    let [responseGraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves] = React.useState({})
    let [GraficoRACTotalCEAvesLeves, setGraficoRACTotalCEAvesLeves] = React.useState()

    let [responseGraficoRACAvesLeves, setresponseGraficoRACAvesLeves] = React.useState({})
    let [GraficoRACAvesLeves, setGraficoRACAvesLeves] = React.useState()

    let [responseGraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves] = React.useState({})
    let [GraficoNCCMPAvesLeves, setGraficoNCCMPAvesLeves] = React.useState()

    //Suínos RAC
    let [responseGraficoCETotalSuinos, setresponseGraficoCETotalSuinos] = React.useState({})
    let [GraficoCETotalSuinos, setGraficoCETotalSuinos] = React.useState()

    let [responseGraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos] = React.useState({})
    let [GraficoNNCMPTotalCESuinos, setGraficoNNCMPTotalCESuinos] = React.useState()

    let [responseGraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos] = React.useState({})
    let [GraficoRACTotalCESuinos, setGraficoRACTotalCESuinos] = React.useState()

    let [responseGraficoRACSuinos, setresponseGraficoRACSuinos] = React.useState({})
    let [GraficoRACSuinos, setGraficoRACSuinos] = React.useState()

    let [responseGraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos] = React.useState({})
    let [GraficoNCCMPSuinos, setGraficoNCCMPSuinos] = React.useState()

    //Preparados RAC
    let [responseGraficoCETotalPreparados, setresponseGraficoCETotalPreparados] = React.useState({})
    let [GraficoCETotalPreparados, setGraficoCETotalPreparados] = React.useState()

    let [responseGraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados] = React.useState({})
    let [GraficoNNCMPTotalCEPreparados, setGraficoNNCMPTotalCEPreparados] = React.useState()

    let [responseGraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados] = React.useState({})
    let [GraficoRACTotalCEPreparados, setGraficoRACTotalCEPreparados] = React.useState()

    let [responseGraficoRACPreparados, setresponseGraficoRACPreparados] = React.useState({})
    let [GraficoRACPreparados, setGraficoRACPreparados] = React.useState()

    let [responseGraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados] = React.useState({})
    let [GraficoNCCMPPreparados, setGraficoNCCMPPreparados] = React.useState()


    let [responseGraficoRACUnidadesAvesPesadas, setresponseGraficoRACUnidadesAvesPesadas] = React.useState({})
    let [GraficoRACUnidadesAvesPesadas, setGraficoRACUnidadesAvesPesadas] = React.useState()
    let [responseGraficoRACProblemasAvesPesadas, setresponseGraficoRACProblemasAvesPesadas] = React.useState({})
    let [GraficoRACProblemasAvesPesadas, setGraficoRACProblemasAvesPesadas] = React.useState()

    let [responseGraficoRACUnidadesAvesPesadasPR, setresponseGraficoRACUnidadesAvesPesadasPR] = React.useState({})
    let [GraficoRACUnidadesAvesPesadasPR, setGraficoRACUnidadesAvesPesadasPR] = React.useState()
    let [responseGraficoRACProblemasAvesPesadasPR, setresponseGraficoRACProblemasAvesPesadasPR] = React.useState({})
    let [GraficoRACProblemasAvesPesadasPR, setGraficoRACProblemasAvesPesadasPR] = React.useState()

    let [responseGraficoRACUnidadesAvesPesadasSP, setresponseGraficoRACUnidadesAvesPesadasSP] = React.useState({})
    let [GraficoRACUnidadesAvesPesadasSP, setGraficoRACUnidadesAvesPesadasSP] = React.useState()
    let [responseGraficoRACProblemasAvesPesadasSP, setresponseGraficoRACProblemasAvesPesadasSP] = React.useState({})
    let [GraficoRACProblemasAvesPesadasSP, setGraficoRACProblemasAvesPesadasSP] = React.useState()

    let [responseGraficoRACUnidadesAvesPesadasRS, setresponseGraficoRACUnidadesAvesPesadasRS] = React.useState({})
    let [GraficoRACUnidadesAvesPesadasRS, setGraficoRACUnidadesAvesPesadasRS] = React.useState()
    let [responseGraficoRACProblemasAvesPesadasRS, setresponseGraficoRACProblemasAvesPesadasRS] = React.useState({})
    let [GraficoRACProblemasAvesPesadasRS, setGraficoRACProblemasAvesPesadasRS] = React.useState()

    let [responseGraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves] = React.useState({})
    let [GraficoRACUnidadesAvesLeves, setGraficoRACUnidadesAvesLeves] = React.useState()
    let [responseGraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves] = React.useState({})
    let [GraficoRACProblemasAvesLeves, setGraficoRACProblemasAvesLeves] = React.useState()

    let [responseGraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos] = React.useState({})
    let [GraficoRACUnidadesSuinos, setGraficoRACUnidadesSuinos] = React.useState()
    let [responseGraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos] = React.useState({})
    let [GraficoRACProblemasSuinos, setGraficoRACProblemasSuinos] = React.useState()

    let [responseGraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados] = React.useState({})
    let [GraficoRACUnidadesPreparados, setGraficoRACUnidadesPreparados] = React.useState()
    let [responseGraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados] = React.useState({})
    let [GraficoRACProblemasPreparados, setGraficoRACProblemasPreparados] = React.useState()

    let [responseGraficoRACME, setresponseGraficoRACME] = React.useState({})
    let [GraficoRACME, setGraficoRACME] = React.useState()

    let [TableRACAberturaME, setTableRacAberturaME] = React.useState()

    let [responseGraficoRACMI, setresponseGraficoRACMI] = React.useState({})
    let [GraficoRACMI, setGraficoRACMI] = React.useState()

    let [TableRacAberturaMEOrienteMedio, setTableRacAberturaMEOrienteMedio] = React.useState()
    let [TableRacAberturaMEEuropa, setTableRacAberturaMEEuropa] = React.useState()
    let [TableRacAberturaMEJapao, setTableRacAberturaMEJapao] = React.useState()

    let [TableRacAberturaMEAsia, setTableRacAberturaMEAsia] = React.useState()
    let [TableRacAberturaMEAmericasAfrica, setTableRacAberturaMEAmericasAfrica] = React.useState()
    let [TableRacAberturaMEContasGlobais, setTableRacAberturaMEContasGlobais] = React.useState()



    let [responseTable, setresponseTable] = React.useState({})
    let [TableRacME, setTableRacME] = React.useState()

    let [TableRacFinalME, setTableRacFinalME] = React.useState() //ME
    let [TableRacFinalMI, setTableRacFinalMI] = React.useState() //MI
    let [TableRacFinalRECL, setTableRacFinalRECL] = React.useState() //RECLAMAÇÕES ESPECIAIS
    let [TableRacFinalPDV, setTableRacFinalPDV] = React.useState() //PDV ABERTURA
    let [TableRacFinalTE, setTableRacFinalTE] = React.useState() //ABERTURA TERCEIROS
    let [TableRacFinalCRIT, setTableRacFinalCRIT] = React.useState() //CRITICOS

    //FFO
    let [responseGraficoRACDetalhesFFO, setresponseGraficoRACDetalhesFFO] = React.useState({})
    let [GraficoRACDetalhesFFO, setGraficoRACDetalhesFFO] = React.useState()

    //Atendimento Comercial
    let [responseGraficoRACDetalhesAC, setresponseGraficoRACDetalhesAC] = React.useState({})
    let [GraficoRACDetalhesAC, setGraficoRACDetalhesAC] = React.useState()

    //Logística Exportação
    let [responseGraficoRACDetalhesLogME, setresponseGraficoRACDetalhesLogME] = React.useState({})
    let [GraficoRACDetalhesLogME, setGraficoRACDetalhesLogME] = React.useState()

    //Logística Importação
    let [responseGraficoRACDetalhesLogMI, setresponseGraficoRACDetalhesLogMI] = React.useState({})
    let [GraficoRACDetalhesLogMI, setGraficoRACDetalhesLogMI] = React.useState()

    //Documentação
    let [responseGraficoRACDetalhesDoc, setresponseGraficoRACDetalhesDoc] = React.useState({})
    let [GraficoRACDetalhesDoc, setGraficoRACDetalhesDoc] = React.useState()

    //Transporte Terrestre
    let [responseGraficoRACDetalhesTT, setresponseGraficoRACDetalhesTT] = React.useState({})
    let [GraficoRACDetalhesTT, setGraficoRACDetalhesTT] = React.useState()

    //Produção em Terceiro (ex. Massatake)
    let [responseGraficoRACDetalhesTerceiro, setresponseGraficoRACDetalhesTerceiro] = React.useState({})
    let [GraficoRACDetalhesTerceiro, setGraficoRACDetalhesTerceiro] = React.useState()

    let [TableRacRACDetalhesTerceiro, setTableRacRACDetalhesTerceiro] = React.useState() //ABERTURA TERCEIROS

    //Massatake
    let [responseGraficoRACDetalhesMassatake, setresponseGraficoRACDetalhesMassatake] = React.useState({})
    let [GraficoRACDetalhesMassatake, setGraficoRACDetalhesMassatake] = React.useState()

    //PDV
    let [responseGraficoRACDetalhesPDV, setresponseGraficoRACDetalhesPDV] = React.useState({})
    let [GraficoRACDetalhesPDV, setGraficoRACDetalhesPDV] = React.useState()

    let [responseGraficoRACDetalhesAberturaPDV, setresponseGraficoRACDetalhesAberturaPDV] = React.useState({})
    let [GraficoRACDetalhesAberturaPDV, setGraficoRACDetalhesAberturaPDV] = React.useState()

    let [TableRacRACDetalhesPDV, setTableRacRACDetalhesPDV] = React.useState() //ABERTURA PDV

    //RAC Crítica
    let [responseGraficoRACDetalhesCritica, setresponseGraficoRACDetalhesCritica] = React.useState({})
    let [GraficoRACDetalhesCritica, setGraficoRACDetalhesCritica] = React.useState()

    let [TableRacRACDetalhesCritica, setTableRacRACDetalhesCritica] = React.useState() //ABERTURA Critica

    //RAC Evolução - Totais
    let [TableRacRACDetalhesEvolucaoTotal, setTableRacRACDetalhesEvolucaoTotal] = React.useState() 

    //RAC Evolução - Aves
    let [TableRacRACDetalhesEvolucaoAves, setTableRacRACDetalhesEvolucaoAves] = React.useState()

    //RAC Meta x Real Aves
    let [TableRacRACDetalhesMetaRealAves, setTableRacRACDetalhesMetaRealAves] = React.useState()

    //RAC Evolução - Preparados
    let [TableRacRACDetalhesEvolucaoPreparados, setTableRacRACDetalhesEvolucaoPreparados] = React.useState()

    //RAC Evolução - Fatiados
    let [TableRacRACDetalhesEvolucaoFatiados, setTableRacRACDetalhesEvolucaoFatiados] = React.useState()

    //RAC Evolução - Pescados
    let [TableRacRACDetalhesEvolucaoPescados, setTableRacRACDetalhesEvolucaoPescados] = React.useState()

    //RAC Meta x Real Preparados
    let [TableRacRACDetalhesMetaRealPreparados, setTableRacRACDetalhesMetaRealPreparados] = React.useState()

    //RAC Evolução - Suínos
    let [TableRacRACDetalhesEvolucaoSuinos, setTableRacRACDetalhesEvolucaoSuinos] = React.useState()

    //RAC Meta x Real Suínos
    let [TableRacRACDetalhesMetaRealSuinos, setTableRacRACDetalhesMetaRealSuinos] = React.useState()

    //RAC Linhas Especiais (Seara Nature, Gourmet, Incrível)
    let [responseGraficoRACDetalhesEspeciais, setresponseGraficoRACDetalhesEspeciais] = React.useState({})
    let [GraficoRACDetalhesEspeciais, setGraficoRACDetalhesEspeciais] = React.useState()

    let [TableRacRACDetalhesEspeciaisFamilia, setTableRacRACDetalhesEspeciaisFamilia] = React.useState() //ABERTURA Especiais Familia
    let [TableRacRACDetalhesEspeciaisAcumulado, setTableRacRACDetalhesEspeciaisAcumulado] = React.useState() //ABERTURA Especiais Acumulado

    //RAC Corpo Estanho - [Totais]
    let [responseGraficoRACDetalhesCE, setresponseGraficoRACDetalhesCE] = React.useState({})
    let [GraficoRACDetalhesCE, setGraficoRACDetalhesCE] = React.useState()

    //RAC Corpo Estanho - [Inerente]
    let [responseGraficoRACDetalhesCEInerente, setresponseGraficoRACDetalhesCEInerente] = React.useState({})
    let [GraficoRACDetalhesCEInerente, setGraficoRACDetalhesCEInerente] = React.useState()

    //RAC Corpo Estanho - [Não Inerente]
    let [responseGraficoRACDetalhesCENaoInerente, setresponseGraficoRACDetalhesCENaoInerente] = React.useState({})
    let [GraficoRACDetalhesCENaoInerente, setGraficoRACDetalhesCENaoInerente] = React.useState()

    //RAC Corpo Estanho - [Plástico]
    let [responseGraficoRACDetalhesCEPlastico, setresponseGraficoRACDetalhesCEPlastico] = React.useState({})
    let [GraficoRACDetalhesCEPlastico, setGraficoRACDetalhesCEPlastico] = React.useState()

    //RAC Inseto
    let [responseGraficoRACDetalhesInseto, setresponseGraficoRACDetalhesInseto] = React.useState({})
    let [GraficoRACDetalhesInseto, setGraficoRACDetalhesInseto] = React.useState()

    let [TableRacRACDetalhesInseto, setTableRacRACDetalhesInseto] = React.useState() //ABERTURA Insetos

    //RAC Cabelo
    let [responseGraficoRACDetalhesCabelo, setresponseGraficoRACDetalhesCabelo] = React.useState({})
    let [GraficoRACDetalhesCabelo, setGraficoRACDetalhesCabelo] = React.useState()

    let [TableRacRACDetalhesCabelo, setTableRacRACDetalhesCabelo] = React.useState() //ABERTURA Cabelo

    //RAC Plastico
    let [responseGraficoRACDetalhesPlastico, setresponseGraficoRACDetalhesPlastico] = React.useState({})
    let [GraficoRACDetalhesPlastico, setGraficoRACDetalhesPlastico] = React.useState()

    let [TableRacRACDetalhesPlastico, setTableRacRACDetalhesPlastico] = React.useState() //ABERTURA Plastico

    //RAC Metal
    let [responseGraficoRACDetalhesMetal, setresponseGraficoRACDetalhesMetal] = React.useState({})
    let [GraficoRACDetalhesMetal, setGraficoRACDetalhesMetal] = React.useState()

    let [TableRacRACDetalhesMetal, setTableRacRACDetalhesMetal] = React.useState() //ABERTURA Metal

    //RAC Intoxicação
    let [responseGraficoRACDetalhesIntoxicacao, setresponseGraficoRACDetalhesIntoxicacao] = React.useState({})
    let [GraficoRACDetalhesIntoxicacao, setGraficoRACDetalhesIntoxicacao] = React.useState()

    let [TableRacRACDetalhesIntoxicacao, setTableRacRACDetalhesIntoxicacao] = React.useState() //ABERTURA Intoxicacao

    //RAC Larva
    let [responseGraficoRACDetalhesLarva, setresponseGraficoRACDetalhesLarva] = React.useState({})
    let [GraficoRACDetalhesLarva, setGraficoRACDetalhesLarva] = React.useState()

    let [TableRacRACDetalhesLarva, setTableRacRACDetalhesLarva] = React.useState() //ABERTURA Larva

    //tabela Corpos Estranhos
    let [TableRacRACDetalhesCE, setTableRacRACDetalhesCE] = React.useState() //ABERTURA CE

    //tabela Corpos Estranhos Inerente
    let [TableRacRACDetalhesCEInerente, setTableRacRACDetalhesCEInerente] = React.useState() //ABERTURA CE Inerente

    //tabela Corpos Estranhos Não Inerente
    let [TableRacRACDetalhesCENaoInerente, setTableRacRACDetalhesCENaoInerente] = React.useState() //ABERTURA CE Nao Inerente

    //tabela Corpos Estranhos Inerente e Não inerente
    let [TableRacRACDetalhesCEInerenteNaoInerente, setTableRacRACDetalhesCEInerenteNaoInerente] = React.useState() //ABERTURA CE Inerente e Nao Inerente

    //tabela Habilitador Corpos Estranhos Não Inerentes
    let [TableRacRACDetalhesHBCENaoInerente, setTableRacRACDetalhesHBCENaoInerente] = React.useState() //ABERTURA Habilidador CE Nao Inerente

    //tabela RAC D-3 In Natura
    let [TableRacRACD3InNatura, setTableRacRACD3InNatura] = React.useState() //ABERTURA D-3 InNatura

    //tabela RAC D-3 Preparados
    let [TableRacRACD3Preparados, setTableRacRACD3Preparados] = React.useState() //ABERTURA D-3 Preparados

    //tabela RAC D-0 In Natura
    let [TableRacRACD0InNatura, setTableRacRACD0InNatura] = React.useState() //ABERTURA D-0 InNatura

    //tabela RAC D-0 Preparados
    let [TableRacRACD0Preparados, setTableRacRACD0Preparados] = React.useState() //ABERTURA D-0 Preparados

    //NNC LOG Total
    let [responseGraficoNNCLogDetalhesTotal, setresponseGraficoNNCLogDetalhesTotal] = React.useState({})
    let [GraficoNNCLogDetalhesTotal, setGraficoNNCLogDetalhesTotal] = React.useState()

    //NNC LOG Aves
    let [responseGraficoNNCLogDetalhesAves, setresponseGraficoNNCLogDetalhesAves] = React.useState({})
    let [GraficoNNCLogDetalhesAves, setGraficoNNCLogDetalhesAves] = React.useState()

    //NNC LOG Preparados
    let [responseGraficoNNCLogDetalhesPreparados, setresponseGraficoNNCLogDetalhesPreparados] = React.useState({})
    let [GraficoNNCLogDetalhesPreparados, setGraficoNNCLogDetalhesPreparados] = React.useState()

    //NNC LOG Suinos
    let [responseGraficoNNCLogDetalhesSuinos, setresponseGraficoNNCLogDetalhesSuinos] = React.useState({})
    let [GraficoNNCLogDetalhesSuinos, setGraficoNNCLogDetalhesSuinos] = React.useState()

    //tabela NNC Log Evolução
    let [TableNNCLogEvolucao, setTableNNCLogEvolucao] = React.useState() 

    //tabela NNC Log D-3 
    let [TableNNCD3, setTableNNCD3] = React.useState() 
    //tabela NNC Log D-0 
    let [TableNNCD0, setTableNNCD0] = React.useState()

    //tabela NNC Totais 
    let [TableNNCTotais, setTableNNCTotais] = React.useState()

    //tabela NNC Evolução dia 
    let [TableNNCEvolucaoDia, setTableNNCEvolucaoDia] = React.useState()

    //NNC
    let [responseGraficoNNCAvesPesadas, setresponseGraficoNNCAvesPesadas] = React.useState({})
    let [GraficoNNCAvesPesadas, setGraficoNNCAvesPesadas] = React.useState()
    let [responseGraficoNNCAvesPesadasUnidades, setresponseGraficoNNCAvesPesadasUnidades] = React.useState({})
    let [GraficoNNCAvesPesadasUnidades, setGraficoNNCAvesPesadasUnidades] = React.useState()
    let [responseGraficoNNCAvesPesadasProblemas, setresponseGraficoNNCAvesPesadasProblemas] = React.useState({})
    let [GraficoNNCAvesPesadasProblemas, setGraficoNNCAvesPesadasProblemas] = React.useState()

    let [responseGraficoNNCAvesRS, setresponseGraficoNNCAvesRS] = React.useState({})
    let [GraficoNNCAvesRS, setGraficoNNCAvesRS] = React.useState()
    let [responseGraficoNNCAvesRSUnidades, setresponseGraficoNNCAvesRSUnidades] = React.useState({})
    let [GraficoNNCAvesRSUnidades, setGraficoNNCAvesRSUnidades] = React.useState()
    let [responseGraficoNNCAvesRSProblemas, setresponseGraficoNNCAvesRSProblemas] = React.useState({})
    let [GraficoNNCAvesRSProblemas, setGraficoNNCAvesRSProblemas] = React.useState()

    let [responseGraficoNNCAvesSP, setresponseGraficoNNCAvesSP] = React.useState({})
    let [GraficoNNCAvesSP, setGraficoNNCAvesSP] = React.useState()
    let [responseGraficoNNCAvesSPUnidades, setresponseGraficoNNCAvesSPUnidades] = React.useState({})
    let [GraficoNNCAvesSPUnidades, setGraficoNNCAvesSPUnidades] = React.useState()
    let [responseGraficoNNCAvesSPProblemas, setresponseGraficoNNCAvesSPProblemas] = React.useState({})
    let [GraficoNNCAvesSPProblemas, setGraficoNNCAvesSPProblemas] = React.useState()

    let [responseGraficoNNCAvesPR, setresponseGraficoNNCAvesPR] = React.useState({})
    let [GraficoNNCAvesPR, setGraficoNNCAvesPR] = React.useState()
    let [responseGraficoNNCAvesPRUnidades, setresponseGraficoNNCAvesPRUnidades] = React.useState({})
    let [GraficoNNCAvesPRUnidades, setGraficoNNCAvesPRUnidades] = React.useState()
    let [responseGraficoNNCAvesPRProblemas, setresponseGraficoNNCAvesPRProblemas] = React.useState({})
    let [GraficoNNCAvesPRProblemas, setGraficoNNCAvesPRProblemas] = React.useState()

    let [responseGraficoNNCAvesLeves, setresponseGraficoNNCAvesLeves] = React.useState({})
    let [GraficoNNCAvesLeves, setGraficoNNCAvesLeves] = React.useState()
    let [responseGraficoNNCAvesLevesUnidades, setresponseGraficoNNCAvesLevesUnidades] = React.useState({})
    let [GraficoNNCAvesLevesUnidades, setGraficoNNCAvesLevesUnidades] = React.useState()
    let [responseGraficoNNCAvesLevesProblemas, setresponseGraficoNNCAvesLevesProblemas] = React.useState({})
    let [GraficoNNCAvesLevesProblemas, setGraficoNNCAvesLevesProblemas] = React.useState()

    let [responseGraficoNNCSuinos, setresponseGraficoNNCSuinos] = React.useState({})
    let [GraficoNNCSuinos, setGraficoNNCSuinos] = React.useState()
    let [responseGraficoNNCSuinosUnidades, setresponseGraficoNNCSuinosUnidades] = React.useState({})
    let [GraficoNNCSuinosUnidades, setGraficoNNCSuinosUnidades] = React.useState()
    let [responseGraficoNNCSuinosProblemas, setresponseGraficoNNCSuinosProblemas] = React.useState({})
    let [GraficoNNCSuinosProblemas, setGraficoNNCSuinosProblemas] = React.useState()

    let [responseGraficoNNCPreparados, setresponseGraficoNNCPreparados] = React.useState({})
    let [GraficoNNCPreparados, setGraficoNNCPreparados] = React.useState()
    let [responseGraficoNNCPreparadosUnidades, setresponseGraficoNNCPreparadosUnidades] = React.useState({})
    let [GraficoNNCPreparadosUnidades, setGraficoNNCPreparadosUnidades] = React.useState()
    let [responseGraficoNNCPreparadosProblemas, setresponseGraficoNNCPreparadosProblemas] = React.useState({})
    let [GraficoNNCPreparadosProblemas, setGraficoNNCPreparadosProblemas] = React.useState()


    let [responseGraficoNNCCETotal, setresponseGraficoNNCCETotal] = React.useState({})
    let [GraficoNNCCETotal, setGraficoNNCCETotal] = React.useState()

    let [responseGraficoNNCCEInerente, setresponseGraficoNNCCEInerente] = React.useState({})
    let [GraficoNNCCEInerente, setGraficoNNCCEInerente] = React.useState()

    let [responseGraficoNNCCENaoInerente, setresponseGraficoNNCCENaoInerente] = React.useState({})
    let [GraficoNNCCENaoInerente, setGraficoNNCCENaoInerente] = React.useState()

    let [responseGraficoNNCCEOssos, setresponseGraficoNNCCEOssos] = React.useState({})
    let [GraficoNNCCEOssos, setGraficoNNCCEOssos] = React.useState()

    let [responseGraficoNNCCEPlastico, setresponseGraficoNNCCEPlastico] = React.useState({})
    let [GraficoNNCCEPlastico, setGraficoNNCCEPlastico] = React.useState()

    let [responseGraficoNNCCEMetal, setresponseGraficoNNCCEMetal] = React.useState({})
    let [GraficoNNCCEMetal, setGraficoNNCCEMetal] = React.useState()






    let whereRACPreparados = "WHERE ([Regional (Qualidade)] like 'Preparados%' or [Regional (Qualidade)] in ('Outros', 'Itajaí')) "
    whereRACPreparados += " AND ([ORIGEM DO PROBLEMA] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','FABRICAÇÃO')"
    whereRACPreparados += "                                 OR [ORIGEM DO PROBLEMA] IS NULL) "
    whereRACPreparados += " and unidade in ( "
    whereRACPreparados += " 'Brasília',  "
    whereRACPreparados += " 'Dourados',  "
    whereRACPreparados += " 'Duque de Caxias',  "
    whereRACPreparados += " 'Jaguariúna',  "
    whereRACPreparados += " 'Lages',  "
    whereRACPreparados += " 'Montenegro',  "
    whereRACPreparados += " 'Rio Grande da Serra',  "
    whereRACPreparados += " 'Roca Sales',  "
    whereRACPreparados += " 'Salto Veloso',  "
    whereRACPreparados += "  'São Gonçalo',  "
    whereRACPreparados += " 'São Miguel do Oeste',  "
    whereRACPreparados += " 'Três Passos',  "
    whereRACPreparados += " 'Bom Retiro', "
    whereRACPreparados += " 'Carambeí',  "
    whereRACPreparados += " 'Osasco',  "
    whereRACPreparados += " 'Jundiaí', "
    whereRACPreparados += " 'Caxias do Sul - Ana Rech',  "
    whereRACPreparados += " 'Itapiranga',  "
    whereRACPreparados += " 'Seara',  "
    whereRACPreparados += " 'Jaragua do Sul',  "
    whereRACPreparados += " 'ITAJAI INDUSTRIALIZADOS',  "
    whereRACPreparados += " 'ITAJAI SUINOS')"

    let whereRACCE = " WHERE Tipo = 'REAL'  "
    whereRACCE += " AND Grupo = 'CORPO ESTRANHO' "
    whereRACCE += " AND [Regional (Qualidade)] NOT IN ('Excelsior') "
    whereRACCE += " AND [Tipo CE] = 'Não Inerente'  "
    whereRACCE += " AND  [Tipo_Atendimento_rac] IN ( "
    whereRACCE += " 'CONTATO EXCELSIOR_RAC',  "
    whereRACCE += " 'CONTATO JBS CARNES',  "
    whereRACCE += " 'CONTATO MERCADO DA CARNE',  "
    whereRACCE += " 'NOTIFICAÇÃO',  "
    whereRACCE += " 'RECLAMAÇÃO',  "
    whereRACCE += " 'RECLAMAÇÃO ABUSO DE PRODUTO',  "
    whereRACCE += " 'RECLAMAÇÃO ABUSO PROD.',  "
    whereRACCE += " 'Reclamação Contas Globais',  "
    whereRACCE += " 'RECLAMAÇÃO FAB. NÃO IDENTIF.',  "
    whereRACCE += " 'RECLAMAÇÃO HANS',  "
    whereRACCE += " 'RECLAMAÇÃO VOSSKO')  "
    whereRACCE += " AND [Origem_do_Problema_rac] IN ( "
    whereRACCE += " 'Documentação Unidade',  "
    whereRACCE += " 'EXPEDIÇÃO FÁBRICA',  "
    whereRACCE += " 'FABRICAÇÃO',  "
    whereRACCE += " 'P-D') "

    let whereNNCMP = " WHERE ([Reg. Qual] NOT IN ('Itajaí', 'Outros')) "
    whereNNCMP += " AND ([Grupo Problema] NOT IN ('Distr / Log', 'Embalagem Secundária') or [Grupo Problema] is null) "
    whereNNCMP += " AND ([Entra para a Meta] <> 'Não' or [Entra para a Meta] is null) "
    
    function arrumaTabela2(classTable) {

        var table = $('.' + classTable + ' table')[0];
        if(table) {

            for (var i = 0; i < table.rows.length; i++) {
                //console.log($('.'+classTable+' table').rows[i].cells[0].innerText);
                if (table.rows[i].cells[0].innerText.match(/.*@@.*/)) {
                    //alert($('.'+classTable+' table').rows[i].cells[0].innerText)
                    table.rows[i].style.background = '#cccccc'
                }
            }
            var classtable = $('.' + classTable + '')[0];
            classtable.innerHTML = classtable.innerHTML.replaceAll(".....", "&nbsp;&nbsp;&nbsp;&nbsp;")
            classtable.innerHTML = classtable.innerHTML.replaceAll("@@", "")
            classtable.innerHTML = classtable.innerHTML.replaceAll("&lt;b&gt;", "<b>")
            classtable.innerHTML = classtable.innerHTML.replaceAll("&lt;/b&gt;", "</b>")
            
            if (table.rows[table.rows.length - 1].cells[0].innerText == "Total") {
                table.rows[table.rows.length - 1].style.background = '#999999'
                table.rows[table.rows.length - 1].style.color = 'white'
    
            }
        }
    }

    function ttt(aa){
        for (var i=0; i<$('.clOrienteMedio table').rows.length;i++)
        {      
            if($('.clOrienteMedio table').rows[i].cells[0].innerText.match(/.*@@.*/)  ){         
                $('.clOrienteMedio table').rows[i].style.background = '#cccccc'     
            } 
        }     
        $('.clOrienteMedio').innerHTML = $('.clOrienteMedio').innerHTML.replaceAll('.....','&nbsp;&nbsp;&nbsp;&nbsp;')  
        $('.clOrienteMedio').innerHTML = $('.clOrienteMedio').innerHTML.replaceAll('@@','')     
        $('.clOrienteMedio').innerHTML = $('.clOrienteMedio').innerHTML.replaceAll('&lt;b&gt;','<b>')     
        $('.clOrienteMedio').innerHTML = $('.clOrienteMedio').innerHTML.replaceAll('&lt;/b&gt;','</b>')    
        
            if($('.clOrienteMedio table').rows[$('.clOrienteMedio table').rows.length-1].cells[0].innerText == 'Total'){         
            $('.clOrienteMedio table').rows[$('.clOrienteMedio table').rows.length-1].style.background = '#999999'         
        $('.clOrienteMedio table').rows[$('.clOrienteMedio table').rows.length-1].style.color = 'white'   
            }
        }

    function chamararrumaTabela(){
        
        let funcaoNova =    "  for (var i=0; i<$('.'+classTable+' table').rows.length;i++){ " +
           
            "     if($('.'+classTable+' table').rows[i].cells[0].innerText.match(/.*@@.*/)  ){ " +
             
             "        $('.'+classTable+' table').rows[i].style.background = '#cccccc'; " +
             "    } " +
             "} " +
             "    $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll('.....','&nbsp;&nbsp;&nbsp;&nbsp;') ;" +
             " $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll('@@','') ;" +
             "    $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll('&lt;b&gt;','<b>'); " +   
             "    $('.'+classTable+'').innerHTML = $('.'+classTable+'').innerHTML.replaceAll('&lt;/b&gt;','</b>'); " +   
              "   if($('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].cells[0].innerText == 'Total'){  " +
              "       $('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].style.background = '#999999' ; " +
              "       $('.'+classTable+' table').rows[$('.'+classTable+' table').rows.length-1].style.color = 'white' ;" +     
               "  } "
        
               /*var f = new Function('classTable', funcaoNova);
               f("clOrienteMedio")
         f('clOrienteMedio')
         f('clEuropa')
         f('clJapao')
         f('clAsia')
         f('clAmericasAfrica')
         f('clContasGlobais')
         f('clAberturaME')
         f('clAberturaTerceiro')*/
    }

    

    //Handlers
    React.useEffect(() => {
        setIsUpdatingData(true);

        chamarAPI("CETotal", GraficoCETotal, "GraficoCETotal", [' where 1=1 '], setGraficoCETotal, setresponseGraficoCETotal, 0)     // 1
        chamarAPI("NNCMPTotalCE", GraficoNNCMPTotalCE, "GraficoNNCMPTotalCE", [' where 1=1 '], setGraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, 1)       // 2
        chamarAPI("RAC", GraficoRACTotalCE, "GraficoRACTotalCE", [whereRACCE], setGraficoRACTotalCE, setresponseGraficoRACTotalCE, 2)     // 3
        chamarAPI("RAC", GraficoRAC, "GraficoRAC", [' where 1=1 '], setGraficoRAC, setresponseGraficoRAC, 3)    // 4
        chamarAPI("NCCMP", GraficoNCCMP, "GraficoNCCMP", [whereNNCMP], setGraficoNCCMP, setresponseGraficoNCCMP, 4)    // 5 

        chamarAPI("CETotal", GraficoCETotalAvesPesadas, "GraficoCETotalAvesPesadas", [" where [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, 5)     // 6
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadas, "GraficoNNCMPTotalCEAvesPesadas", [" where tipo = 'NNC MP' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR') "], setGraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, 6)       // 7
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadas, "GraficoRACTotalCEAvesPesadas", [" where TIPO = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, 7)     // 8
        chamarAPI("RACIndicadores", GraficoRACAvesPesadas, "GraficoRACAvesPesadas", [" where [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\') "], setGraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, 8)    // 9
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadas, "GraficoNCCMPAvesPesadas", [whereNNCMP + " and [Reg. Qual] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, 9)    // 10

        chamarAPI("CETotal", GraficoCETotalAvesPesadasPR, "GraficoCETotalAvesPesadasPR", [' where [Regional Qualidade] = \'Aves Pesadas PR\' '], setGraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR, 10)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasPR, "GraficoNNCMPTotalCEAvesPesadasPR", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas PR'  "], setGraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR, 11)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasPR, "GraficoRACTotalCEAvesPesadasPR", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas PR')   "], setGraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR, 12)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasPR, "GraficoRACAvesPesadasPR", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas PR\') AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\')            '], setGraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR, 13)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasPR, "GraficoNCCMPAvesPesadasPR", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas PR\'  '], setGraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR, 14)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesPesadasSP, "GraficoCETotalAvesPesadasSP", [" where [Regional Qualidade] = 'Aves Pesadas SP/CO/NE' "], setGraficoCETotalAvesPesadasSP, setresponseGraficoCETotalAvesPesadasSP, 42)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasSP, "GraficoNNCMPTotalCEAvesPesadasSP", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas SP/CO/NE'  "], setGraficoNNCMPTotalCEAvesPesadasSP, setresponseGraficoNNCMPTotalCEAvesPesadasSP, 43)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasSP, "GraficoRACTotalCEAvesPesadasSP", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE')   "], setGraficoRACTotalCEAvesPesadasSP, setresponseGraficoRACTotalCEAvesPesadasSP, 44)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasSP, "GraficoRACAvesPesadasSP", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas SP/CO/NE\')  AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\') '], setGraficoRACAvesPesadasSP, setresponseGraficoRACAvesPesadasSP, 45)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasSP, "GraficoNCCMPAvesPesadasSP", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas SP/CO/NE\'  '], setGraficoNCCMPAvesPesadasSP, setresponseGraficoNCCMPAvesPesadasSP, 46)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesPesadasRS, "GraficoCETotalAvesPesadasRS", [" where [Regional Qualidade] = 'Aves Pesadas RS/SC/SP' "], setGraficoCETotalAvesPesadasRS, setresponseGraficoCETotalAvesPesadasRS, 47)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasRS, "GraficoNNCMPTotalCEAvesPesadasRS", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas RS/SC/SP'  "], setGraficoNNCMPTotalCEAvesPesadasRS, setresponseGraficoNNCMPTotalCEAvesPesadasRS, 48)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasRS, "GraficoRACTotalCEAvesPesadasRS", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas RS/SC/SP')   "], setGraficoRACTotalCEAvesPesadasRS, setresponseGraficoRACTotalCEAvesPesadasRS, 49)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasRS, "GraficoRACAvesPesadasRS", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas RS/SC/SP\' ) AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\')  '], setGraficoRACAvesPesadasRS, setresponseGraficoRACAvesPesadasRS, 50)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasRS, "GraficoNCCMPAvesPesadasRS", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas RS/SC/SP\'  '], setGraficoNCCMPAvesPesadasRS, setresponseGraficoNCCMPAvesPesadasRS, 51)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesLeves, "GraficoCETotalAvesLeves", [' where [Regional Qualidade]  = \'Aves Leves\' '], setGraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves, 15)     // 11
        chamarAPI("NNCMPTotalCE", GraficoNNCMPTotalCEAvesLeves, "GraficoNNCMPTotalCEAvesLeves", [' where [Regional (Qualidade)] = \'Aves Leves\' '], setGraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves, 16)       // 12
        chamarAPI("RACTotalCE", GraficoRACTotalCEAvesLeves, "GraficoRACTotalCEAvesLeves", ['  WHERE [Negócio (Qualidade)] = \'Aves Leves\'   '], setGraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves, 17)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesLeves, "GraficoRACAvesLeves", [' WHERE [Regional (Qualidade)] = \'Aves Leves\'  AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\') '], setGraficoRACAvesLeves, setresponseGraficoRACAvesLeves, 18)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesLeves, "GraficoNCCMPAvesLeves", [whereNNCMP + ' and [Reg. Qual] = \'Aves Leves\'  '], setGraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves, 19)    // 15

        chamarAPI("CETotal", GraficoCETotalSuinos, "GraficoCETotalSuinos", [' where [Regional Qualidade]  in (\'Suínos\',\'Suíno\') '], setGraficoCETotalSuinos, setresponseGraficoCETotalSuinos, 20)     // 11
        chamarAPI("NNCMPTotalCE", GraficoNNCMPTotalCESuinos, "GraficoNNCMPTotalCESuinos", [' where [Regional (Qualidade)] = \'Suínos\' '], setGraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos, 21)       // 12
        chamarAPI("RACTotalCE", GraficoRACTotalCESuinos, "GraficoRACTotalCESuinos", ['  WHERE [Negócio (Qualidade)] = \'Suínos\'   '], setGraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos, 22)     // 13
        chamarAPI("RACIndicadores", GraficoRACSuinos, "GraficoRACSuinos", [' WHERE [Regional (Qualidade)] = \'Suínos\'  AND [ORIGEM DO PROBLEMA] NOT IN (\'ABUSO DE PRODUTO PDV\') '], setGraficoRACSuinos, setresponseGraficoRACSuinos, 23)    // 14
        chamarAPI("NCCMP", GraficoNCCMPSuinos, "GraficoNCCMPSuinos", [whereNNCMP + ' and [Reg. Qual] = \'Suínos\'  '], setGraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos, 24)    // 15

        chamarAPI("CETotal", GraficoCETotalPreparados, "GraficoCETotalPreparados", [' where [Regional Qualidade] in (\'Preparados\',\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\',\'Itajaí\') '], setGraficoCETotalPreparados, setresponseGraficoCETotalPreparados, 25)     // 11
        chamarAPI("NNCMPTotalCE", GraficoNNCMPTotalCEPreparados, "GraficoNNCMPTotalCEPreparados", [' where [Regional (Qualidade)] in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\',\'Itajaí\') '], setGraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados, 26)       // 12
        chamarAPI("RACTotalCE", GraficoRACTotalCEPreparados, "GraficoRACTotalCEPreparados", ['  WHERE [Negócio (Qualidade)] in (\'Preparados\',\'Itajaí\')   '], setGraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados, 27)     // 13
        chamarAPI("RACIndicadores", GraficoRACPreparados, "GraficoRACPreparados", [whereRACPreparados] , setGraficoRACPreparados, setresponseGraficoRACPreparados, 28)    // 14
        chamarAPI("NCCMP", GraficoNCCMPPreparados, "GraficoNCCMPPreparados", [whereNNCMP + ' and [Reg. Qual] in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\')  '], setGraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados, 29)    // 15

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadas, "GraficoRACUnidadesAvesPesadas", [" where Tipo = 'REAL' and [Negócio (Qualidade)] IN ('Aves Pesadas','Aves Pesadas PR') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))          and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') "], setGraficoRACUnidadesAvesPesadas, setresponseGraficoRACUnidadesAvesPesadas, 30)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadas, "GraficoRACProblemasAvesPesadas", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] IN (\'Aves Pesadas\',\'Aves Pesadas PR\') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasAvesPesadas, setresponseGraficoRACProblemasAvesPesadas, 31)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasPR, "GraficoRACUnidadesAvesPesadasPR", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Pesadas PR\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesAvesPesadasPR, setresponseGraficoRACUnidadesAvesPesadasPR, 32)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasPR, "GraficoRACProblemasAvesPesadasPR", [" where Tipo = \'REAL\' and [Negócio (Qualidade)] = 'Aves Pesadas PR' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in ('DOCUMENTAÇÃO UNIDADE', 'EXPEDIÇÃO FÁBRICA', 'FÁBRICA PRODUÇÃO', 'Fabricação/ Produção', 'FABRICACAO/FABRICA', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\')"], setGraficoRACProblemasAvesPesadasPR, setresponseGraficoRACProblemasAvesPesadasPR, 33)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasSP, "GraficoRACUnidadesAvesPesadasSP", [' where Tipo = \'REAL\' and [Regional (Qualidade)] = \'Aves Pesadas SP/CO/NE\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesAvesPesadasSP, setresponseGraficoRACUnidadesAvesPesadasSP, 52)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasSP, "GraficoRACProblemasAvesPesadasSP", [" where Tipo = \'REAL\' and [Regional (Qualidade)] = 'Aves Pesadas SP/CO/NE' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in ('DOCUMENTAÇÃO UNIDADE', 'EXPEDIÇÃO FÁBRICA', 'FÁBRICA PRODUÇÃO', 'Fabricação/ Produção', 'FABRICACAO/FABRICA', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\')"], setGraficoRACProblemasAvesPesadasSP, setresponseGraficoRACProblemasAvesPesadasSP, 53)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasRS, "GraficoRACUnidadesAvesPesadasRS", [' where Tipo = \'REAL\' and [Regional (Qualidade)] = \'Aves Pesadas RS/SC/SP\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesAvesPesadasRS, setresponseGraficoRACUnidadesAvesPesadasRS, 54)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasRS, "GraficoRACProblemasAvesPesadasRS", [" where Tipo = \'REAL\' and [Regional (Qualidade)] = 'Aves Pesadas RS/SC/SP' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in ('DOCUMENTAÇÃO UNIDADE', 'EXPEDIÇÃO FÁBRICA', 'FÁBRICA PRODUÇÃO', 'Fabricação/ Produção', 'FABRICACAO/FABRICA', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\')"], setGraficoRACProblemasAvesPesadasRS, setresponseGraficoRACProblemasAvesPesadasRS, 55)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesLeves, "GraficoRACUnidadesAvesLeves", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Leves\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves, 34)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesLeves, "GraficoRACProblemasAvesLeves", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Leves\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves, 35)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesSuinos, "GraficoRACUnidadesSuinos", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Suínos\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos, 36)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasSuinos, "GraficoRACProblemasSuinos", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Suínos\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos, 37)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesPreparados, "GraficoRACUnidadesPreparados", [' where Tipo = \'REAL\' AND UNIDADE NOT IN (\'ITAJAI AVES PESADAS\') AND [Regional (Produção)] in (\'ITAJAÍ\', \'OUTROS\', \'PREPARADOS\', \'ITAJAÍ - INDUS\') and [Regional (Qualidade)] in (\'ITAJAÍ\', \'OUTROS\', \'PREPARADOS 1\', \'PREPARADOS 2\', \'ITAJAÍ\') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados, 38)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasPreparados, "GraficoRACProblemasPreparados", [' where Tipo = \'REAL\' AND UNIDADE NOT IN (\'ITAJAI AVES PESADAS\') AND [Regional (Produção)] in (\'ITAJAÍ\', \'OUTROS\', \'PREPARADOS\', \'ITAJAÍ - INDUS\') and [Regional (Qualidade)] in (\'ITAJAÍ\', \'OUTROS\', \'PREPARADOS 1\', \'PREPARADOS 2\', \'ITAJAÍ\') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados, 39)

        chamarAPI("RACIndicadores", GraficoRACME, "GraficoRACME", [" where mercado_rac = 'ME' "], setGraficoRACME, setresponseGraficoRACME, 40)
        chamarAPI("RACIndicadores", GraficoRACMI, "GraficoRACMI", [" where mercado_rac IN ('MI', 'INTERNO')  "], setGraficoRACMI, setresponseGraficoRACMI, 41)


        /////////////////////

        //FFO
        chamarAPI("RACIndicadores", GraficoRACDetalhesFFO, "GraficoRACDetalhesFFO", [" where 1=1 AND [ORIGEM DO PROBLEMA]  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','PRODUÇÃO EM TERCEIRO') AND [TIPO_ATENDIMENTO_RAC] IN ('RECLAMAÇÃO FFO') "] , setGraficoRACDetalhesFFO, setresponseGraficoRACDetalhesFFO, 52) 

        //Atendimento Comercial
        chamarAPI("RACIndicadores", GraficoRACDetalhesAC, "GraficoRACDetalhesAC", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('ATENDIMENTO COMERCIAL') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRÍTICA', 'NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO', 'RAC CAIXA', 'RAC COMPLEMENTAR') "] , setGraficoRACDetalhesAC, setresponseGraficoRACDetalhesAC, 53)

        //Logística Exportação
        chamarAPI("RACIndicadores", GraficoRACDetalhesLogME, "GraficoRACDetalhesLogME", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('LOGÍSTICA EXPORTAÇÃO') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRÍTICA', 'NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO', 'RAC CAIXA', 'RAC COMPLEMENTAR') "] , setGraficoRACDetalhesLogME, setresponseGraficoRACDetalhesLogME, 54)

        //Logística Importação
        chamarAPI("RACIndicadores", GraficoRACDetalhesLogMI, "GraficoRACDetalhesLogMI", [" WHERE 1=1  AND [ORIGEM DO PROBLEMA]  IN ('LOGÍSTICA MI')  AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "] , setGraficoRACDetalhesLogMI, setresponseGraficoRACDetalhesLogMI, 55)

        //Documentação
        chamarAPI("RACIndicadores", GraficoRACDetalhesDoc, "GraficoRACDetalhesDoc", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('DOCUMENTAÇÃO CORPORATIVO') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesDoc, setresponseGraficoRACDetalhesDoc, 56)

        //Transporte Terrestre
        chamarAPI("RACIndicadores", GraficoRACDetalhesTT, "GraficoRACDetalhesTT", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('TRANSPORTE TERRESTRE') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesTT, setresponseGraficoRACDetalhesTT, 57)

        //Produção em Terceiro (ex. Massatake)
        chamarAPI("RACIndicadores", GraficoRACDetalhesTerceiro, "GraficoRACDetalhesTerceiro", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('PRODUÇÃO EM TERCEIRO') AND UNIDADE NOT IN ('ITAJAI ÓLEO COMESTÍVEIS','MASSATAKE','VIGOR') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "] , setGraficoRACDetalhesTerceiro, setresponseGraficoRACDetalhesTerceiro, 58)

        //Massatake
        chamarAPI("RACIndicadoresSemFiltro", GraficoRACDetalhesMassatake, "GraficoRACDetalhesMassatake", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('PRODUÇÃO EM TERCEIRO') AND UNIDADE IN ('MASSATAKE') AND  [TIPO_ATENDIMENTO_RAC] IN ('RECLAMAÇÃO') "] , setGraficoRACDetalhesMassatake, setresponseGraficoRACDetalhesMassatake, 59)

        //PDV
        chamarAPI("RACIndicadores", GraficoRACDetalhesPDV, "GraficoRACDetalhesPDV", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('ABUSO DE PRODUTO PDV') AND UNIDADE NOT IN ('DAN VIGOR','GRAND ALIMENTOS S.A.','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR') AND  [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "] , setGraficoRACDetalhesPDV, setresponseGraficoRACDetalhesPDV, 60)
        chamarAPI("RACIndicadores", GraficoRACDetalhesAberturaPDV, "GraficoRACDetalhesAberturaPDV", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('ABUSO DE PRODUTO PDV') AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR')  AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "] , setGraficoRACDetalhesAberturaPDV, setresponseGraficoRACDetalhesAberturaPDV, 61)

        //RAC Crítica RACIndicadoresSemFiltro
        chamarAPI("RACIndicadoresSemFiltro", GraficoRACDetalhesCritica, "GraficoRACDetalhesCritica", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA') "] , setGraficoRACDetalhesCritica, setresponseGraficoRACDetalhesCritica, 62)

        //RAC Linhas Especiais (Seara Nature, Gourmet, Incrível)
        chamarAPI("RACIndicadores", GraficoRACDetalhesEspeciais, "GraficoRACDetalhesEspeciais", [" where 99=99 "] , setGraficoRACDetalhesEspeciais, setresponseGraficoRACDetalhesEspeciais, 63)

        //RAC Corpo Estanho - [Totais]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCE, "GraficoRACDetalhesCE", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA]  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO') AND [TIPO CE] IN ('INERENTE','NÃO INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCE, setresponseGraficoRACDetalhesCE, 64)

        //RAC Corpo Estanho - [Inerente]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCEInerente, "GraficoRACDetalhesCEInerente", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [TIPO CE] IN ('INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO','MORRO GRANDE') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCEInerente, setresponseGraficoRACDetalhesCEInerente, 65)

        //RAC Corpo Estanho - [Não Inerente]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCENaoInerente, "GraficoRACDetalhesCENaoInerente", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO') AND [TIPO CE] IN ('NÃO INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','VERÍSSIMO','MORRO GRANDE') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCENaoInerente, setresponseGraficoRACDetalhesCENaoInerente, 66)

        //RAC Corpo Estanho - [Plástico]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCEPlastico, "GraficoRACDetalhesCEPlastico", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') "] , setGraficoRACDetalhesCEPlastico, setresponseGraficoRACDetalhesCEPlastico, 67)

        //RAC Inseto
        chamarAPI("RACIndicadores", GraficoRACDetalhesInseto, "GraficoRACDetalhesInseto", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('INSETO') AND [SUB TIPO PROBLEMA] NOT IN ('LARVA') "] , setGraficoRACDetalhesInseto, setresponseGraficoRACDetalhesInseto, 68)

        //RAC Cabelo
        chamarAPI("RACIndicadores", GraficoRACDetalhesCabelo, "GraficoRACDetalhesCabelo", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('AMAI','DAN VIGOR','MARBA','GRANO','GRIFFOOD','JBS','MASSATAKE','SANTA CRIZ DO SUL','SERYA','VIGOR') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [TIPO DO PROBLEMA] IN ('FIO DE CABELO / PÊLO HUMANO','FIO DE CABELO/PÊLO HUMANO') "] , setGraficoRACDetalhesCabelo, setresponseGraficoRACDetalhesCabelo, 69)

        //RAC Plastico
        chamarAPI("RACIndicadores", GraficoRACDetalhesPlastico, "GraficoRACDetalhesPlastico", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') "] , setGraficoRACDetalhesPlastico, setresponseGraficoRACDetalhesPlastico,70)

        //RAC Metal
        chamarAPI("RACIndicadores", GraficoRACDetalhesMetal, "GraficoRACDetalhesMetal", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO','EXPEDIÇÃO FÁBRICA','P&D','PRODUÇÃO EM TERCEIRO') AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR')  AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [PROBLEMA] IN ('METAL','METÁLICO') "] , setGraficoRACDetalhesMetal, setresponseGraficoRACDetalhesMetal,71)

        //RAC Intoxicação
        chamarAPI("RACIndicadores", GraficoRACDetalhesIntoxicacao, "GraficoRACDetalhesIntoxicacao", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO','COMERCIALIZAÇÃO') AND UNIDADE NOT IN ('HORTUS','JBS','MASSATAKE','VIGOR') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [PROBLEMA] IN ('INTOXICAÇÃO ALIMENTAR') "] , setGraficoRACDetalhesIntoxicacao, setresponseGraficoRACDetalhesIntoxicacao,72)

        //RAC Larva
        chamarAPI("RACIndicadores", GraficoRACDetalhesLarva, "GraficoRACDetalhesLarva", [" WHERE 1=1 AND [ORIGEM DO PROBLEMA] IN ('FABRICAÇÃO') AND [GRUPO] IN ('CORPO ESTRANHO') AND [REGIONAL (Qualidade)] NOT IN ('FATIADOS','PESCADOS','AVES PR','AVES RS/SC/SP','AVES SP/CO/NE') AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR','ARTES GRÁFICAS','CAMPINAS-CD','CAMPO VERDE','CD RIBEIRÃO DAS NEVES','CPO','DOC INDUSTRIA','EIRELI EPP','EIRELI ME','EXCELSIOR','GENESEAS AQUACULTURA','GERÊNCIA NACIONA FS','GRANO ALIMENTOS S.A.','GRIFFOOD','ICOFORT','ITAJAI','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','ITAJAI PESCADOS','LABREZZA','M P FOODS','MARBA','MASSAS SANTA ENERSTINA LTDA','NORONHA', 'OUTROS','PINHAIS - CD','QUALIDADE SUPPLY CHAIN','RIBEIRÃO PRETO – CD','SALVADOR – CD','SAO PAULO – CD','SEARA MEATS','SOMAVE','VARZEA GRANDE – CD') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO') AND [PROBLEMA] IN ('INSETO','INSETO VIVO') AND [TIPO DO PROBLEMA] IN ('INSETO','LARVA', 'INSETO VIVO','LARVA VIVA')	 AND [SUB TIPO PROBLEMA] IN ('LARVA','LARVA VIVA') "] , setGraficoRACDetalhesLarva, setresponseGraficoRACDetalhesLarva,73)

        // //NNC Log
        // chamarAPI("NCCLOG", GraficoNNCLogDetalhesTotal, "GraficoNNCLogDetalhesTotal", [" where 1=1 "] , setGraficoNNCLogDetalhesTotal, setresponseGraficoNNCLogDetalhesTotal,74)
        // chamarAPI("NCCLOG", GraficoNNCLogDetalhesAves, "GraficoNNCLogDetalhesAves", [" where 1=1 "] , setGraficoNNCLogDetalhesAves, setresponseGraficoNNCLogDetalhesAves,75)
        // chamarAPI("NCCLOG", GraficoNNCLogDetalhesPreparados, "GraficoNNCLogDetalhesPreparados", [" where 1=1 "] , setGraficoNNCLogDetalhesPreparados, setresponseGraficoNNCLogDetalhesPreparados,76)
        // chamarAPI("NCCLOG", GraficoNNCLogDetalhesSuinos, "GraficoNNCLogDetalhesSuinos", [" where 1=1 "] , setGraficoNNCLogDetalhesSuinos, setresponseGraficoNNCLogDetalhesSuinos,77)

        // //NNC MP
        // chamarAPI("NCCMP", GraficoNNCAvesPesadas, "GraficoNNCAvesPesadas", [ ' WHERE 1=1 '], setGraficoNNCAvesPesadas, setresponseGraficoNNCAvesPesadas, 78)
        // chamarAPI("NCCMP", GraficoNNCAvesPesadasUnidades, "GraficoNNCAvesPesadasUnidades", [ ' WHERE 1=1 '], setGraficoNNCAvesPesadasUnidades, setresponseGraficoNNCAvesPesadasUnidades, 79)
        // chamarAPI("NCCMP", GraficoNNCAvesPesadasProblemas, "GraficoNNCAvesPesadasProblemas", [ ' WHERE 1=1 '], setGraficoNNCAvesPesadasProblemas, setresponseGraficoNNCAvesPesadasProblemas, 80)

        // chamarAPI("NCCMP", GraficoNNCAvesRS, "GraficoNNCAvesRS", [ ' WHERE 1=1 '], setGraficoNNCAvesRS, setresponseGraficoNNCAvesRS, 81)
        // chamarAPI("NCCMP", GraficoNNCAvesRSUnidades, "GraficoNNCAvesRSUnidades", [ ' WHERE 1=1 '], setGraficoNNCAvesRSUnidades, setresponseGraficoNNCAvesRSUnidades, 82)
        // chamarAPI("NCCMP", GraficoNNCAvesRSProblemas, "GraficoNNCAvesRSProblemas", [ ' WHERE 1=1 '], setGraficoNNCAvesRSProblemas, setresponseGraficoNNCAvesRSProblemas, 83)

        // chamarAPI("NCCMP", GraficoNNCAvesSP, "GraficoNNCAvesSP", [ ' WHERE 1=1 '], setGraficoNNCAvesSP, setresponseGraficoNNCAvesSP, 84)
        // chamarAPI("NCCMP", GraficoNNCAvesSPUnidades, "GraficoNNCAvesSPUnidades", [ ' WHERE 1=1 '], setGraficoNNCAvesSPUnidades, setresponseGraficoNNCAvesSPUnidades, 85)
        // chamarAPI("NCCMP", GraficoNNCAvesSPProblemas, "GraficoNNCAvesSPProblemas", [ ' WHERE 1=1 '], setGraficoNNCAvesSPProblemas, setresponseGraficoNNCAvesSPProblemas, 86)

        // chamarAPI("NCCMP", GraficoNNCAvesPR, "GraficoNNCAvesPR", [ ' WHERE 1=1 '], setGraficoNNCAvesPR, setresponseGraficoNNCAvesPR, 87)
        // chamarAPI("NCCMP", GraficoNNCAvesPRUnidades, "GraficoNNCAvesPRUnidades", [ ' WHERE 1=1 '], setGraficoNNCAvesPRUnidades, setresponseGraficoNNCAvesPRUnidades, 88)
        // chamarAPI("NCCMP", GraficoNNCAvesPRProblemas, "GraficoNNCAvesPRProblemas", [ ' WHERE 1=1 '], setGraficoNNCAvesPRProblemas, setresponseGraficoNNCAvesPRProblemas, 89)

        // chamarAPI("NCCMP", GraficoNNCAvesLeves, "GraficoNNCAvesLeves", [ ' WHERE 1=1 '], setGraficoNNCAvesLeves, setresponseGraficoNNCAvesLeves, 90)
        // chamarAPI("NCCMP", GraficoNNCAvesLevesUnidades, "GraficoNNCAvesLevesUnidades", [ ' WHERE 1=1 '], setGraficoNNCAvesLevesUnidades, setresponseGraficoNNCAvesLevesUnidades, 91)
        // chamarAPI("NCCMP", GraficoNNCAvesLevesProblemas, "GraficoNNCAvesLevesProblemas", [ ' WHERE 1=1 '], setGraficoNNCAvesLevesProblemas, setresponseGraficoNNCAvesLevesProblemas, 92)

        // chamarAPI("NCCMP", GraficoNNCSuinos, "GraficoNNCSuinos", [ ' WHERE 1=1 '], setGraficoNNCSuinos, setresponseGraficoNNCSuinos, 93)
        // chamarAPI("NCCMP", GraficoNNCSuinosUnidades, "GraficoNNCSuinosUnidades", [ ' WHERE 1=1 '], setGraficoNNCSuinosUnidades, setresponseGraficoNNCSuinosUnidades, 94)
        // chamarAPI("NCCMP", GraficoNNCSuinosProblemas, "GraficoNNCSuinosProblemas", [ ' WHERE 1=1 '], setGraficoNNCSuinosProblemas, setresponseGraficoNNCSuinosProblemas, 95)

        // chamarAPI("NCCMP", GraficoNNCPreparados, "GraficoNNCPreparados", [ ' WHERE 99=99 '], setGraficoNNCPreparados, setresponseGraficoNNCPreparados, 96)
        // chamarAPI("NCCMP", GraficoNNCPreparadosUnidades, "GraficoNNCPreparadosUnidades", [ ' WHERE 99=99 '], setGraficoNNCPreparadosUnidades, setresponseGraficoNNCPreparadosUnidades, 97)
        // chamarAPI("NCCMP", GraficoNNCPreparadosProblemas, "GraficoNNCPreparadosProblemas", [ ' WHERE 99=99 '], setGraficoNNCPreparadosProblemas, setresponseGraficoNNCPreparadosProblemas, 98)
        
        // chamarAPI("NCCMP", GraficoNNCCETotal, "GraficoNNCCETotal", [ ' WHERE 99=99 '], setGraficoNNCCETotal, setresponseGraficoNNCCETotal, 99)
        // chamarAPI("NCCMP", GraficoNNCCEInerente, "GraficoNNCCEInerente", [ ' WHERE 99=99 '], setGraficoNNCCEInerente, setresponseGraficoNNCCEInerente, 100)
        // chamarAPI("NCCMP", GraficoNNCCENaoInerente, "GraficoNNCCENaoInerente", [ ' WHERE 99=99 '], setGraficoNNCCENaoInerente, setresponseGraficoNNCCENaoInerente, 101)
        // chamarAPI("NCCMP", GraficoNNCCEOssos, "GraficoNNCCEOssos", [ ' WHERE 99=99 '], setGraficoNNCCEOssos, setresponseGraficoNNCCEOssos, 102)
        // chamarAPI("NCCMP", GraficoNNCCEPlastico, "GraficoNNCCEPlastico", [ ' WHERE 99=99 '], setGraficoNNCCEPlastico, setresponseGraficoNNCCEPlastico, 103)
        // chamarAPI("NCCMP", GraficoNNCCEMetal, "GraficoNNCCEMetal", [ ' WHERE 99=99 '], setGraficoNNCCEMetal, setresponseGraficoNNCCEMetal, 104)
        
            
        /////////////////////

        buscarDadosTable([" and 1=1 "])

        const bar_ctx = canvasRef.current.getContext('2d');

        const background = bar_ctx.createLinearGradient(0, 0, 0, 300);
        const backgroundCinza = bar_ctx.createLinearGradient(0, 0, 0, 300);

        background.addColorStop(0, "#f59c00");
        background.addColorStop(1, "#cc0000");

        backgroundCinza.addColorStop(0, "#f2f2f2");
        backgroundCinza.addColorStop(1, "#bfbfbf");

        SetBackgroundGradient(background);
        SetBackgroundGradientCinza(backgroundCinza);

        

    }, []);

    function callbackChamarAPI (apiNome) {
        console.log(`Rodou ${apiNome}, ${percorreNumeroChamados()}`)
        if (percorreNumeroChamados()) {
            document.getElementById("btnAplicar").click()
            setIsUpdatingData(false);
        }
    }

    

    const chamarAPI = (apiNome, objeto, numGrafico, parametros, funcao, funcaoRetorno, numeroChamado) => {

        switch (apiNome) {
            case 'CETotal':

                api.getSearaBaseCE(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    // setoptionRelativaresponseGraficoCETotal = f_optionRelativa (2000, 500);
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
                    callbackChamarAPI(apiNome)
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
                    callbackChamarAPI(apiNome)
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
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break
           
            case 'RACIndicadores':

                api.getSearaBaseRacIndicadores(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break

            case 'RACIndicadoresSemFiltro':

                api.getSearaBaseRacIndicadores_(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break
                
            case 'NCCMP':

                api.getSearaBaseNCCMP(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break

            case 'NCCLOG':

                api.getSearaBaseNCCLOG(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break
            case 'RACUnicoUnidade':

                api.getSearaBaseRACUnicoUnidade(parametros).then((response) => {

                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break

            case 'RACUnicoProblema':

                api.getSearaBaseRACUnicoProblema(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break

            default:
                break

        }

        return
    }

    const aplicar = () => {
        if (estaRodandoAplicar == false) {
            console.log("aplicar")
            setEstaRodandoAplicar(true);
            
            GerarGraficoHistorico(GraficoCETotal, setresponseGraficoCETotal, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCE, setresponseGraficoRACTotalCE, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRAC, setresponseGraficoRAC, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMP, setresponseGraficoNCCMP, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalAvesPesadasSP, setresponseGraficoCETotalAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEAvesPesadasSP, setresponseGraficoNNCMPTotalCEAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEAvesPesadasSP, setresponseGraficoRACTotalCEAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasSP, setresponseGraficoRACAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPAvesPesadasSP, setresponseGraficoNCCMPAvesPesadasSP, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalAvesPesadasRS, setresponseGraficoCETotalAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEAvesPesadasRS, setresponseGraficoNNCMPTotalCEAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEAvesPesadasRS, setresponseGraficoRACTotalCEAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasRS, setresponseGraficoRACAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPAvesPesadasRS, setresponseGraficoNCCMPAvesPesadasRS, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesLeves, setresponseGraficoRACAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalSuinos, setresponseGraficoCETotalSuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACSuinos, setresponseGraficoRACSuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistorico(GraficoCETotalPreparados, setresponseGraficoCETotalPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACPreparados, setresponseGraficoRACPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados, backgroundGradient, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesAvesPesadas, setresponseGraficoRACUnidadesAvesPesadas, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesPesadas, setresponseGraficoRACProblemasAvesPesadas, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesAvesPesadasPR, setresponseGraficoRACUnidadesAvesPesadasPR, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesPesadasPR, setresponseGraficoRACProblemasAvesPesadasPR, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesAvesPesadasSP, setresponseGraficoRACUnidadesAvesPesadasSP, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesPesadasSP, setresponseGraficoRACProblemasAvesPesadasSP, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesAvesPesadasRS, setresponseGraficoRACUnidadesAvesPesadasRS, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesPesadasRS, setresponseGraficoRACProblemasAvesPesadasRS, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados, backgroundGradientCinza)

            GerarGraficoHistoricoSemMeta(GraficoRACMI, setresponseGraficoRACMI, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACME, setresponseGraficoRACME, backgroundGradient, backgroundGradientCinza)

            //FFO
            GerarGraficoHistorico(GraficoRACDetalhesFFO, setresponseGraficoRACDetalhesFFO, backgroundGradient, backgroundGradientCinza)
            
            //ATENDIMENTO COMERCIAL
            GerarGraficoHistorico(GraficoRACDetalhesAC, setresponseGraficoRACDetalhesAC, backgroundGradient, backgroundGradientCinza)

            //Logística Exportação
            GerarGraficoHistorico(GraficoRACDetalhesLogME, setresponseGraficoRACDetalhesLogME, backgroundGradient, backgroundGradientCinza)
            
            //Logística Importação
            GerarGraficoHistorico(GraficoRACDetalhesLogMI, setresponseGraficoRACDetalhesLogMI, backgroundGradient, backgroundGradientCinza)

            //Documentação
            GerarGraficoHistorico(GraficoRACDetalhesDoc, setresponseGraficoRACDetalhesDoc, backgroundGradient, backgroundGradientCinza)

            //Transporte Terrestre
            GerarGraficoHistorico(GraficoRACDetalhesTT, setresponseGraficoRACDetalhesTT, backgroundGradient, backgroundGradientCinza)

            //Produção em Terceiro (ex. Massatake)
            GerarGraficoHistorico(GraficoRACDetalhesTerceiro, setresponseGraficoRACDetalhesTerceiro, backgroundGradient, backgroundGradientCinza)

            //Massatake
            GerarGraficoHistorico(GraficoRACDetalhesMassatake, setresponseGraficoRACDetalhesMassatake, backgroundGradient, backgroundGradientCinza)
            
            //PDV
            GerarGraficoHistorico(GraficoRACDetalhesPDV, setresponseGraficoRACDetalhesPDV, backgroundGradient, backgroundGradientCinza)
            //Abertura PDV
            GerarGraficoHistorico(GraficoRACDetalhesAberturaPDV, setresponseGraficoRACDetalhesAberturaPDV, backgroundGradient, backgroundGradientCinza)
 
            //RAC Crítica
            GerarGraficoHistorico(GraficoRACDetalhesCritica, setresponseGraficoRACDetalhesCritica, backgroundGradient, backgroundGradientCinza)

            //RAC Linhas Especiais (Seara Nature, Gourmet, Incrível)
            GerarGraficoHistorico(GraficoRACDetalhesEspeciais, setresponseGraficoRACDetalhesEspeciais, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Totais]
            GerarGraficoHistorico(GraficoRACDetalhesCE, setresponseGraficoRACDetalhesCE, backgroundGradient, backgroundGradientCinza)
            
            //RAC Corpo Estanho - [Inerente]
            GerarGraficoHistorico(GraficoRACDetalhesCEInerente, setresponseGraficoRACDetalhesCEInerente, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Não Inerente]
            GerarGraficoHistorico(GraficoRACDetalhesCENaoInerente, setresponseGraficoRACDetalhesCENaoInerente, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Plástico]
            GerarGraficoHistorico(GraficoRACDetalhesCEPlastico, setresponseGraficoRACDetalhesCEPlastico, backgroundGradient, backgroundGradientCinza)

            //RAC Inseto
            GerarGraficoHistorico(GraficoRACDetalhesInseto, setresponseGraficoRACDetalhesInseto, backgroundGradient, backgroundGradientCinza)

            //RAC Cabelo
            GerarGraficoHistorico(GraficoRACDetalhesCabelo, setresponseGraficoRACDetalhesCabelo, backgroundGradient, backgroundGradientCinza)

            //RAC Plastico
            GerarGraficoHistorico(GraficoRACDetalhesPlastico, setresponseGraficoRACDetalhesPlastico, backgroundGradient, backgroundGradientCinza)

            //RAC Metal
            GerarGraficoHistorico(GraficoRACDetalhesMetal, setresponseGraficoRACDetalhesMetal, backgroundGradient, backgroundGradientCinza)
            
            //RAC Intoxicação
            GerarGraficoHistorico(GraficoRACDetalhesIntoxicacao, setresponseGraficoRACDetalhesIntoxicacao, backgroundGradient, backgroundGradientCinza)

            //RAC Larva
            GerarGraficoHistorico(GraficoRACDetalhesLarva, setresponseGraficoRACDetalhesLarva, backgroundGradient, backgroundGradientCinza)

            // //NNC Log
            // GerarGraficoHistorico(GraficoNNCLogDetalhesTotal, setresponseGraficoNNCLogDetalhesTotal, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCLogDetalhesAves, setresponseGraficoNNCLogDetalhesAves, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCLogDetalhesPreparados, setresponseGraficoNNCLogDetalhesPreparados, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCLogDetalhesSuinos, setresponseGraficoNNCLogDetalhesSuinos, backgroundGradient, backgroundGradientCinza)

            // //NNC
            // GerarGraficoHistorico(GraficoNNCAvesPesadas, setresponseGraficoNNCAvesPesadas, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesPesadasUnidades, setresponseGraficoNNCAvesPesadasUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesPesadasProblemas, setresponseGraficoNNCAvesPesadasProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCAvesRS, setresponseGraficoNNCAvesRS, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesRSUnidades, setresponseGraficoNNCAvesRSUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesRSProblemas, setresponseGraficoNNCAvesRSProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCAvesSP, setresponseGraficoNNCAvesSP, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesSPUnidades, setresponseGraficoNNCAvesSPUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesSPProblemas, setresponseGraficoNNCAvesSPProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCAvesPR, setresponseGraficoNNCAvesPR, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesPRUnidades, setresponseGraficoNNCAvesPRUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesPRProblemas, setresponseGraficoNNCAvesPRProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCAvesLeves, setresponseGraficoNNCAvesLeves, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesLevesUnidades, setresponseGraficoNNCAvesLevesUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCAvesLevesProblemas, setresponseGraficoNNCAvesLevesProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCSuinos, setresponseGraficoNNCSuinos, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCSuinosUnidades, setresponseGraficoNNCSuinosUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCSuinosProblemas, setresponseGraficoNNCSuinosProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCPreparados, setresponseGraficoNNCPreparados, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCPreparadosUnidades, setresponseGraficoNNCPreparadosUnidades, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCPreparadosProblemas, setresponseGraficoNNCPreparadosProblemas, backgroundGradient, backgroundGradientCinza)

            // GerarGraficoHistorico(GraficoNNCCETotal, setresponseGraficoNNCCETotal, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCCEInerente, setresponseGraficoNNCCEInerente, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCCENaoInerente, setresponseGraficoNNCCENaoInerente, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCCEOssos, setresponseGraficoNNCCEOssos, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCCEPlastico, setresponseGraficoNNCCEPlastico, backgroundGradient, backgroundGradientCinza)
            // GerarGraficoHistorico(GraficoNNCCEMetal, setresponseGraficoNNCCEMetal, backgroundGradient, backgroundGradientCinza)


            


            setEstaRodandoAplicar(false);
        }
    }

    const GerarGraficoHistorico = (objeto, funcao, gradient, gradient2) => {

        if (!objeto) return

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
        let yaxis = [{ name: 'Evolutivo 2020' }, { name: 'Evolutivo 2021' }, { name: 'Evolutivo Meta' }, { name: 'Meta' }, { name: '2019' }, { name: '2020' }, { name: '2021' }, { name: 'forcast' }, { name: 'Média Diária' }];

        xaxis.forEach(x => {
            if (x.name == "2019") {
                x['yaxis'] = [{ name: "2019", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "2020") {
                x['yaxis'] = [{ name: "2020", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "Meta") {
                x['yaxis'] = [{ name: "Meta", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "2021") {
                x['yaxis'] = [{ name: "2021", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else {
                x['yaxis'] = [
                    { name: "Evolutivo 2020", value: x.value[0].a2020 },
                    { name: "Evolutivo Meta", value: x.value[0].aMeta },
                    { name: "Evolutivo 2021", value: x.value[0].a2021 },
                    { name: "forcast", value: x.value[0].forcast.replace(",", ".") },
                    { name: "Média Diária", value: x.value[0].mediaDiaria.replace(",", ".") },
                ]
            }
        })

        let series = []
        let maiorValorSerie = 0
        let menorValorSerie = 100000

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
            let varborderDash = [0, 0]
            let fontWeight = 'bold'
            let lineSize = 2
            let fontSize = "12"

            switch (y.name) {

                case "2019":
                    tipo = "bar"
                    cor = gradient2 ?? "#bfbfbf"
                    corLabel = "#bfbfbf"
                    yAx = "A"
                    break
                case "2020":
                    tipo = "bar"
                    cor = gradient2 ?? "#bfbfbf"
                    corLabel = "#bfbfbf"
                    yAx = "A"
                    break
                case "Meta":
                    tipo = "bar"
                    cor = gradient ?? "rgb(204,0,0)" //"rgb(245,156,0)"
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
                    varborderDash = [10, 5]
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
                case "forcast":
                    tipo = "line"
                    cor = "#000000" //"rgb(245,156,0)"
                    corLabel = "#000000"
                    yAx = "B"

                    break
                case "Média Diária":
                    tipo = "bar"
                    cor = "#000000" //"rgb(204,0,0)"
                    corLabel = "#000000"
                    yAx = "B"
                    fontSize = "14"

                    break

                default:
                    break


            }

            for (var i = 0; i < dataset.length; i++) {
                if (dataset[i] == "") dataset[i] = null
                if (parseFloat(dataset[i]) > maiorValorSerie && yAx == "B") maiorValorSerie = parseFloat(dataset[i])
                if (parseFloat(dataset[i]) < menorValorSerie && yAx == "B") menorValorSerie = parseFloat(dataset[i])
            }


            let serie = {
                type: tipo,
                yAxisID: yAx,
                label: y.name,
                backgroundColor: cor,
                fill: false,
                borderColor: cor,
                borderWidth: lineSize,
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
                        size: fontSize,
                        weight: fontWeight
                    },

                }

            }
            series.push(serie)
        })

        //debugger
        maiorValorSerie = parseFloat(maiorValorSerie)
        menorValorSerie = parseFloat(menorValorSerie)
        let maxYB = maiorValorSerie * (menorValorSerie / maiorValorSerie + 1.2)

        let tipo = 'line'
        let cor = 'transparent'
        let corLabel = 'transparent'
        let yAx = "B"
        let varborderDash = [0, 0]

        let serieEixo = {
            type: tipo,
            yAxisID: yAx,
            label: '',
            backgroundColor: cor,
            fill: false,
            borderColor: cor,
            borderWidth: 1,
            pointRadius: 5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
            borderDash: varborderDash,
            data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, maxYB],
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

        series.push(serieEixo)

        let seriesAdd = []

        series.filter(s => s.label != null).forEach(element => {
            seriesAdd.push(element)
        });


        //setoptionRelativaresponseGraficoCETotal = f_optionRelativa (2000, 500);

        const dashboardData = {
            labels: xaxis.map(r => r.name),
            datasets: seriesAdd,
            indicators

        };




        if (typeof (funcao) == "function") {
            funcao(dashboardData);
        }

        setIsUpdatingData(false)
    }

    const GerarGraficoHistoricoSemMeta = (objeto, funcao, gradient, gradient2) => {

        if (!objeto) return

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
        xaxis.splice(2, 1) //tira a meta
        let yaxis = [{ name: 'Evolutivo 2020' }, { name: 'Evolutivo 2021' }, { name: 'Evolutivo Meta' }, { name: '2019' }, { name: '2020' }, { name: '2021' }, { name: 'forcast' }, { name: 'Média Diária' }];

        xaxis.forEach(x => {
            if (x.name == "2019") {
                x['yaxis'] = [{ name: "2019", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "2020") {
                x['yaxis'] = [{ name: "2020", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "Meta") {
                x['yaxis'] = [{ name: "Meta", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else if (x.name == "2021") {
                x['yaxis'] = [{ name: "2021", value: x.value[0].Valor == "" ? null : x.value[0].Valor }]
            } else {
                x['yaxis'] = [
                    { name: "Evolutivo 2020", value: x.value[0].a2020 },
                    { name: "Evolutivo Meta", value: x.value[0].aMeta },
                    { name: "Evolutivo 2021", value: x.value[0].a2021 },
                    { name: "forcast", value: x.value[0].forcast.replace(",", ".") },
                    { name: "Média Diária", value: x.value[0].mediaDiaria.replace(",", ".") },
                ]
            }
        })

        let series = []
        let maiorValorSerie = 0
        let menorValorSerie = 100000

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
            let varborderDash = [0, 0]

            switch (y.name) {

                case "2019":
                    tipo = "bar"
                    cor = gradient2 ?? "#bfbfbf"
                    corLabel = "#bfbfbf"
                    yAx = "A"
                    break
                case "2020":
                    tipo = "bar"
                    cor = gradient2 ?? "#bfbfbf"
                    corLabel = "#bfbfbf"
                    yAx = "A"
                    break
                case "Meta":
                    tipo = "bar"
                    cor = gradient ?? "rgb(204,0,0)" //"rgb(245,156,0)"
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
                    varborderDash = [10, 5]
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
                case "forcast":
                    tipo = "line"
                    cor = "#000000" //"rgb(245,156,0)"
                    corLabel = "#000000"
                    yAx = "B"

                    break
                case "Média Diária":
                    tipo = "bar"
                    cor = "#000000" //"rgb(204,0,0)"
                    corLabel = "#000000"
                    yAx = "B"

                    break

                default:
                    break


            }

            for (var i = 0; i < dataset.length; i++) {
                if (dataset[i] == "") dataset[i] = null
                if (parseFloat(dataset[i]) > maiorValorSerie && yAx == "B") maiorValorSerie = parseFloat(dataset[i])
                if (parseFloat(dataset[i]) < menorValorSerie && yAx == "B") menorValorSerie = parseFloat(dataset[i])
            }


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
                        size: "12",
                    },

                }

            }

            if (y.name == "Meta" || y.name == "Evolutivo Meta") {
                console.log("Não entra neste relatório por ser meta")
            } else {
                series.push(serie)
            }
        })

        //debugger
        maiorValorSerie = parseFloat(maiorValorSerie)
        menorValorSerie = parseFloat(menorValorSerie)
        let maxYB = maiorValorSerie * (menorValorSerie / maiorValorSerie + 1.2)

        let tipo = 'line'
        let cor = 'transparent'
        let corLabel = 'transparent'
        let yAx = "B"
        let varborderDash = [0, 0]

        let serieEixo = {
            type: tipo,
            yAxisID: yAx,
            label: '',
            backgroundColor: cor,
            fill: false,
            borderColor: cor,
            borderWidth: 1,
            pointRadius: 5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
            borderDash: varborderDash,
            data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, maxYB],
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

        series.push(serieEixo)

        let seriesAdd = []

        series.filter(s => s.label != null).forEach(element => {
            seriesAdd.push(element)
        });


        //setoptionRelativaresponseGraficoCETotal = f_optionRelativa (2000, 500);

        const dashboardData = {
            labels: xaxis.map(r => r.name),
            datasets: seriesAdd,
            indicators

        };




        if (typeof (funcao) == "function") {
            funcao(dashboardData);
        }

        setIsUpdatingData(false)
    }

    const GerarGraficoBarras = (objeto, funcao, gradient) => {

        if (!objeto) return
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
        let yaxis = [{ name: 'Valor' }];

        xaxis.forEach(x => {
            x['yaxis'] = [{ name: "Valor", value: x.value }]
        })

        let series = []
        yaxis.forEach((y, index) => {
            let dataset = xaxis.map(xx => {
                let yaxysvalue = xx.yaxis.filter(r => 1 === 1);
                if (yaxysvalue.length)
                    return yaxysvalue[0].value

                return null
            })

            let tipo = 'bar'
            let cor = gradient ?? '#bfbfbf'
            let corLabel = '#000000'
            let yAx = "B"
            let varborderDash = [0, 0]

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

        if (typeof (funcao) == "function") {
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab1">
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

    const DataTableRACFinalME = () => {

        if (!TableRacFinalME) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacFinalME.length; i++) {
            json.push(TableRacFinalME[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab2">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACFinalMI = () => {

        if (!TableRacFinalMI) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacFinalMI.length; i++) {
            json.push(TableRacFinalMI[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab3">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACFinalRECL = () => {

        if (!TableRacFinalRECL) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacFinalRECL.length; i++) {
            json.push(TableRacFinalRECL[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACFinalPDV = () => {

        if (!TableRacFinalPDV) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacFinalPDV.length; i++) {
            json.push(TableRacFinalPDV[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACFinalTE = () => {

        if (!TableRacFinalTE) return;

        //debugger

        let json = []

        for (let i = 0; i < TableRacFinalTE.length; i++) {
            json.push(TableRacFinalTE[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACFinalCRIT = () => {

        if (!TableRacFinalCRIT) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacFinalCRIT.length; i++) {
            json.push(TableRacFinalCRIT[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        <Column field="Unidade" header="Unidade" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Mercado" header="Mercado" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Rac" header="Rac" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Cd Item" header="Cd Item" headerStyle={{ width: '100px' }}></Column>
                        <Column field="Item" header="Item" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Marca" header="Marca" headerStyle={{ width: '200px' }}></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação" headerStyle={{ width: '150px' }}></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema" headerStyle={{ width: '300px' }}></Column>
                        <Column field="Manifestação" header="Manifestação" ></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACAberturaME = () => {

        if (!TableRACAberturaME) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRACAberturaME.length; i++) {
            json.push(TableRACAberturaME[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped clAberturaME">
                        <Column field="Mercado" header="Mercado Externo" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaMEOrienteMedio = () => {

        if (!TableRacAberturaMEOrienteMedio) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEOrienteMedio.length; i++) {
            json.push(TableRacAberturaMEOrienteMedio[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clOrienteMedio">
                        <Column field="Mercado" header="Oriente Médio" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaMEEuropa = () => {

        if (!TableRacAberturaMEEuropa) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEEuropa.length; i++) {
            json.push(TableRacAberturaMEEuropa[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clEuropa">
                        <Column field="Mercado" header="Europa" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }
    
    const DataTableRACAberturaMEJapao = () => {

        if (!TableRacAberturaMEJapao) return;

        let json = []

        for (let i = 0; i < TableRacAberturaMEJapao.length; i++) {
            json.push(TableRacAberturaMEJapao[i])
        }

        let retorno = (
            <div>
               
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clJapao">
                        <Column field="Mercado" header="Japão" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            
        );

        return retorno;


    }

    const DataTableRACAberturaMEAsia = () => {

        if (!TableRacAberturaMEAsia) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEAsia.length; i++) {
            json.push(TableRacAberturaMEAsia[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clAsia">
                        <Column field="Mercado" header="Ásia" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaMEAmericasAfrica = () => {

        if (!TableRacAberturaMEAmericasAfrica) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEAmericasAfrica.length; i++) {
            json.push(TableRacAberturaMEAmericasAfrica[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clAmericasAfrica">
                        <Column field="Mercado" header="Américas / África" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaMEContasGlobais = () => {

        if (!TableRacAberturaMEContasGlobais) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEContasGlobais.length; i++) {
            json.push(TableRacAberturaMEContasGlobais[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clContasGlobais">
                        <Column field="Mercado" header="Contas globais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    function percorrerJson(obj){    
        
        var rows = [];
        var j = 0;
        for (var key in obj) { // obtém as chaves do objeto
            // se o valor for diferente de objeto (caso events)
            if (typeof obj[key] !== 'object') {
                if (j == 0){
                    rows.push(<Column field={key} header={key} headerStyle={{ width: '20%' }}></Column>);
                }else{
                    rows.push(<Column field={key} header={key}></Column>);
                }
                j++
            }
            else
            // se o valor for um array de objetos, é iterado o array
            // e as chaves de cada objeto
            
            obj[key].forEach(function(item) {
                var i = 0;
                for (var key2 in item) {
                    if (i == 0){
                        rows.push(<Column field={key2} header={key2} name='linha' headerStyle={{ width: '70%' }}></Column>);
                    }else{
                        rows.push(<Column field={key2} header={key2} name='linha'></Column>);
                    }
                    i++
                }
            });
        }

        return rows;
        
    }

    const DataTableRacRACDetalhesTerceiro = () => {

        if (!TableRacRACDetalhesTerceiro) return;

        //debugger

        let json = []

        for (let i = 0; i < TableRacRACDetalhesTerceiro.length; i++) {
            json.push(TableRacRACDetalhesTerceiro[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesTerceiro[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped clAberturaTerceiro">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesPDV = () => {

        if (!TableRacRACDetalhesPDV) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesPDV.length; i++) {
            json.push(TableRacRACDetalhesPDV[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesPDV[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesCritica = () => {

        if (!TableRacRACDetalhesCritica) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesCritica.length; i++) {
            json.push(TableRacRACDetalhesCritica[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesCritica[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoTotal = () => {

        if (!TableRacRACDetalhesEvolucaoTotal) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoTotal.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoTotal[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoTotal[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoAves = () => {

        if (!TableRacRACDetalhesEvolucaoAves) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoAves.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoAves[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoAves[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoPreparados = () => {

        if (!TableRacRACDetalhesEvolucaoPreparados) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoPreparados.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoPreparados[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoPreparados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoFatiados = () => {

        if (!TableRacRACDetalhesEvolucaoFatiados) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoFatiados.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoFatiados[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoFatiados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoPescados = () => {

        if (!TableRacRACDetalhesEvolucaoPescados) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoPescados.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoPescados[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoPescados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesEvolucaoSuinos = () => {

        if (!TableRacRACDetalhesEvolucaoSuinos) return;


        let json = []

        for (let i = 0; i < TableRacRACDetalhesEvolucaoSuinos.length; i++) {
            json.push(TableRacRACDetalhesEvolucaoSuinos[i])
        }

        var retorno = percorrerJson(TableRacRACDetalhesEvolucaoSuinos[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    

    

    const buscarTabelaRACUnicoProblema = () => {
        let parm = " ";

        api.getSearaBaseRacME(parm).then((response) => {
            let json = JSON.parse(response.data)

            return (
                <div>
                    <div className="card">
                        <DataTable value={json} sortMode="multiple" className="p-datatable-striped">
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

    var flagTable = false;

    const buscarDadosTable = (parm) => {

        if (!flagTable) {
            api.getSearaBaseRacME(parm).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacME(json)
            })

            var whereFinalME = " AND Mercado_rac = 'ME' " +
                " AND [Origem] IN (  " +
                "     'Documentação Unidade',   " +
                "     'EXPEDIÇÃO FÁBRICA',  " +
                "     'EXPEDIÇÃO FÁBRICA FFO', " +
                "     'FÁBRICA PRODUÇÃO FFO', " +
                "    'FABRICAÇÃO')  " +
                " AND  [Tipo_Atendimento_rac] IN (  " +
                "     'CONTATO EXCELSIOR_RAC',   " +
                "     'CONTATO JBS CARNES',   " +
                "     'CONTATO MERCADO DA CARNE',  " +
                "     'NOTIFICAÇÃO',   " +
                "    'RECLAMAÇÃO',   " +
                "    'RECLAMAÇÃO ABUSO DE PRODUTO',  " +
                "    'RECLAMAÇÃO ABUSO PROD.',   " +
                "     'Reclamação Contas Globais',  " +
                "    'RECLAMAÇÃO FAB. NÃO IDENTIF.',  " +
                "   'RECLAMAÇÃO HANS',   " +
                "    'RECLAMAÇÃO VOSSKO', " +
                "   'RECLAMAÇÃO FFO', " +
                "    'REINCIDÊNCIA') "

            api.getSearaBaseRacFinal([whereFinalME]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalME(json)
            })

            var whereFinalMI = " AND Mercado_rac IN ('MI','INTERNO') " +
                " AND [Origem] IN (  " +
                "     'Documentação Unidade',   " +
                "     'EXPEDIÇÃO FÁBRICA',  " +
                "     'EXPEDIÇÃO FÁBRICA FFO', " +
                "     'FÁBRICA PRODUÇÃO FFO', " +
                "    'FABRICAÇÃO')  " +
                " AND  [Tipo_Atendimento_rac] IN (  " +
                "     'CONTATO EXCELSIOR_RAC',   " +
                "     'CONTATO JBS CARNES',   " +
                "     'CONTATO MERCADO DA CARNE',  " +
                "     'NOTIFICAÇÃO',   " +
                "    'RECLAMAÇÃO',   " +
                "    'RECLAMAÇÃO ABUSO DE PRODUTO',  " +
                "    'RECLAMAÇÃO ABUSO PROD.',   " +
                "     'Reclamação Contas Globais',  " +
                "    'RECLAMAÇÃO FAB. NÃO IDENTIF.',  " +
                "   'RECLAMAÇÃO HANS',   " +
                "    'RECLAMAÇÃO VOSSKO', " +
                "   'RECLAMAÇÃO FFO', " +
                "    'REINCIDÊNCIA') "

            api.getSearaBaseRacFinal([whereFinalMI]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalMI(json)
            })

            var whereFinalRECL = " AND Mercado_rac IN ('MI', 'INTERNO') 																				" +
                " AND [Origem] IN ( 																			" +
                "     'Documentação Unidade',  																		" +
                "     'EXPEDIÇÃO FÁBRICA', 																			" +
                " 	'EXPEDIÇÃO FÁBRICA FFO',																		" +
                " 	'FÁBRICA PRODUÇÃO FFO',																			" +
                "     'FABRICAÇÃO') 																					" +
                " AND  [Tipo_Atendimento_rac] IN ( 																	" +
                "     'CONTATO EXCELSIOR_RAC',  																		" +
                "     'CONTATO JBS CARNES',  																			" +
                "     'CONTATO MERCADO DA CARNE',  																	" +
                "     'NOTIFICAÇÃO',  																				" +
                "     'RECLAMAÇÃO',  																					" +
                "     'RECLAMAÇÃO ABUSO DE PRODUTO',  																" +
                "     'RECLAMAÇÃO ABUSO PROD.',  																		" +
                "     'Reclamação Contas Globais',  																	" +
                "     'RECLAMAÇÃO FAB. NÃO IDENTIF.',  																" +
                "     'RECLAMAÇÃO HANS',  																			" +
                "     'RECLAMAÇÃO VOSSKO',																			" +
                " 	'RECLAMAÇÃO FFO',																				" +
                " 	'REINCIDÊNCIA') 																				" +
                " and [Nm_Marca_rac] IN ('SEARA GOURMET', 'SEARA NATURE', 'SEARA INCRIVEL', 'SEARA ROTISSERIE') 		"


            api.getSearaBaseRacFinal([whereFinalRECL]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalRECL(json)
            })

            var whereFinalPDV = " AND Mercado_rac IN ('MI', 'INTERNO') 			" +
                " AND [Origem] IN ( 		" +
                "     'ABUSO DE PRODUTO PDV') 	"


            api.getSearaBaseRacFinal([whereFinalPDV]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalPDV(json)
            })

            var whereFinalTE = " AND Mercado_rac IN ('MI', 'INTERNO') 		" +
                " AND [Origem] IN ( 	" +
                "     'PRODUÇÃO EM TERCEIRO') "


            api.getSearaBaseRacFinal([whereFinalTE]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalTE(json)
            })

            var whereFinalCRIT = " AND Mercado_rac IN ('MI', 'INTERNO') " +
                " AND  [Tipo_Atendimento_rac] IN ( 'CRÍTICA' ) "


            api.getSearaBaseRacFinal([whereFinalCRIT]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalCRIT(json)
            })

            var whereAberturaME = "  " +
                " AND [Tipo_Atendimento_rac] in ( " +
                " 'RECLAMAÇÃO', " +
                " 'RECLAMAÇÃO ABUSO PROD.', " +
                " 'RECLAMAÇÃO FAB. NÃO IDENTIF.', " +
                " 'RECLAMAÇÃO HANS', " +
                " 'CONTATO EXCELSIOR_RAC', " +
                " 'CONTATO MERCADO DA CARNE', " +
                " 'CONTATO JBS CARNES', " +
                " 'NOTIFICAÇÃO', " +
                " 'Reincidência', " +
                " 'RECLAMAÇÃO FFO', " +
                " 'RECLAMAÇÃO ABUSO DE PRODUTO', " +
                " 'RECLAMAÇÃO VOSSKO', " +
                " 'Reclamação Contas Globais' " +
                " ) "

            api.getSearaBaseRacAberturaME([whereAberturaME + " and data_rac = (select data from v_maiorData) "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaME(json)
            })




            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac = 'YARA' "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEOrienteMedio(json)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + "  AND Especialista_rac IN ('Igor', 'Rejane')   "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEEuropa(json)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Marcela')  "]).then((response) => {
                
                let json = JSON.parse(response.data)
                setTableRacAberturaMEJapao(json)
                          
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Amanda')  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAsia(json)
                setTimeout(arrumaTabela2('clJapao'), 3000)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Regina')  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAmericasAfrica(json)
            })

            
            var sqlTableRacRACDetalhesTerceiro = ""
            + " SELECT	"																																																	 
            + " *		"																																																	 
            + " INTO #RESULTADO "																																																 
            + " FROM [v_base_rac]	"																																														 
            + " WHERE 1=1		"																																																 
            + " AND month(Data_rac) = month((select * from v_maiorData))		"																																				 
            + " AND year(Data_rac) = year((select * from v_maiorData))		"																																					 
            + " AND [Origem_do_Problema_rac] IN ('Produção em Terceiro')	"																																					 
            + " AND  [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRÍTICA','REINCIDÊNCIA','NEGOCIAÇÃO COMERCIAL','RECOLHIMENTO','OBRIGAÇÃO','RECOLHIMENTO VOLUNTÁRIO','RAC COMPLEMENTAR','CONCESSÃO','RAC CAIXA','ELOGIO')	"		 
            + " AND Filial_rac NOT IN ('FORNECEDOR - IND COM MASSAS ALI MASSATAK TANAK LT EPP')		"																															 
            + " AND UNIDADE NOT IN ('VIGOR','DAN VIGOR')		"																																								 
            + " AND Tipo_rac = 'Real'		"																																													 																																																			 
            + " SELECT		"
            + " GROUPING(Unidade) grupo,	"
            + " isnull(Unidade, 'Total') as Unidade	"																																																	 
            + " , SUM(Quant_rac) RAC		"																																													 
            + " INTO #UNIDADE		"																																															 
            + " FROM #RESULTADO	"																																																 
            + " GROUP BY Unidade		"
            + " WITH ROLLUP	"
            + " SELECT * FROM #UNIDADE order by 1 asc, 3 desc			"																																								 																																																			 
            + " DROP TABLE #UNIDADE		"																																														 
            + " DROP TABLE #RESULTADO		"	

            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesTerceiro ]).then((response) => {
                //debugger
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['grupo'];
                }

                setTableRacRACDetalhesTerceiro(json)
            })

            var sqlTableRacRACDetalhesPDV = ""
            + " SELECT																																							"
            + " *																																								"
            + " INTO #RESULTADO																																					"
            + " FROM [v_base_rac]																																				"
            + " WHERE 1=1																																						"
            + " AND month(Data_rac) = month((select * from v_maiorData))																										"
            + " AND year(Data_rac) = year((select * from v_maiorData))																											"
            + " AND [Origem_do_Problema_rac] IN ('ABUSO DE PRODUTO PDV')																										"
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR')	"
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA')																											"
            + " AND Tipo_rac = 'Real'																																			"
            + " 																																								"
            + " SELECT																																							"
            + " Nm_Classe_rac																																					"
            + " , SUM(Quant_rac) RAC																																			"
            + " INTO #CLASSE																																					"
            + " FROM #RESULTADO																																					"
            + " GROUP BY Nm_Classe_rac																																			"
            + " 																																								"
            + " SELECT																																							"
            + " Nm_Classe_rac																																					"
            + " , Tipo_Problema_rac																																				"
            + " , SUM(Quant_rac) RAC																																			"
            + " INTO #TIPOPROBLEMA																																				"
            + " FROM #RESULTADO																																					"
            + " GROUP BY Nm_Classe_rac, Tipo_Problema_rac																														"
            + " 																																								"
            + " SELECT																																							"
            + " GROUPING(B.Nm_Classe_rac) U																																		"
            + " , GROUPING(B.Tipo_Problema_rac) T																																"
            + " , B.Nm_Classe_rac																																				"
            + " , B.Tipo_Problema_rac as [Tipo do Problema]																														"
            + " , SUM(Quant_rac) RAC																																			"
            + " INTO #BASE																																						"
            + " FROM #RESULTADO B																																				"
            + " GROUP BY B.Nm_Classe_rac, B.Tipo_Problema_rac	  																												"
            + " WITH ROLLUP													  																									"
            + " 																																								"
            + " SELECT DISTINCT B.*																																				"
            + " , U.RAC Nm_Classe_rac_																																			"
            + " , T.RAC TIPOPROBLEMA_																																			"
            + " FROM #BASE B																																					"
            + " LEFT JOIN #CLASSE U ON B.Nm_Classe_rac = U.Nm_Classe_rac																										"
            + " LEFT JOIN #TIPOPROBLEMA T ON B.[Tipo do Problema] = T.Tipo_Problema_rac AND B.Nm_Classe_rac = T.Nm_Classe_rac													"
            + " 																																								"
            + " ORDER BY 1, 6 DESC, 3, 2 DESC, 7 DESC, 4																														"
            + " 																																								"
            + " DROP TABLE #RESULTADO																																			"
            + " DROP TABLE #CLASSE																																				"
            + " DROP TABLE #TIPOPROBLEMA																																		"
            + " DROP TABLE #BASE																																				"
	

            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesPDV ]).then((response) => {
                //debugger
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['U'];
                    delete json[i]['T'];
                    delete json[i]['Nm_Classe_rac_'];
                    delete json[i]['TIPOPROBLEMA_'];

                }
                
                setTableRacRACDetalhesPDV(json)
            })


            
            
            var sqlTableRacRACDetalhesCritica = ""
            + " SELECT																																																			"
            + " [Unidade],																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') 																																						"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA')																																							"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY Unidade																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as [Unidade],																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') 																																						"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA')																																							"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY Unidade																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') 																																						"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA')																																						"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') 																																						"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA')																																						"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Unidade],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Unidade], [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND [Origem_do_Problema_rac] NOT IN (''ABUSO DE PRODUTO HOME'',''LOGÍSTICA MI'',''SERVICO'')																																' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND [TIPO_ATENDIMENTO_RAC] IN (''CRÍTICA'')																																' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Unidade], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.UNIDADE = PT.UNIDADE ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Unidade],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as [Unidade], [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND [Origem_do_Problema_rac] NOT IN (''ABUSO DE PRODUTO HOME'',''LOGÍSTICA MI'',''SERVICO'')																																' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND [TIPO_ATENDIMENTO_RAC] IN (''CRÍTICA'')																																	' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesCritica ]).then((response) => {
                //debugger
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesCritica(json)
            })

            var sqlTableRacRACDetalhesEvolucaoTotal = ""
            + " SELECT																																																			"
            + " [Origem_do_Problema_rac] Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Origem],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Origem_do_Problema_rac] Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Origem_do_Problema_rac], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.origem = PT.origem ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Origem],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoTotal ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoTotal(json)
            })

            var sqlTableRacRACDetalhesEvolucaoAves = ""
            + "SELECT																																																																																																																"
+ "[Regional Qual] as Coluna1																																																																																																											"
+ ", Unidade as Coluna2																																																																																																													"
+ ", null as Coluna3																																																																																																													"
+ ", count(Rac_rac) as [Nº RAC]																																																																																																											"
+ "INTO #RESULTADO 																																																																																																														"
+ "FROM [v_base_rac]																																																																																																													"
+ "WHERE 1=1																																																																																																											"
+ "and year(data_rac) = (select year(data) as data from v_maiorData)																																																																																																	"
+ "and month(data_rac) = (select month(data) as data from v_maiorData)																																																																																																	"
+ "AND Tipo_rac = 'Real'																																																																																																												"
+ " AND  [Regional Qual] LIKE '%AVES%'   															"
+ "GROUP BY [Regional Qual], Unidade																																																																																																									"
+ "																																																																																																																		"
+ "																																																																																																																		"
+ "SELECT																																																																																																																"
+ "Coluna1																																																																																																																"
+ ", SUM([Nº RAC]) [Nº RAC]																																																																																																												"
+ "INTO #TABELA1																																																																																																														"
+ "FROM #RESULTADO																																																																																																														"
+ "GROUP BY Coluna1																																																																																																														"
+ "																																																																																																																		"
+ "SELECT																																																																																																																"
+ "Coluna1																																																																																																																"
+ ", Coluna2																																																																																																															"
+ ", SUM([Nº RAC]) [Nº RAC]																																																																																																												"
+ "INTO #TABELA2																																																																																																														"
+ "FROM #RESULTADO																																																																																																														"
+ "GROUP BY Coluna1, Coluna2																																																																																																											"
+ "																																																																																																																		"
+ "SELECT																																																																																																																"
+ "Coluna1																																																																																																																"
+ ", Coluna2																																																																																																															"
+ ", Coluna3																																																																																																															"
+ ", SUM([Nº RAC]) [Nº RAC]																																																																																																												"
+ "INTO #TABELA3																																																																																																														"
+ "FROM #RESULTADO																																																																																																														"
+ "GROUP BY Coluna1, Coluna2, Coluna3																																																																																																									"
+ "																																																																																																																		"
+ "SELECT																																																																																																																"
+ "GROUPING(R.Coluna1) C1																																																																																																												"
+ ", GROUPING(R.Coluna2) C2																																																																																																												"
+ ", 0 C3																																																																																																																"
+ ", R.Coluna1 AS C1_																																																																																																													"
+ ", R.Coluna2 AS C2_ 																																																																																																													"
+ ", R.Coluna3 AS C3_																																																																																																													"
+ ", SUM([Nº RAC]) [Nº RAC]																																																																																																												"
+ "INTO #BASE																																																																																																															"
+ "FROM #RESULTADO R																																																																																																													"
+ "GROUP BY Coluna1, Coluna2, Coluna3																																																																																																									"
+ "WITH ROLLUP													  																																																																																																		"
+ "																																																																																																																		"
+ "																																																																																																																		"
+ "SELECT DISTINCT B.C1, B.C2, B.C3,  ISNULL(B.C1_,'Total') as Coluna1, ISNULL(B.C2_,'Total') as Coluna2, null as Coluna3																																																																																				"
+ ", B.[Nº RAC]																																																																																																															"
+ ", T1.[Nº RAC] C1__																																																																																																													"
+ ", T2.[Nº RAC] C2__																																																																																																													"
+ ", null C3__																																																																																																															"
+ ", CASE																																																																																																																"
+ "	WHEN B.C3_ IS NULL THEN																																																																																																												"
+ "		CASE																																																																																																															"
+ "			WHEN B.C2_ IS NULL THEN 																																																																																																									"
+ "                CASE 																																																																																																												"
+ "					WHEN B.C1_ IS NULL THEN																																																																																																								"
+ "					'<b>Total</b>'																																																																																																										"
+ "					ELSE '<b>'+cast(B.C1_ as varchar)+'</b>'																																																																																																			"
+ "				END																																																																																																														"
+ "			ELSE '@@.....'+cast(B.C2_ as varchar)																																																																																																						"
+ "		END																																																																																																																"
+ "	ELSE '..........'+cast(B.C3_ as varchar)																																																																																																							"
+ "    END Coluna																																																																																																														"
+ ", CASE																																																																																																																"
+ "	WHEN B.C3_ IS NULL THEN																																																																																																												"
+ "		CASE																																																																																																															"
+ "			WHEN B.C2_ IS NULL THEN 																																																																																																									"
+ "                CASE 																																																																																																												"
+ "					WHEN B.C1_ IS NULL THEN																																																																																																								"
+ "					'Total'																																																																																																												"
+ "					ELSE cast(B.C1_ as varchar)																																																																																																							"
+ "				END																																																																																																														"
+ "			ELSE cast(B.C2_ as varchar)																																																																																																									"
+ "		END																																																																																																																"
+ "	ELSE cast(B.C3_ as varchar)																																																																																																											"
+ "    END Coluna_																																																																																																														"
+ "	INTO #NIVEIS																																																																																																														"
+ "FROM #BASE B																																																																																																															"
+ "LEFT JOIN #TABELA1 T1 ON B.C1_ = T1.Coluna1																																																																																																							"
+ "LEFT JOIN #TABELA2 T2 ON B.C1_ = T2.Coluna1 AND B.C2_ = T2.Coluna2																																																																																																	"
+ "																																																																																																																		"
+ "ORDER BY 1, 8 DESC, 4, 2 DESC, 9 DESC, 5, 3 DESC, 10 DESC, 6																																																																																																			"
+ "																																																																																																																		"
+ "             SELECT																																																																																																													"
+ "             [Regional Qual] as Coluna1																																																																																																								"
+ "             , Unidade as Coluna2																																																																																																									"
+ "             , null as Coluna3																																																																																																										"
+ "             , sum(Quant_rac) Quant_rac																																																																																																								"
+ "             INTO #TOTAL																																																																																																												"
+ "             FROM [v_base_rac]																																																																																																										"
+ "             WHERE 1=1																																																																																																								"
+ "            and year(data_rac) = (select year(data) as data from v_maiorData)																																																																																														"
+ "            and month(data_rac) = (select month(data) as data from v_maiorData)																																																																																														"
+ "            AND Tipo_rac = 'Real'																																																																																																									"
+ "            AND  [Regional Qual] LIKE '%AVES%'    													"
+ "            GROUP BY [Regional Qual], Unidade																																																																																																						"
+ "																																																																																																																		"
+ "             																																																																																																														"
+ "             SELECT																																																																																																													"
+ "             'Total' as Coluna1,																																																																																																										"
+ "             sum(Quant_rac) Quant_rac																																																																																																								"
+ "             INTO #TOTALFINAL																																																																																																										"
+ "             FROM [v_base_rac]																																																																																																										"
+ "             WHERE 1=1																																																																																																								"
+ "            and year(data_rac) = (select year(data) as data from v_maiorData)																																																																																														"
+ "            and month(data_rac) = (select month(data) as data from v_maiorData)																																																																																														"
+ "            AND Tipo_rac = 'Real'																																																																																																									"
+ "             AND  [Regional Qual] LIKE '%AVES%'  													"
+ "            GROUP BY [Regional Qual], Unidade																																																																																																						"
+ "             																																																																																																														"
+ "             SELECT																																																																																																													"
+ "             sum(Quant_rac) Quant_rac																																																																																																								"
+ "             INTO #TOTALF																																																																																																											"
+ "             FROM [v_base_rac]																																																																																																										"
+ "             WHERE 1=1																																																																																																								"
+ "            and year(data_rac) = (select year(data) as data from v_maiorData)																																																																																														"
+ "            and month(data_rac) = (select month(data) as data from v_maiorData)																																																																																														"
+ "            AND Tipo_rac = 'Real'																																																																																																									"
+ "             AND  [Regional Qual] LIKE '%AVES%'  													"
+ "      																																																																																																																"
+ "             																																																																																																														"
+ "             																																																																																																														"
+ "             DECLARE @SQLStr VARCHAR(max)																																																																																																							"
+ "             SET @SQLStr=''																																																																																																											"
+ "             																																																																																																														"
+ "             SELECT																																																																																																													"
+ "             [MES-DIA] Descricao																																																																																																										"
+ "             INTO #TAB																																																																																																												"
+ "             FROM [v_base_rac]																																																																																																										"
+ "             																																																																																																														"
+ "             WHERE 1=1																																																																																																								"
+ "			 and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData)																																																																														"
+ "			 AND Tipo_rac = 'Real'																																																																																																										"
+ "			  AND  [Regional Qual] LIKE '%AVES%'  														"																												
+ "             GROUP BY [MES-DIA]																																																																																																										"
+ "             																																																																																																														"
+ "             DECLARE @LINHAS INT 																																																																																																									"
+ "             																																																																																																														"
+ "             SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																																																																																			"
+ "             																																																																																																														"
+ "             DECLARE @Tabela TABLE (																																																																																																									"
+ "                 VALOR VARCHAR(MAX)																																																																																																									"
+ "             )																																																																																																														"
+ "              																																																																																																														"
+ "             INSERT @Tabela ( 																																																																																																										"
+ "                 VALOR																																																																																																												"
+ "             )																																																																																																														"
+ "             SELECT  																																																																																																												"
+ "                 '||' 																																																																																																												"
+ "             FROM																																																																																																													"
+ "                 #TAB																																																																																																												"
+ "             GROUP BY 																																																																																																												"
+ "                 Descricao																																																																																																											"
+ "              																																																																																																														"
+ "             DECLARE @Descricao VARCHAR(MAX)																																																																																																							"
+ "              																																																																																																														"
+ "             DECLARE c CURSOR LOCAL FAST_FORWARD																																																																																																						"
+ "             FOR																																																																																																														"
+ "              																																																																																																														"
+ "                 SELECT  																																																																																																											"
+ "                     Descricao																																																																																																										"
+ "                 FROM																																																																																																												"
+ "                     #TAB																																																																																																											"
+ "                 ORDER BY 																																																																																																											"
+ "                     Descricao ASC																																																																																																									"
+ "              																																																																																																														"
+ "              																																																																																																														"
+ "             OPEN c																																																																																																													"
+ "              																																																																																																														"
+ "             FETCH c INTO @Descricao																																																																																																									"
+ "              																																																																																																														"
+ "             WHILE @@FETCH_STATUS = 0																																																																																																								"
+ "             BEGIN																																																																																																													"
+ "              																																																																																																														"
+ "                 UPDATE  @Tabela																																																																																																										"
+ "                 SET     VALOR += ', [' + @Descricao + ']'																																																																																																			"
+ "              																																																																																																														"
+ "                 FETCH c INTO @Descricao																																																																																																								"
+ "             END																																																																																																														"
+ "              																																																																																																														"
+ "             CLOSE c																																																																																																													"
+ "             DEALLOCATE c																																																																																																											"
+ "              																																																																																																														"
+ "             SELECT  																																																																																																												"
+ "                 TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																																																																															"
+ "             INTO #TAB2																																																																																																												"
+ "             FROM																																																																																																													"
+ "                 @Tabela																																																																																																												"
+ "             																																																																																																														"
+ "             SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																																																																															"
+ "             																																																																																																														"
+ "             DROP TABLE #TAB																																																																																																											"
+ "             DROP TABLE #TAB2																																																																																																										"
+ "             																																																																																																														"
+ "             PRINT @SQLStr																																																																																																											"
+ "             SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																																																																																				"
+ "																																																																																																																		"
+ "			 DECLARE @SQLStr1 VARCHAR(max)																																																																																																								"
+ "             SET @SQLStr1=''																																																																																																											"
+ "																																																																																																																		"
+ "             SET @SQLStr1 ='select * into #gabriel1 from ( SELECT pt.[Coluna1], pt.[Coluna2], pt.[Coluna3],   '																																																																																						"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT [Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																													"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    ' AND  [Regional Qual] LIKE '%AVES%'    '		+	"																									
+ "             		' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		' +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [Regional Qual], Unidade, [MES-DIA] '+      																																																																																															"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "           																																																																																																															"
+ "             																																																																																																														"
+ "             ' UNION ALL ' +																																																																																																											"
+ "             ' SELECT pt.[Coluna1], pt.[Coluna2], pt.[Coluna3],   '																																																																																																	"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT ''Total'' as Coluna1, ''Total'' as Coluna2, null as Coluna3,  [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																													"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    ' AND  [Regional Qual] LIKE '%AVES%'   '		+	"																									          		
+ "					' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		'  +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [MES-DIA] '+      																																																																																																					"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "             ' ) TT '																																																																																																												"
+ "																																																																																																																		"
+ "			 DECLARE @SQLStr2 VARCHAR(max)																																																																																																								"
+ "             SET @SQLStr2=''																																																																																																											"
+ "																																																																																																																		"
+ "             SET @SQLStr2 ='select * into #gabriel2 from ( SELECT pt.[Coluna1], ''total'' as [Coluna2], null as [Coluna3],   '																																																																																		"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT [Regional Qual] as Coluna1, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																																						"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    '  AND  [Regional Qual] LIKE '%AVES%'   '		+	"																									
+ "             		' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		' +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [Regional Qual], [MES-DIA] '+      																																																																																																	"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "          																																																																																																															"
+ "             																																																																																																														"
+ "             ' UNION ALL ' +																																																																																																											"
+ "             ' SELECT pt.[Coluna1], ''total'' as [Coluna2], null as [Coluna3],   '																																																																																													"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT ''Total'' as Coluna1,  [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																																							"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    ' AND  [Regional Qual] LIKE '%AVES%'   '		+	"																									          		
+ "					' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		'  +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [MES-DIA] '+      																																																																																																					"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "             ' ) TT '																																																																																																												"
+ "																																																																																																																		"
+ "			 DECLARE @SQLStr3 VARCHAR(max)																																																																																																								"
+ "             SET @SQLStr3=''																																																																																																											"
+ "																																																																																																																		"
+ "             SET @SQLStr3 ='select * into #gabriel3 from ( SELECT pt.[Coluna1], pt.[Coluna2], null as [Coluna3],   '																																																																																					"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT [Regional Qual] as Coluna1, Unidade as Coluna2, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																																	"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    '  AND  [Regional Qual] LIKE '%AVES%'  '		+	"																									
+ "             		' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		' +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [Regional Qual], Unidade, [MES-DIA] '+      																																																																																															"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "            																																																																																																															"
+ "             																																																																																																														"
+ "             ' UNION ALL ' +																																																																																																											"
+ "             ' SELECT pt.[Coluna1], pt.[Coluna2], null as [Coluna3],   '																																																																																																"
+ "             + @SQLStr																																																																																																												"
+ "             + ' , null as Total ' +																																																																																																									"
+ "             + ' , null as Total2 ' +																																																																																																								"
+ "             + ' FROM (SELECT ''Total'' as Coluna1, ''Total'' as [Coluna2],  [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																																																																	"
+ "             '         from [v_base_rac] base with (nolock)  ' +																																																																																																		"
+ "             																																																																																																														"
+ "             		' WHERE 1=1 ' +																																																																																																				"
+ "                    '  AND  [Regional Qual] LIKE '%AVES%'  '		+	"																									          		
+ "					' and year(data_rac) = (select year(data) as data from v_maiorData) and month(data_rac) = (select month(data) as data from v_maiorData) AND Tipo_rac = ''Real'' 		'  +																																																																		"
+ "             																																																																																																														"
+ "                     ' GROUP BY [MES-DIA] '+      																																																																																																					"
+ "             '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																																																																																"
+ "             + @SQLStr+')) AS pt ' +																																																																																																									"
+ "             ' ) TT '																																																																																																												"
+ "																																																																																																																		"
+ "			 SET @SQLStr = @SQLStr1 + ' ' + @SQLStr2 + ' ' + @SQLStr3 + ' ' + 																																																																																															"
+ "																																																																																																																		"
+ "			 + ' SELECT * INTO #TTTT FROM  ((select * from #gabriel1) union all (select * from #gabriel2) union all (select * from #gabriel3)) FF  '																																																																													"
+ "																																																																																																																		"
+ "			 + ' SELECT distinct *, N.[Nº RAC] AS RAC FROM #NIVEIS N '																																																																																																						"
+ "			 + ' LEFT JOIN #TTTT T1 ON T1.Coluna1 = N.Coluna1 AND T1.Coluna2 = N.Coluna2 '																																																																																												"
+ "			 + ' ORDER BY 1, 8 DESC, 4, 2 DESC, 9 DESC, 5, 3 DESC, 10 DESC, 6 '																																																																																															"
+ "																																																																																																																		"
+ "             																																																																																																														"
+ "             PRINT @SQLStr																																																																																																											"
+ "             EXEC(@SQLStr)																																																																																																											"
+ "			 																																																																																																															"
+ "			 																																																																																																															"
+ "             																																																																																																														"
+ "             DROP TABLE #TOTAL																																																																																																										"
+ "             DROP TABLE #TOTALFINAL																																																																																																									"
+ "             DROP TABLE #TOTALF																																																																																																										"
+ "			 																																																																																																															"
+ "			 DROP TABLE #RESULTADO																																																																																																										"
+ "            DROP TABLE #TABELA1																																																																																																										"
+ "            DROP TABLE #TABELA2																																																																																																										"
+ "            DROP TABLE #TABELA3																																																																																																										"
+ "            DROP TABLE #BASE																																																																																																											"
+ "																																																																																																																		"
+ "			DROP TABLE #NIVEIS																																																																																																											"
																																																																																																																		
																																																																																																																		
            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoAves ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['C1'];
                    delete json[i]['C2'];
                    delete json[i]['C3'];
                    delete json[i]['Coluna1'];
                    delete json[i]['Coluna2'];
                    delete json[i]['Coluna3'];
                    delete json[i]['Nº RAC'];
                    delete json[i]['C1__'];
                    delete json[i]['C2__'];
                    delete json[i]['C3__'];
                    delete json[i]['Coluna_'];
                    delete json[i]['Total'];
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoAves(json)
            })

            var sqlTableRacRACDetalhesEvolucaoPreparados = ""
            + " SELECT																																																			"
            + " [Origem_do_Problema_rac] Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Origem],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Origem_do_Problema_rac] Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Origem_do_Problema_rac], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.origem = PT.origem ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Origem],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoPreparados ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoPreparados(json)
            })


            var sqlTableRacRACDetalhesEvolucaoFatiados = ""
            + " SELECT																																																			"
            + " [Origem_do_Problema_rac] Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Origem],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Origem_do_Problema_rac] Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Origem_do_Problema_rac], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.origem = PT.origem ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Origem],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoFatiados ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoFatiados(json)
            })


            var sqlTableRacRACDetalhesEvolucaoPescados = ""
            + " SELECT																																																			"
            + " [Origem_do_Problema_rac] Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Origem],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Origem_do_Problema_rac] Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Origem_do_Problema_rac], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.origem = PT.origem ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Origem],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoPescados ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoPescados(json)
            })


            var sqlTableRacRACDetalhesEvolucaoSuinos = ""
            + " SELECT																																																			"
            + " [Origem_do_Problema_rac] Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [Origem_do_Problema_rac]																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " 																																																				"
            + " 																																																				"
            + " DECLARE @SQLStr VARCHAR(max)																																													"
            + " SET @SQLStr=''																																																	"
            + " 																																																				"
            + " SELECT																																																			"
            + " [MES-DIA] Descricao																																																"
            + " INTO #TAB																																																		"
            + " FROM [v_base_rac]																																																"
            + " 																																																				"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR')  													"
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY [MES-DIA]																																																"
            + " 																																																				"
            + " DECLARE @LINHAS INT 																																															"
            + " 																																																				"
            + " SELECT @LINHAS = (SELECT COUNT(1) FROM #TAB)																																									"
            + " 																																																				"
            + " DECLARE @Tabela TABLE (																																															"
            + "     VALOR VARCHAR(MAX)																																															"
            + " )																																																				"
            + "  																																																				"
            + " INSERT @Tabela ( 																																																"
            + "     VALOR																																																		"
            + " )																																																				"
            + " SELECT  																																																		"
            + "     '||' 																																															"
            + " FROM																																																			"
            + "     #TAB																																																		"
            + " GROUP BY 																																																		"
            + "     Descricao																																																	"
            + "  																																																				"
            + " DECLARE @Descricao VARCHAR(MAX)																																													"
            + "  																																																				"
            + " DECLARE c CURSOR LOCAL FAST_FORWARD																																												"
            + " FOR																																																				"
            + "  																																																				"
            + "     SELECT  																																																	"
            + "         Descricao																																																"
            + "     FROM																																																		"
            + "         #TAB																																																	"
            + "     ORDER BY 																																																	"
            + "         Descricao ASC																																															"
            + "  																																																				"
            + "  																																																				"
            + " OPEN c																																																			"
            + "  																																																				"
            + " FETCH c INTO @Descricao																																															"
            + "  																																																				"
            + " WHILE @@FETCH_STATUS = 0																																														"
            + " BEGIN																																																			"
            + "  																																																				"
            + "     UPDATE  @Tabela																																																"
            + "     SET     VALOR += ', [' + @Descricao + ']'																																									"
            + "  																																																				"
            + "     FETCH c INTO @Descricao																																														"
            + " END																																																				"
            + "  																																																				"
            + " CLOSE c																																																			"
            + " DEALLOCATE c																																																	"
            + "  																																																				"
            + " SELECT  																																																		"
            + "     TOP 1 Descricoes = REPLACE(STUFF(VALOR, 1, 0, ''),'||,','')																																					"
            + " INTO #TAB2																																																		"
            + " FROM																																																			"
            + "     @Tabela																																																		"
            + " 																																																				"
            + " SELECT @SQLStr = @SQLStr + (SELECT TOP 1 Descricoes FROM #TAB2)																																					"
            + " 																																																				"
            + " DROP TABLE #TAB																																																	"
            + " DROP TABLE #TAB2																																																"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " SET @SQLStr = LEFT(@SQLStr,len(@SQLStr))																																										"
            + " 																																																				"
            + " SET @SQLStr ='SELECT pt.[Origem],   '																																											"
            + " + @SQLStr																																																		"
            + " + ' , T.Quant_rac as Total ' +																																													"
            + " + ' , 0 as Total2 ' +																																															"
            + " + ' FROM (SELECT [Origem_do_Problema_rac] Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [Origem_do_Problema_rac], [MES-DIA] '+      																																								"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " ' INNER JOIN #TOTAL T ON T.origem = PT.origem ' +																																								"
            + " 																																																				"
            + " ' UNION ALL ' +																																																	"
            + " ' SELECT pt.[Origem],   '																																														"
            + " + @SQLStr																																																		"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total ' +																																							"
            + " + ' , (SELECT SUM(Quant_rac) from #TOTALF) as Total2 ' +																																						"
            + " + ' FROM (SELECT ''Total'' as Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																													"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') 		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY [MES-DIA] '+      																																											"
            + " '         ) sq PIVOT (sum(Quant_rac) FOR [MES-DIA] IN ('																																						"
            + " + @SQLStr+')) AS pt ' +																																															"
            + " 																																																				"
            + " ' ORDER BY  ' + CAST(@LINHAS + 3 AS VARCHAR) + ' ASC, ' + CAST(@LINHAS + 2 AS VARCHAR) + ' DESC ' 																												"
            + " 																																																				"
            + " PRINT @SQLStr																																																	"
            + " EXEC(@SQLStr)																																																	"
            + " 																																																				"
            + " DROP TABLE #TOTAL																																																"
            + " DROP TABLE #TOTALFINAL																																															"
            + " DROP TABLE #TOTALF																																																"


            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesEvolucaoSuinos ]).then((response) => {
                
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesEvolucaoSuinos(json)
            })


            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Jéssica') "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEContasGlobais(json)
            })

            flagTable = true;

           
        }

    }

    const buscarDados = (response, funcao, graficoRetorno, funcaoRetorno) => {

        setIsUpdatingData(true)

        let parm = " ";

        let json = JSON.parse(response.data)

        if (json.length == 0) return

        let datasets = [];
        let indicators = Object.keys(json[0]).map(key => key);

        if (typeof (funcao) == "function") {
            funcao(json);
        }

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
            <canvas style={{ display: 'none' }} ref={canvasRef} />
            {/* <button className="btn btn-sm btn-outline-secondary" onClick={arrumaTabela2('clJapao')}>Atualizar</button> */}
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
                                    {({ toPdf }) => (
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
            {/* {isUpdatingData ? (<div> </div>) : ( */}
                <Row style={{ paddingRight: '15px', paddingLeft: '15px', display: "none" }}>
                    <button className="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={aplicar} id="btnAplicar">Aplicar</button>
                </Row>
            {/* )} */}



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
                                    <Chart type="bar" data={responseGraficoCETotal} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoRACTotalCE} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCE} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRAC} options={lightOptions} className="divMedia" />
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
                                    <Chart type="bar" data={responseGraficoCETotalAvesPesadas} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACTotalCEAvesPesadas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico divMenor">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadas} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadas} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadas} options={lightOptions} className="divMedia" />
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
                                    <Chart type="bar" data={responseGraficoCETotalAvesPesadasPR} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCEAvesPesadasPR} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadasPR} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasPR} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasPR} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>

                    </Row>

                </reg>

                <reg id="region RAC - Aves Pesadas SP/CO/NE">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Aves Pesadas SP/CO/NE
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotalAvesPesadasSP} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCEAvesPesadasSP} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadasSP} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasSP} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasSP} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>

                    </Row>

                </reg>

                <reg id="region RAC - Aves Pesadas RS/SC/SP">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Aves Pesadas RS/SC/SP
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="Habilitador" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoCETotalAvesPesadasRS} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCEAvesPesadasRS} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadasRS} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasRS} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasRS} options={lightOptions} className="divMedia" />
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
                                    <Chart type="bar" data={responseGraficoCETotalAvesLeves} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCEAvesLeves} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesLeves} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACAvesLeves} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesLeves} options={lightOptions} className="divMedia" />
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
                                    <Chart type="bar" data={responseGraficoCETotalSuinos} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCESuinos} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCESuinos} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACSuinos} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPSuinos} options={lightOptions} className="divMedia" />
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
                                    <Chart type="bar" data={responseGraficoCETotalPreparados} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACTotalCEPreparados} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEPreparados} options={lightOptions} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoRACPreparados} options={lightOptions} className="divMedia" />
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPPreparados} options={lightOptions} className="divMedia" />
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
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACAvesPesadas} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadas} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadas} options={optionsComparativo} className="divMenor2" />
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
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasPR} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadasPR} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadasPR} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>

                </reg>

                <reg id="region RAC - Reclamações - Aves Pesadas SP/CO/NE">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Aves Pesadas SP/CO/NE
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasSP} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadasSP} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadasSP} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>

                </reg>

                <reg id="region RAC - Reclamações - Aves Pesadas RS/SC/SP">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Aves Pesadas RS/SC/SP
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasRS} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadasRS} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadasRS} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>

                </reg>

                <reg id="region RAC - Reclamações - Aves Leves">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Reclamações - Aves Leves
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACAvesLeves} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesLeves} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesLeves} options={optionsComparativo} className="divMenor2" />
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
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACSuinos} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesSuinos} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasSuinos} options={optionsComparativo} className="divMenor2" />
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
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACPreparados} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesPreparados} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasPreparados} options={optionsComparativo} className="divMenor2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>


                </reg>

                <reg id="region RAC - Abertura ME e MI">

                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Mercado Interno
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACMI} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">

                        </Col>

                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            Mercado Externo
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoRACME} options={lightOptions} className="divMaior2" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACAberturaME()

                            )}
                        </Col>

                    </Row>

                    <Row>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Oriente Médio
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEOrienteMedio()

                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Europa
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEEuropa()

                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Japão
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEJapao()

                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Ásia
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEAsia()

                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Américas / África
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEAmericasAfrica()

                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-lg-2 col-md-2 col-sm-1">
                            <Row>
                                <Col className="mt-1 col-12 cssSeara2021_titulo">
                                    Contas globais
                                    <hr></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-lg-12 col-md-12 col-sm-1">
                                    {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEContasGlobais()

                                    )}
                                </Col>
                            </Row>
                        </Col>


                    </Row>

                </reg>



                {/* Testes finais */}

                {/* <Row>

                                    <Col className="mt-5">                     

                                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                            
                                            DataTableRACME() 
                                        
                                        )}

                                    </Col>  
                                </Row> */}
                

                <reg id="region RAC - +1">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                FFO
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesFFO} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Atendimento Comercial
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesAC} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +2">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Logística Exportação
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesLogME} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Logística Importação
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesLogMI} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +3">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Documentação
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesDoc} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Transporte Terrestre
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesTT} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +3">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Produção em Terceiro (ex. Massatake)
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesTerceiro} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Terceiro
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesTerceiro()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +4">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Massatake
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesMassatake} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                PDV
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesPDV} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +5">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura PDV
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesAberturaPDV} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesPDV()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +6">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Tipo Crítica
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCritica} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        
                    </Row>

                    <Row>
                        
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesCritica()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +7">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Totais
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoTotal()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +8">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Aves
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoAves()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +9">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Aves
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +10">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoPreparados()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +11">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Fatiados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoFatiados()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +12">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Pescados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoPescados()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +13">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +14">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Evolução - Suínos
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesEvolucaoSuinos()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +15">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Suínos
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +16">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Linhas Especiais (Seara Nature, Gourmet, Incrível)
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesEspeciais} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Linhas Especiais - Família
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +17">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Linhas Especial Seara (Acumulado Mês)
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +18">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpo Estranho - Totais
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCE} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpo Estranho - Inerente
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCEInerente} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +19">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpo Estranho - Não inerentes
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCENaoInerente} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpo Estranho - Plástico
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCEPlastico} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +20">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Inseto
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesInseto} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +21">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Cabelo
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesCabelo} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +22">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Plástico
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesPlastico} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +23">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Metal
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesMetal} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +24">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Intoxicação
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesIntoxicacao} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +25">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Larva
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoRACDetalhesLarva} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +26">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpos Estranhos
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +27">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpos Estranhos Inerentes
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +28">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpos Estranhos Não Inerentes
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +29">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Corpos Estranhos Inerentes e Não Inerentes
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )} 
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +30">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Habilitador Corpos Estranhos Não Inerentes
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +31">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D3 - In Natura
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D3 - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +32">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D0 - In Natura
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D0 - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>



                {/* ///////////////////////////////////////////////////////// */}

                <reg id="region RAC - Total +33">
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs Abertura ME
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalME()

                            )}

                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs Abertura MI
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalMI()

                            )}

                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs Abertura MI Especiais
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalRECL()

                            )}

                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs PDV Abertura
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalPDV()

                            )}

                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs terceiros Abertura
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalTE()

                            )}

                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1 col-12 cssSeara2021_titulo">
                            RACs Crítica Abertura
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="mb-5">

                            {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                DataTableRACFinalCRIT()

                            )}

                        </Col>
                    </Row>
                </reg>

                <reg id="region RAC - +34">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log - Total
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoNNCLogDetalhesTotal} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log - Aves
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoNNCLogDetalhesAves} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +35">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoNNCLogDetalhesPreparados} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log - Suínos
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoNNCLogDetalhesSuinos} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                    </Row>

                </reg>

                <reg id="region RAC - +36">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Evolução Mês
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +37">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log D3 - In Natura
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log D0
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>

                
                    
                </reg>

                <reg id="region RAC - +38">

                    <Row>
                        <Col className="col-12">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Totais
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaME()

                                )}
                            </Col>
                        </Col>

                        
                    </Row>

                
                    
                </reg>

                <reg id="region NNC +39">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Aves Pesadas
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Aves Pesadas" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCAvesPesadas} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPesadasUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPesadasProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +40">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Aves RS/SC/SP
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Aves RS/SC/SP" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCAvesRS} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesRSUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesRSProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +41">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Aves SP/CO/NE
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Aves SP/CO/NE" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCAvesSP} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesSPUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesSPProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +42">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Aves PR
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Aves PR" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCAvesPR} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPRUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPRProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +42">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Aves Leves
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Aves Leves" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCAvesLeves} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesLevesUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesLevesProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +43">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Suínos
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Suínos" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCSuinos} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCSuinosUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCSuinosProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>

                </reg>

                <reg id="region NNC +44">

                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC - Preparados
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Preparados" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCPreparados} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCPreparadosUnidades} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCPreparadosProblemas} options={lightOptions} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                        </Col>

                    </Row>

                </reg>

                <reg id="region NNC +45">

                    
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Totais" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCETotal} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Inerente" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCEInerente} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>

                    </Row>

                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Não Inerente" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCENaoInerente} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Ossos" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCEOssos} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>

                    </Row>

                    

                </reg>

                <reg id="region NNC +46">                
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Plástico" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCEPlastico} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +47">                
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Metal" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCEMetal} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +48">                
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC - Corpos Estranhos Ossos" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                    <Chart type="bar" data={responseGraficoNNCCEOssos} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +49">    
                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC MP Corpos Estranhos
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +50">    
                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC MP Corpos Estranhos Inerentes e Não Inerentes
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +51">    
                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC MP Corpos Estranhos - Ossos - Unidade Reclamante / Fornecedor / Produto
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +52">    
                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC MP Corpos Estranhos - Ossos - Fornecedor
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +53">    
                    <Row>
                        <Col className=" col-12 cssSeara2021_titulo">
                            NNC MP Corpos Estranhos - Unidades reclamantes
                        <hr></hr>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableRACAberturaME()
                                
                            )}
                        </Col>

                    </Row>
                </reg>


                
               

            </div>

        </div>
    )
}

export default Home;