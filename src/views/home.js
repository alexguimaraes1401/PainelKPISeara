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
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false]  
        
        
    const percorreNumeroChamados = () => {
        
        // 
        for (var i = 0; i < numeroChamados.length; i++) {
            if (numeroChamados[i] == false) {
                return false
            }
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

    let [TableRacAberturaLinhaEspecialFamilia, setTableRacAberturaLinhaEspecialFamilia] = React.useState()
    let [TableRacAberturaLinhaEspecialAcumuladoGourmet, setTableRacAberturaLinhaEspecialAcumuladoGourmet] = React.useState()
    let [TableRacAberturaLinhaEspecialAcumuladoIncrivel, setTableRacAberturaLinhaEspecialAcumuladoIncrivel] = React.useState()
    let [TableRacAberturaLinhaEspecialAcumuladoNature, setTableRacAberturaLinhaEspecialAcumuladoNature] = React.useState()
    let [TableRacAberturaLinhaEspecialAcumuladoRotisserie, setTableRacAberturaLinhaEspecialAcumuladoRotisserie] = React.useState()

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

    let [TableRacLarva, setTableRacLarva] = React.useState()
    let [TableRacIntoxicacao, setTableRacIntoxicacao] = React.useState()
    let [TableRacMetal, setTableRacMetal] = React.useState()
    let [TableRacPlastico, setTableRacPlastico] = React.useState()
    let [TableRacCabelo, setTableRacCabelo] = React.useState()
    let [TableRacInseto, setTableRacInseto] = React.useState()

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
    let [TableNNCLogD3, setTableNNCLogD3] = React.useState() 
    //tabela NNC Log D-0 
    let [TableNNCLogD0, setTableNNCLogD0] = React.useState()

    //tabela NNC Totais 
    let [TableNNCTotais, setTableNNCTotais] = React.useState()

    //tabela NNC Evolução dia 
    let [TableNNCEvolucaoDia, setTableNNCEvolucaoDia] = React.useState()

    let [TableNNCEvolucaoMes, setTableNNCEvolucaoMes] = React.useState()

    let [TableNNCEvolucaoMesTotais, setTableNNCEvolucaoMesTotais] = React.useState()

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


    //tabela NNC MP D-3 In Natura
    let [TableNNCMPD3InNatura, setTableNNCMPD3InNatura] = React.useState() //ABERTURA D-3 InNatura

    //tabela NNC MP D-3 Preparados
    let [TableNNCMPD3Preparados, setTableNNCMPD3Preparados] = React.useState() //ABERTURA D-3 Preparados

    //tabela NNC MP D-0 In Natura
    let [TableNNCMPD0InNatura, setTableNNCMPD0InNatura] = React.useState() //ABERTURA D-0 InNatura

    //tabela NNC MP D-0 Preparados
    let [TableNNCMPD0Preparados, setTableNNCMPD0Preparados] = React.useState() //ABERTURA D-0 Preparados

    let [TableNNCMPCEOssos, setTableNNCMPCEOssos] = React.useState()
    let [TableNNCMPCEOssosFornecedor, setTableNNCMPCEOssosFornecedor] = React.useState()
    let [TableNNCMPCEOssosUnidadesReclamantes, setTableNNCMPCEOssosUnidadesReclamantes] = React.useState()

    let [TableRacCorposEstranhos, setTableRacCorposEstranhos] = React.useState()
    let [TableRacCorposEstranhosInerentes, setTableRacCorposEstranhosInerentes] = React.useState()
    let [TableRacCorposEstranhosNaoInerentes, setTableRacCorposEstranhosNaoInerentes] = React.useState()
    let [TableRacCorposEstranhosInerentesNaoInerentes, setTableRacCorposEstranhosInerentesNaoInerentes] = React.useState()


    let [TableNNCCEPlastico, setTableNNCCEPlastico] = React.useState()
    let [TableNNCCEMetal, setTableNNCCEMetal] = React.useState()
    let [TableNNCCEOssos, setTableNNCCEOssos] = React.useState()
    let [TableNNCCE, setTableNNCCE] = React.useState()
    let [TableNNCCEInerenteNaoInerente, setTableNNCCEInerenteNaoInerente] = React.useState()

    let [TableHabilitadorCorposEstranhosNaoInerentes, setTableHabilitadorCorposEstranhosNaoInerentes] = React.useState()
    


    let whereRACPreparados = "WHERE ([Regional (Qualidade)] in ('Outros', 'Preparados 1', 'Preparados 2', 'Itajaí') AND [Regional (Produção)] in ('Itajaí - Indus/Sui', 'Outros', 'Preparados', 'Itajaí - Indus', 'Itajaí') ) "
    whereRACPreparados += " AND ([Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','FABRICAÇÃO')"
    whereRACPreparados += "                                 OR [Origem da RAC] IS NULL) "
    whereRACPreparados += " and unidade in ( "
    whereRACPreparados += " 'Bom Retiro', "
    whereRACPreparados += " 'Brasília',  "
    whereRACPreparados += " 'Carambeí',  "
    whereRACPreparados += " 'Caxias do Sul - Ana Rech',  "
    whereRACPreparados += " 'Dourados',  "
    whereRACPreparados += " 'Duque de Caxias',  "
    whereRACPreparados += " 'ITAJAI INDUSTRIALIZADOS',  "
    whereRACPreparados += " 'Itapiranga',  "
    whereRACPreparados += " 'Jaguariúna',  "
    whereRACPreparados += " 'Jundiaí', "
    whereRACPreparados += " 'Lages',  "
    whereRACPreparados += " 'Montenegro',  "
    whereRACPreparados += " 'Osasco',  "
    whereRACPreparados += " 'Rio Grande da Serra',  "
    whereRACPreparados += " 'Roca Sales',  "
    whereRACPreparados += " 'Salto Veloso',  "
    whereRACPreparados += " 'São Gonçalo',  "
    whereRACPreparados += " 'São Miguel do Oeste',  "
    whereRACPreparados += " 'Seara',  "
    whereRACPreparados += " 'Três Passos',  "
    whereRACPreparados += " 'Jaragua do Sul')  "
    whereRACPreparados += " "

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
    
    

    function arrumaTabela1nivel(classTable) {
//
        var table = $('.' + classTable + ' table')[0];
        if(table) {

            for(var j = 0; j<table.rows[0].cells.length; j++){
                if(table.rows[0].cells[j].innerText == "RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "QTD"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº NNC MP"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Coluna"){
                    table.rows[0].cells[j].innerText = ""
                }
                
            }

            for (var i = 0; i < table.rows.length; i++) {
                //console.log($('.'+classTable+' table').rows[i].cells[0].innerText);
                if (table.rows[i].cells[0].innerText.match(/.*@@.*/)) {
                    //alert($('.'+classTable+' table').rows[i].cells[0].innerText)
                    table.rows[i].style.background = '#cccccc'
                }
            }

            for(var i = 0; i<table.rows.length; i++){
                for(var j = 0; j<table.rows[0].cells.length; j++){
                    if(table.rows[i].cells[j].innerText == "<VERDE>"){
                        table.rows[i].cells[j].innerText = "🟢"
                    }else if(table.rows[i].cells[j].innerText == "<VERMELHO>"){
                        table.rows[i].cells[j].innerText = "🔴"
                    }else if(table.rows[i].cells[j].innerText == "<AMARELO>"){
                        table.rows[i].cells[j].innerText = "🟡"
                    }
                }
            }

            if (table.rows[table.rows.length - 1].cells[0].innerText == "Total" || table.rows[table.rows.length - 1].cells[0].innerText == "<b>Total</b>" ) {
                table.rows[table.rows.length - 1].style.background = '#999999'
                table.rows[table.rows.length - 1].style.color = 'white'
    
            }

            var classtable_ = $('.' + classTable + '')[0];
            classtable_.innerHTML = classtable_.innerHTML.replaceAll(".....", "&nbsp;&nbsp;&nbsp;&nbsp;")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("@@", "")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;b&gt;", "")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;/b&gt;", "")
            

        }
    }

    function arrumaTabela2niveis(classTable) {
        
        var table = $('.' + classTable + ' table')[0];
        if(table) {

            
            for(var j = 0; j<table.rows[0].cells.length; j++){
                if(table.rows[0].cells[j].innerText == "RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "QTD"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº NNC MP"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Coluna"){
                    table.rows[0].cells[j].innerText = ""
                }
            }
            

            for (var i = 0; i < table.rows.length; i++) {
                //console.log($('.'+classTable+' table').rows[i].cells[0].innerText);
                if (table.rows[i].cells[0].innerText.match(/.*<b>.*/)) {
                    //alert($('.'+classTable+' table').rows[i].cells[0].innerText)
                    table.rows[i].style.background = '#cccccc'
                }
            }

            for(var i = 0; i<table.rows.length; i++){
                for(var j = 0; j<table.rows[0].cells.length; j++){
                    if(table.rows[i].cells[j].innerText == "<VERDE>"){
                        table.rows[i].cells[j].innerText = "🟢"
                    }else if(table.rows[i].cells[j].innerText == "<VERMELHO>"){
                        table.rows[i].cells[j].innerText = "🔴"
                    }else if(table.rows[i].cells[j].innerText == "<AMARELO>"){
                        table.rows[i].cells[j].innerText = "🟡"
                    }
                }
            }

            
            

            if (table.rows[table.rows.length - 1].cells[0].innerText == "Total" || table.rows[table.rows.length - 1].cells[0].innerText == "<b>Total</b>" ) {
                table.rows[table.rows.length - 1].style.background = '#999999'
                table.rows[table.rows.length - 1].style.color = 'white'
    
            }

            var classtable_ = $('.' + classTable + '')[0];
            classtable_.innerHTML = classtable_.innerHTML.replaceAll(".....", "&nbsp;&nbsp;&nbsp;&nbsp;")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("@@", "")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;b&gt;", "<b>")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;/b&gt;", "</b>")

            


            
        }
    }

    function arrumaTabela3niveis(classTable) {

        var table = $('.' + classTable + ' table')[0];
        if(table) {

            for(var j = 0; j<table.rows[0].cells.length; j++){
                if(table.rows[0].cells[j].innerText == "RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº RAC"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "QTD"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Nº NNC MP"){
                    table.rows[0].cells[j].innerText = "Total"
                }else if(table.rows[0].cells[j].innerText == "Coluna"){
                    table.rows[0].cells[j].innerText = ""
                }
            }

            for (var i = 0; i < table.rows.length; i++) {
                //console.log($('.'+classTable+' table').rows[i].cells[0].innerText);
                if (table.rows[i].cells[0].innerText.match(/.*@@.*/)) {
                    //alert($('.'+classTable+' table').rows[i].cells[0].innerText)
                    table.rows[i].style.background = '#cccccc'
                }
            }

            for(var i = 0; i<table.rows.length; i++){
                for(var j = 0; j<table.rows[0].cells.length; j++){
                    if(table.rows[i].cells[j].innerText == "<VERDE>"){
                        table.rows[i].cells[j].innerText = "🟢"
                    }else if(table.rows[i].cells[j].innerText == "<VERMELHO>"){
                        table.rows[i].cells[j].innerText = "🔴"
                    }else if(table.rows[i].cells[j].innerText == "<AMARELO>"){
                        table.rows[i].cells[j].innerText = "🟡"
                    }
                }
            }

            if (table.rows[table.rows.length - 1].cells[0].innerText == "Total" || table.rows[table.rows.length - 1].cells[0].innerText == "<b>Total</b>" ) {
                table.rows[table.rows.length - 1].style.background = '#999999'
                table.rows[table.rows.length - 1].style.color = 'white'
    
            }

            var classtable_ = $('.' + classTable + '')[0];
            classtable_.innerHTML = classtable_.innerHTML.replaceAll(".....", "&nbsp;&nbsp;&nbsp;&nbsp;")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("@@", "")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;b&gt;", "<b>")
            classtable_.innerHTML = classtable_.innerHTML.replaceAll("&lt;/b&gt;", "</b>")
            
            
        }
    }

    
    

    //Handlers
    React.useEffect(() => {
        setIsUpdatingData(true);

        chamarAPI("CETotal", GraficoCETotal, "GraficoCETotal", [' where 1=1 '], setGraficoCETotal, setresponseGraficoCETotal, 0)     // 1
        chamarAPI("CETotal", GraficoNNCMPTotalCE, "GraficoNNCMPTotalCE", [" where tipo = 'NNC MP' "], setGraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, 1)       // 2
        chamarAPI("CETotal", GraficoRACTotalCE, "GraficoRACTotalCE", [" where TIPO = 'RAC' "], setGraficoRACTotalCE, setresponseGraficoRACTotalCE, 2)     // 3
        chamarAPI("RAC", GraficoRAC, "GraficoRAC", [' where 1=1 '], setGraficoRAC, setresponseGraficoRAC, 3)    // 4
        chamarAPI("NCCMP", GraficoNCCMP, "GraficoNCCMP", [whereNNCMP], setGraficoNCCMP, setresponseGraficoNCCMP, 4)    // 5 
        

        chamarAPI("CETotal", GraficoCETotalAvesPesadas, "GraficoCETotalAvesPesadas", [" where [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, 5)     // 6
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadas, "GraficoNNCMPTotalCEAvesPesadas", [" where tipo = 'NNC MP' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR') "], setGraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, 6)       // 7
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadas, "GraficoRACTotalCEAvesPesadas", [" where TIPO = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, 7)     // 8
        chamarAPI("RACIndicadores", GraficoRACAvesPesadas, "GraficoRACAvesPesadas", [" where [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, 8)    // 9
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadas, "GraficoNCCMPAvesPesadas", [whereNNCMP + " and [Reg. Qual] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  "], setGraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, 9)    // 10

        chamarAPI("CETotal", GraficoCETotalAvesPesadasPR, "GraficoCETotalAvesPesadasPR", [' where [Regional Qualidade] = \'Aves Pesadas PR\' '], setGraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR, 10)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasPR, "GraficoNNCMPTotalCEAvesPesadasPR", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas PR'  "], setGraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR, 11)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasPR, "GraficoRACTotalCEAvesPesadasPR", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas PR')   "], setGraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR, 12)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasPR, "GraficoRACAvesPesadasPR", [" WHERE [Regional (Qualidade)] in ('Aves Pesadas PR') AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO')             "], setGraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR, 13)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasPR, "GraficoNCCMPAvesPesadasPR", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas PR\'  '], setGraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR, 14)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesPesadasSP, "GraficoCETotalAvesPesadasSP", [" where [Regional Qualidade] = 'Aves Pesadas SP/CO/NE' "], setGraficoCETotalAvesPesadasSP, setresponseGraficoCETotalAvesPesadasSP, 42)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasSP, "GraficoNNCMPTotalCEAvesPesadasSP", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas SP/CO/NE'  "], setGraficoNNCMPTotalCEAvesPesadasSP, setresponseGraficoNNCMPTotalCEAvesPesadasSP, 43)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasSP, "GraficoRACTotalCEAvesPesadasSP", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas SP/CO/NE')   "], setGraficoRACTotalCEAvesPesadasSP, setresponseGraficoRACTotalCEAvesPesadasSP, 44)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasSP, "GraficoRACAvesPesadasSP", [" WHERE [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE') AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACAvesPesadasSP, setresponseGraficoRACAvesPesadasSP, 45)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasSP, "GraficoNCCMPAvesPesadasSP", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas SP/CO/NE\'  '], setGraficoNCCMPAvesPesadasSP, setresponseGraficoNCCMPAvesPesadasSP, 46)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesPesadasRS, "GraficoCETotalAvesPesadasRS", [" where [Regional Qualidade] = 'Aves Pesadas RS/SC/SP' "], setGraficoCETotalAvesPesadasRS, setresponseGraficoCETotalAvesPesadasRS, 47)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesPesadasRS, "GraficoNNCMPTotalCEAvesPesadasRS", ["  where tipo = 'NNC MP' AND [Regional Qualidade] = 'Aves Pesadas RS/SC/SP'  "], setGraficoNNCMPTotalCEAvesPesadasRS, setresponseGraficoNNCMPTotalCEAvesPesadasRS, 48)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesPesadasRS, "GraficoRACTotalCEAvesPesadasRS", ["  WHERE tipo = 'RAC' AND [Regional Qualidade] in ('Aves Pesadas RS/SC/SP')   "], setGraficoRACTotalCEAvesPesadasRS, setresponseGraficoRACTotalCEAvesPesadasRS, 49)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesPesadasRS, "GraficoRACAvesPesadasRS", [" WHERE [Regional (Qualidade)] in ('Aves Pesadas RS/SC/SP' )  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACAvesPesadasRS, setresponseGraficoRACAvesPesadasRS, 50)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesPesadasRS, "GraficoNCCMPAvesPesadasRS", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas RS/SC/SP\'  '], setGraficoNCCMPAvesPesadasRS, setresponseGraficoNCCMPAvesPesadasRS, 51)    // 15

        chamarAPI("CETotal", GraficoCETotalAvesLeves, "GraficoCETotalAvesLeves", [' where [Regional Qualidade]  = \'Aves Leves\' '], setGraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves, 15)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEAvesLeves, "GraficoNNCMPTotalCEAvesLeves", [" where tipo = 'NNC MP' AND [Regional Qualidade] = \'Aves Leves\' "], setGraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves, 16)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEAvesLeves, "GraficoRACTotalCEAvesLeves", ["  where tipo = 'RAC' AND [Regional Qualidade] = \'Aves Leves\'   "], setGraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves, 17)     // 13
        chamarAPI("RACIndicadores", GraficoRACAvesLeves, "GraficoRACAvesLeves", [" WHERE [Regional (Qualidade)] = 'Aves Leves'   AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO')  "], setGraficoRACAvesLeves, setresponseGraficoRACAvesLeves, 18)    // 14
        chamarAPI("NCCMP", GraficoNCCMPAvesLeves, "GraficoNCCMPAvesLeves", [whereNNCMP + ' and [Reg. Qual] = \'Aves Leves\'  '], setGraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves, 19)    // 15

        chamarAPI("CETotal", GraficoCETotalSuinos, "GraficoCETotalSuinos", [' where [Regional Qualidade]  in (\'Suínos\',\'Suíno\') '], setGraficoCETotalSuinos, setresponseGraficoCETotalSuinos, 20)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCESuinos, "GraficoNNCMPTotalCESuinos", [" where tipo = 'NNC MP' AND [Regional Qualidade] = \'Suínos\' "], setGraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos, 21)       // 12
        chamarAPI("CETotal", GraficoRACTotalCESuinos, "GraficoRACTotalCESuinos", ["  where tipo = 'RAC' AND [Regional Qualidade] = \'Suínos\'   "], setGraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos, 22)     // 13
        chamarAPI("RACIndicadores", GraficoRACSuinos, "GraficoRACSuinos", [" WHERE [Regional (Qualidade)] in ('Suínos', 'Outros') and [Regional (Produção)] in ('Itajaí - Indus/Sui', 'SUINOS') AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACSuinos, setresponseGraficoRACSuinos, 23)    // 14
        chamarAPI("NCCMP", GraficoNCCMPSuinos, "GraficoNCCMPSuinos", [whereNNCMP + ' and [Reg. Qual] = \'Suínos\'  '], setGraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos, 24)    // 15



        chamarAPI("CETotal", GraficoCETotalPreparados, "GraficoCETotalPreparados", [' where [Regional Qualidade] in (\'Preparados\',\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\',\'Itajaí\') and Negócio in (\'Preparados\',\'Outros\', \'INDUSTRIALIZADOS\', \'Fatiados\') '], setGraficoCETotalPreparados, setresponseGraficoCETotalPreparados, 25)     // 11
        chamarAPI("CETotal", GraficoNNCMPTotalCEPreparados, "GraficoNNCMPTotalCEPreparados", [" where tipo = 'NNC MP' AND [Regional Qualidade]  in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\',\'Itajaí\') and Negócio in (\'Preparados\',\'Outros\', \'INDUSTRIALIZADOS\', \'Fatiados\')  "], setGraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados, 26)       // 12
        chamarAPI("CETotal", GraficoRACTotalCEPreparados, "GraficoRACTotalCEPreparados", ["  where tipo = 'RAC' AND [Regional Qualidade]  in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\',\'Itajaí\') and Negócio in (\'Preparados\',\'Outros\', \'INDUSTRIALIZADOS\', \'Fatiados\')   "], setGraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados, 27)     // 13
        chamarAPI("RACIndicadores", GraficoRACPreparados, "GraficoRACPreparados", [whereRACPreparados] , setGraficoRACPreparados, setresponseGraficoRACPreparados, 28)    // 14
        chamarAPI("NCCMP", GraficoNCCMPPreparados, "GraficoNCCMPPreparados", [whereNNCMP + ' and [Reg. Qual] in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\')  '], setGraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados, 29)    // 15

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadas, "GraficoRACUnidadesAvesPesadas", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO')  "], setGraficoRACUnidadesAvesPesadas, setresponseGraficoRACUnidadesAvesPesadas, 30)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadas, "GraficoRACProblemasAvesPesadas", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE','Aves Pesadas RS/SC/SP', 'Aves Pesadas PR')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACProblemasAvesPesadas, setresponseGraficoRACProblemasAvesPesadas, 31)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasPR, "GraficoRACUnidadesAvesPesadasPR", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas PR')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACUnidadesAvesPesadasPR, setresponseGraficoRACUnidadesAvesPesadasPR, 32)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasPR, "GraficoRACProblemasAvesPesadasPR", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas PR')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACProblemasAvesPesadasPR, setresponseGraficoRACProblemasAvesPesadasPR, 33)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasSP, "GraficoRACUnidadesAvesPesadasSP", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACUnidadesAvesPesadasSP, setresponseGraficoRACUnidadesAvesPesadasSP, 52)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasSP, "GraficoRACProblemasAvesPesadasSP", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas SP/CO/NE')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACProblemasAvesPesadasSP, setresponseGraficoRACProblemasAvesPesadasSP, 53)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesPesadasRS, "GraficoRACUnidadesAvesPesadasRS", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas RS/SC/SP')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACUnidadesAvesPesadasRS, setresponseGraficoRACUnidadesAvesPesadasRS, 54)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesPesadasRS, "GraficoRACProblemasAvesPesadasRS", [" where Tipo = 'REAL' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData))  and [Regional (Qualidade)] in ('Aves Pesadas RS/SC/SP')  AND [Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "], setGraficoRACProblemasAvesPesadasRS, setresponseGraficoRACProblemasAvesPesadasRS, 55)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesAvesLeves, "GraficoRACUnidadesAvesLeves", [' where Tipo = \'REAL\' and [Regional (Qualidade)] like \'%Aves Leves%\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves, 34)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasAvesLeves, "GraficoRACProblemasAvesLeves", [' where Tipo = \'REAL\' and [Regional (Qualidade)] like \'%Aves Leves%\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves, 35)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesSuinos, "GraficoRACUnidadesSuinos", [' where Tipo = \'REAL\' and [Regional (Qualidade)] like \'%Su%nos%\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos, 36)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasSuinos, "GraficoRACProblemasSuinos", [' where Tipo = \'REAL\' and [Regional (Qualidade)] like \'%Su%nos%\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Origem_do_Problema_rac] in (\'DOCUMENTAÇÃO UNIDADE\', \'EXPEDIÇÃO FÁBRICA\', \'FÁBRICA PRODUÇÃO\', \'Fabricação/ Produção\', \'FABRICACAO/FABRICA\', \'FÁBRICA PRODUÇÃO FFO\', \'EXPEDIÇÃO FÁBRICA FFO\') '], setGraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos, 37)

        chamarAPI("RACUnicoUnidade", GraficoRACUnidadesPreparados, "GraficoRACUnidadesPreparados", [whereRACPreparados + " and Tipo = \'REAL\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) "], setGraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados, 38)                                                                    // 6
        chamarAPI("RACUnicoProblema", GraficoRACProblemasPreparados, "GraficoRACProblemasPreparados", [whereRACPreparados + " and Tipo = \'REAL\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) "], setGraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados, 39)

        chamarAPI("RACIndicadores", GraficoRACME, "GraficoRACME", [" where mercado_rac = 'ME' "], setGraficoRACME, setresponseGraficoRACME, 40)
        chamarAPI("RACIndicadores", GraficoRACMI, "GraficoRACMI", [" where mercado_rac IN ('MI', 'INTERNO') and Unidade not in ('AVANTI','Dan Vigor', 'EIRELI ME', 'ITAJAI ÓLEO COMENSTÍVEL','Marba','Massatake','Santa Cruz do Sul','Vigor')  "], setGraficoRACMI, setresponseGraficoRACMI, 41)


        /////////////////////

        //FFO
        chamarAPI("RACIndicadores", GraficoRACDetalhesFFO, "GraficoRACDetalhesFFO", [" where 1=1 AND [Origem da RAC]  IN ('Documentação Unidade', 'EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','PRODUÇÃO EM TERCEIRO') AND [TIPO_ATENDIMENTO_RAC] IN ('RECLAMAÇÃO FFO') "] , setGraficoRACDetalhesFFO, setresponseGraficoRACDetalhesFFO, 52) 

        //Atendimento Comercial
        chamarAPI("RACIndicadores", GraficoRACDetalhesAC, "GraficoRACDetalhesAC", [" WHERE 1=1 AND [Origem da RAC]  IN ('ATENDIMENTO COMERCIAL') AND ( [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRÍTICA', 'NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO', 'RAC CAIXA', 'RAC COMPLEMENTAR') OR [TIPO_ATENDIMENTO_RAC] IS NULL)"] , setGraficoRACDetalhesAC, setresponseGraficoRACDetalhesAC, 53)

        //Logística Exportação
        chamarAPI("RACIndicadores", GraficoRACDetalhesLogME, "GraficoRACDetalhesLogME", [" WHERE 1=1 AND [Origem da RAC]  IN ('LOGÍSTICA EXPORTAÇÃO') AND ( [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRÍTICA', 'NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO', 'RAC CAIXA', 'RAC COMPLEMENTAR') OR [TIPO_ATENDIMENTO_RAC] IS NULL) "] , setGraficoRACDetalhesLogME, setresponseGraficoRACDetalhesLogME, 54)

        //Logística Importação
        chamarAPI("RACIndicadoresSemFiltro2", GraficoRACDetalhesLogMI, "GraficoRACDetalhesLogMI", [" WHERE 1=1  AND [Origem]  IN ('LOGÍSTICA MI', 'LOGÍSTICA CD')  and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) and (Unidade NOT IN ('Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','AVANTI','Serviços','Shipping') OR Unidade IS NULL) "] , setGraficoRACDetalhesLogMI, setresponseGraficoRACDetalhesLogMI, 55)

        //Documentação
        chamarAPI("RACIndicadores", GraficoRACDetalhesDoc, "GraficoRACDetalhesDoc", [" WHERE 1=1 AND [Origem da RAC]  IN ('DOCUMENTAÇÃO CORPORATIVO') AND ( [TIPO_ATENDIMENTO_RAC] NOT IN ('NEGOCIAÇÃO COMERCIAL', 'OBRIGAÇÃO','RAC COMPLEMENTAR') OR [TIPO_ATENDIMENTO_RAC] IS NULL) "] , setGraficoRACDetalhesDoc, setresponseGraficoRACDetalhesDoc, 56)

        //Transporte Terrestre
        chamarAPI("RACIndicadoresSemFiltro2", GraficoRACDetalhesTT, "GraficoRACDetalhesTT", [" WHERE 1=1  AND [Origem]  IN ('TRANSPORTE TERRESTRE')  and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL)  "] , setGraficoRACDetalhesTT, setresponseGraficoRACDetalhesTT, 57)

        //Produção em Terceiro (ex. Massatake)
        chamarAPI("RACIndicadoresSemFiltro2", GraficoRACDetalhesTerceiro, "GraficoRACDetalhesTerceiro", [" WHERE 1=1  AND [Origem]  IN ('PRODUÇÃO EM TERCEIRO')  and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) and (Unidade NOT IN ('Dan Vigor','Massatake','Vigor','ITAJAI ÓLEO COMESTÍVEIS') )  "] , setGraficoRACDetalhesTerceiro, setresponseGraficoRACDetalhesTerceiro, 58)

        //Massatake
        chamarAPI("RACIndicadoresSemFiltro", GraficoRACDetalhesMassatake, "GraficoRACDetalhesMassatake", [" WHERE 1=1 AND [Origem da RAC]  IN ('PRODUÇÃO EM TERCEIRO') AND UNIDADE IN ('MASSATAKE') AND  [TIPO_ATENDIMENTO_RAC] IN ('RECLAMAÇÃO') "] , setGraficoRACDetalhesMassatake, setresponseGraficoRACDetalhesMassatake, 59)

        //PDV
        chamarAPI("RACIndicadoresSemFiltro2", GraficoRACDetalhesPDV, "GraficoRACDetalhesPDV", [" WHERE 1=1 AND [Origem]  IN ('ABUSO DE PRODUTO PDV') and (Tipo_Atendimento_rac NOT IN ('ALERTA',  'Crítica') OR Tipo_Atendimento_rac IS NULL)  and (Unidade NOT IN ('ITAJAI ÓLEO COMESTÍVEIS','ITAJAI AVES PESADAS', 'Massatake', 'Dan Vigor','GRANO ALIMENTOS S.A.','Marba','Santa Cruz do Sul','Vigor', 'VARZEA GRANDE - CD'	) )         "] , setGraficoRACDetalhesPDV, setresponseGraficoRACDetalhesPDV, 60)
        chamarAPI("RACUnicoProblema", GraficoRACDetalhesAberturaPDV, "GraficoRACDetalhesAberturaPDV", [" WHERE 1=1 AND [Origem da RAC] IN ('ABUSO DE PRODUTO PDV') AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR')  AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') AND Mês = month((select * from v_maiorData)) AND Ano = year((select * from v_maiorData)) "] , setGraficoRACDetalhesAberturaPDV, setresponseGraficoRACDetalhesAberturaPDV, 61)
       
        //RAC Crítica RACIndicadoresSemFiltro
        chamarAPI("RACIndicadoresSemFiltro2", GraficoRACDetalhesCritica, "GraficoRACDetalhesCritica", [" WHERE 1=1 AND [Origem] NOT IN ('ABUSO DE PRODUTO HOME','LOGÍSTICA MI','SERVICO') AND  (Unidade NOT IN ('ITAJAI ÓLEO COMESTÍVEIS','ITAJAI PESCADOS', 'Massatake', 'Dan Vigor','Marba','Vigor', 'NORONHA', 'RIBEIRÃO PRETO - CD', 'Serviços', 'Shipping'	) )  AND [TIPO_ATENDIMENTO_RAC] IN ('CRÍTICA') "] , setGraficoRACDetalhesCritica, setresponseGraficoRACDetalhesCritica, 62)

        
        var whereLinhaEspecial = " where 1 = 1 "
                 + " and [Marca] IN ('SEARA GOURMET', 'SEARA NATURE', 'SEARA INCRIVEL', 'SEARA ROTISSERIE') 		"

        //RAC Linhas Especiais (Seara Nature, Gourmet, Incrível)
        chamarAPI("RACIndicadores", GraficoRACDetalhesEspeciais, "GraficoRACDetalhesEspeciais", [whereLinhaEspecial] , setGraficoRACDetalhesEspeciais, setresponseGraficoRACDetalhesEspeciais, 63)

        //RAC Corpo Estanho - [Totais]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCE, "GraficoRACDetalhesCE", [" WHERE 1=1 AND [Origem da RAC] IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO') AND  [TIPO CE] IN ('INERENTE','NÃO INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCE, setresponseGraficoRACDetalhesCE, 64)

        //RAC Corpo Estanho - [Inerente]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCEInerente, "GraficoRACDetalhesCEInerente", [" WHERE 1=1 AND [Origem da RAC] IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO') AND [TIPO CE] IN ('INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO','MORRO GRANDE') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCEInerente, setresponseGraficoRACDetalhesCEInerente, 65)

        //RAC Corpo Estanho - [Não Inerente]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCENaoInerente, "GraficoRACDetalhesCENaoInerente", [" WHERE 1=1 AND [Origem da RAC] IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO') AND [TIPO CE] IN ('NÃO INERENTE') AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','VERÍSSIMO','MORRO GRANDE') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "] , setGraficoRACDetalhesCENaoInerente, setresponseGraficoRACDetalhesCENaoInerente, 66)

        //RAC Corpo Estanho - [Plástico]
        chamarAPI("RACIndicadores", GraficoRACDetalhesCEPlastico, "GraficoRACDetalhesCEPlastico", [" WHERE 1=1 AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesCEPlastico, setresponseGraficoRACDetalhesCEPlastico, 67)

        //RAC Inseto
        chamarAPI("RACIndicadores", GraficoRACDetalhesInseto, "GraficoRACDetalhesInseto", [" WHERE 1=1 AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('AMAI','DAN VIGOR','MARBA','GRANO','GRIFFOOD','JBS','MASSATAKE','SANTA CRIZ DO SUL','SERYA','VIGOR','ITAJAI AVES PESADAS') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('INSETO') AND [SUB TIPO PROBLEMA] NOT IN ('LARVA') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesInseto, setresponseGraficoRACDetalhesInseto, 68)

        //RAC Cabelo
        chamarAPI("RACIndicadores", GraficoRACDetalhesCabelo, "GraficoRACDetalhesCabelo", [" WHERE 1=1 AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('AMAI','DAN VIGOR','MARBA','GRANO','GRIFFOOD','JBS','MASSATAKE','SANTA CRIZ DO SUL','SERYA','VIGOR') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [TIPO DO PROBLEMA] LIKE '%CABELO%' AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesCabelo, setresponseGraficoRACDetalhesCabelo, 69)

        //RAC Plastico
        chamarAPI("RACIndicadores", GraficoRACDetalhesPlastico, "GraficoRACDetalhesPlastico", [" WHERE 1=1 AND [GRUPO] IN ('CORPO ESTRANHO') AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') AND [TIPO DO PROBLEMA] IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesPlastico, setresponseGraficoRACDetalhesPlastico,70)

        //RAC Metal
        chamarAPI("RACIndicadores", GraficoRACDetalhesMetal, "GraficoRACDetalhesMetal", [" WHERE 1=1 AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR')  AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [PROBLEMA] IN ('METAL','METÁLICO') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesMetal, setresponseGraficoRACDetalhesMetal,71)

        //RAC Intoxicação
        chamarAPI("RACIndicadores", GraficoRACDetalhesIntoxicacao, "GraficoRACDetalhesIntoxicacao", [" WHERE 1=1 AND UNIDADE NOT IN ('HORTUS','JBS','MASSATAKE','VIGOR') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') AND [PROBLEMA] IN ('INTOXICAÇÃO ALIMENTAR') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesIntoxicacao, setresponseGraficoRACDetalhesIntoxicacao,72)

        //RAC Larva
        chamarAPI("RACIndicadores", GraficoRACDetalhesLarva, "GraficoRACDetalhesLarva", [" WHERE 1=1 AND [GRUPO] IN ('CORPO ESTRANHO') AND [REGIONAL (Qualidade)] NOT IN ('FATIADOS','PESCADOS','AVES PR','AVES RS/SC/SP','AVES SP/CO/NE') AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR','ARTES GRÁFICAS','CAMPINAS-CD','CAMPO VERDE','CD RIBEIRÃO DAS NEVES','CPO','DOC INDUSTRIA','EIRELI EPP','EIRELI ME','EXCELSIOR','GENESEAS AQUACULTURA','GERÊNCIA NACIONA FS','GRANO ALIMENTOS S.A.','GRIFFOOD','ICOFORT','ITAJAI','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','ITAJAI PESCADOS','LABREZZA','M P FOODS','MARBA','MASSAS SANTA ENERSTINA LTDA','NORONHA', 'OUTROS','PINHAIS - CD','QUALIDADE SUPPLY CHAIN','RIBEIRÃO PRETO – CD','SALVADOR – CD','SAO PAULO – CD','SEARA MEATS','SOMAVE','VARZEA GRANDE – CD') AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO') AND [PROBLEMA] IN ('INSETO','INSETO VIVO') AND [TIPO DO PROBLEMA] IN ('INSETO','LARVA', 'INSETO VIVO','LARVA VIVA')	 AND [SUB TIPO PROBLEMA] IN ('LARVA','LARVA VIVA') AND ([Origem da RAC] IN ('FABRICAÇÃO')) "] , setGraficoRACDetalhesLarva, setresponseGraficoRACDetalhesLarva,73)

        //NNC Log
        chamarAPI("NCCLOG", GraficoNNCLogDetalhesTotal, "GraficoNNCLogDetalhesTotal", [" where 1=1 and [Regional (Qualidade)] not in ('Logística','Outros','Terceiro') and ([Área Responsável] not in ('RASTREABILIDADE HUB') OR [Área Responsável] IS NULL) "] , setGraficoNNCLogDetalhesTotal, setresponseGraficoNNCLogDetalhesTotal,74)
        chamarAPI("NCCLOG", GraficoNNCLogDetalhesAves, "GraficoNNCLogDetalhesAves", [" where [Regional (Qualidade)] not in ('Logística','Outros','Terceiro') and ([Área Responsável] not in ('RASTREABILIDADE HUB') OR [Área Responsável] IS NULL) AND FORNECEDOR IN ('AMPARO AVES',			'BRASILIA',	'CAARAPO AVES',	'CAMPO MOURAO AVES',	'CAXIAS DO SUL',			'FORQUILHINHA AVES',	'GARIBALDI AVES',	'GUAPIACU AVES',	'IPUMIRIM AVES',	'ITAIOPOLIS AVES',	'ITAPETININGA AVES',	'ITAPIRANGA AVES',		'JACAREZINHO AVES',	'JAGUAPITA AVES',				'LAPA AVES',	'MONTENEGRO',	'NOVA VENEZA AVES',	'NUPORANGA - SP ',	'NUPORANGA AVES',		'PASSO FUNDO',	'PASSOS AVES',			'ROLANDIA',		'SANTA FE AVES',	'SANTO INACIO AVES',	'SAO JOSE AVES',		'SEARA AVES',	'SEARA SUI/ IND',		'SIDROLANDIA AVES',	'TANGARA DA SERRA',		'TRINDADE DO SUL',	'UBERABA AVES', 'SAO GONCALO DOS CAMPOS AVES')"] , setGraficoNNCLogDetalhesAves, setresponseGraficoNNCLogDetalhesAves,75)
        chamarAPI("NCCLOG", GraficoNNCLogDetalhesPreparados, "GraficoNNCLogDetalhesPreparados", [" where [Regional (Qualidade)] not in ('Logística','Outros','Terceiro') and ([Área Responsável] not in ('RASTREABILIDADE HUB') OR [Área Responsável] IS NULL) AND FORNECEDOR IN ('ANA RECH',	'BOM RETIRO DO SUL SUI/ IND',	'BRASILIA',			'DOURADOS SUI/ IND',	'DUQUE DE CAXIAS SUI/ IND',						'ITAPIRANGA AVES',				'JAGUARIUNA SUI/ IND',	'JUNDIAI SUI/ IND',	'LAGES SUI/ IND',		'MONTENEGRO',				'OSASCO SUI/ IND',			'RIO GRANDE DA SERRA',	'ROCA SALES',		'SALTO VELOSO AVES',					'SEARA AVES',	'SEARA SUI/ IND',	'TRES PASSOS SUI/ IND',        'SAO GONCALO DOS CAMPOS AVES', 'ITAPIRANGA') "] , setGraficoNNCLogDetalhesPreparados, setresponseGraficoNNCLogDetalhesPreparados,76)
        chamarAPI("NCCLOG", GraficoNNCLogDetalhesSuinos, "GraficoNNCLogDetalhesSuinos", [" where [Regional (Qualidade)] not in ('Logística','Outros','Terceiro') and ([Área Responsável] not in ('RASTREABILIDADE HUB') OR [Área Responsável] IS NULL) AND FORNECEDOR IN ('ANA RECH',	'CARAMBEI',	'DOURADOS SUI/ IND',	'ITAPIRANGA SUI/ IND',	'SAO MIGUEL DO OESTE',	'SEARA AVES',	'SEARA SUI/ IND',	'SEBERI',	'TRES PASSOS SUI/ IND', 'FREDERICO WESTPHALEN')"] , setGraficoNNCLogDetalhesSuinos, setresponseGraficoNNCLogDetalhesSuinos,77)

        //NNC MP
        chamarAPI("NCCMP", GraficoNNCAvesPesadas, "GraficoNNCAvesPesadas", [" where [Reg. Qual] like '%Aves%Pe%' "], setGraficoNNCAvesPesadas, setresponseGraficoNNCAvesPesadas, 78)
        chamarAPI("NCCMPUnidade", GraficoNNCAvesPesadasUnidades, "GraficoNNCAvesPesadasUnidades", [ " where [Reg. Qual] like '%Aves%Pe%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesPesadasUnidades, setresponseGraficoNNCAvesPesadasUnidades, 79)
        chamarAPI("NCCMPProblema", GraficoNNCAvesPesadasProblemas, "GraficoNNCAvesPesadasProblemas", [ " where [Reg. Qual] like '%Aves%Pe%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesPesadasProblemas, setresponseGraficoNNCAvesPesadasProblemas, 80)

        chamarAPI("NCCMP", GraficoNNCAvesRS, "GraficoNNCAvesRS", [" where [Reg. Qual] like '%Aves Pesadas RS/SC/SP%' "], setGraficoNNCAvesRS, setresponseGraficoNNCAvesRS, 81)
        chamarAPI("NCCMPUnidade", GraficoNNCAvesRSUnidades, "GraficoNNCAvesRSUnidades", [" where [Reg. Qual] like '%Aves Pesadas RS/SC/SP%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesRSUnidades, setresponseGraficoNNCAvesRSUnidades, 82)
        chamarAPI("NCCMPProblema", GraficoNNCAvesRSProblemas, "GraficoNNCAvesRSProblemas", [" where [Reg. Qual] like '%Aves Pesadas RS/SC/SP%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesRSProblemas, setresponseGraficoNNCAvesRSProblemas, 83)

        chamarAPI("NCCMP", GraficoNNCAvesSP, "GraficoNNCAvesSP", [" where [Reg. Qual] like '%Aves Pesadas SP/CO/NE%' "], setGraficoNNCAvesSP, setresponseGraficoNNCAvesSP, 84)
        chamarAPI("NCCMPUnidade", GraficoNNCAvesSPUnidades, "GraficoNNCAvesSPUnidades", [" where [Reg. Qual] like '%Aves Pesadas SP/CO/NE%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesSPUnidades, setresponseGraficoNNCAvesSPUnidades, 85)
        chamarAPI("NCCMPProblema", GraficoNNCAvesSPProblemas, "GraficoNNCAvesSPProblemas", [" where [Reg. Qual] like '%Aves Pesadas SP/CO/NE%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesSPProblemas, setresponseGraficoNNCAvesSPProblemas, 86)

        chamarAPI("NCCMP", GraficoNNCAvesPR, "GraficoNNCAvesPR", [" where [Reg. Qual] like '%Aves Pesadas PR%' "], setGraficoNNCAvesPR, setresponseGraficoNNCAvesPR, 87)
        chamarAPI("NCCMPUnidade", GraficoNNCAvesPRUnidades, "GraficoNNCAvesPRUnidades", [" where [Reg. Qual] like '%Aves Pesadas PR%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesPRUnidades, setresponseGraficoNNCAvesPRUnidades, 88)
        chamarAPI("NCCMPProblema", GraficoNNCAvesPRProblemas, "GraficoNNCAvesPRProblemas", [" where [Reg. Qual] like '%Aves Pesadas PR%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesPRProblemas, setresponseGraficoNNCAvesPRProblemas, 89)

        chamarAPI("NCCMP", GraficoNNCAvesLeves, "GraficoNNCAvesLeves", [" where [Reg. Qual] like '%Aves Leves%' "], setGraficoNNCAvesLeves, setresponseGraficoNNCAvesLeves, 90)
        chamarAPI("NCCMPUnidade", GraficoNNCAvesLevesUnidades, "GraficoNNCAvesLevesUnidades", [" where [Reg. Qual] like '%Aves Leves%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesLevesUnidades, setresponseGraficoNNCAvesLevesUnidades, 91)
        chamarAPI("NCCMPProblema", GraficoNNCAvesLevesProblemas, "GraficoNNCAvesLevesProblemas", [" where [Reg. Qual] like '%Aves Leves%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCAvesLevesProblemas, setresponseGraficoNNCAvesLevesProblemas, 92)

        chamarAPI("NCCMP", GraficoNNCSuinos, "GraficoNNCSuinos", [" where [Reg. Qual] like '%Suínos%' "], setGraficoNNCSuinos, setresponseGraficoNNCSuinos, 93)
        chamarAPI("NCCMPUnidade", GraficoNNCSuinosUnidades, "GraficoNNCSuinosUnidades", [" where [Reg. Qual] like '%Suínos%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCSuinosUnidades, setresponseGraficoNNCSuinosUnidades, 94)
        chamarAPI("NCCMPProblema", GraficoNNCSuinosProblemas, "GraficoNNCSuinosProblemas", [" where [Reg. Qual] like '%Suínos%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCSuinosProblemas, setresponseGraficoNNCSuinosProblemas, 95)

        chamarAPI("NCCMP", GraficoNNCPreparados, "GraficoNNCPreparados", [" where [Reg. Qual] like '%Preparados%' "], setGraficoNNCPreparados, setresponseGraficoNNCPreparados, 96)
        chamarAPI("NCCMPUnidade", GraficoNNCPreparadosUnidades, "GraficoNNCPreparadosUnidades", [" where [Reg. Qual] like '%Preparados%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCPreparadosUnidades, setresponseGraficoNNCPreparadosUnidades, 97)
        chamarAPI("NCCMPProblema", GraficoNNCPreparadosProblemas, "GraficoNNCPreparadosProblemas", [" where [Reg. Qual] like '%Preparados%' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) and [Entra para a Meta] = 'Sim' And  [Grupo Problema.] NOT IN ('Distrib/ Logística_Serviços','Embalagem Secundária') "], setGraficoNNCPreparadosProblemas, setresponseGraficoNNCPreparadosProblemas, 98)
        
        chamarAPI("NCCMP", GraficoNNCCETotal, "GraficoNNCCETotal", [" WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' "], setGraficoNNCCETotal, setresponseGraficoNNCCETotal, 99)
        chamarAPI("NCCMP", GraficoNNCCEInerente, "GraficoNNCCEInerente", ["  WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo CE] = 'Inerente' "], setGraficoNNCCEInerente, setresponseGraficoNNCCEInerente, 100)
        chamarAPI("NCCMP", GraficoNNCCENaoInerente, "GraficoNNCCENaoInerente", ["  WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo CE] = 'Não Inerente' "], setGraficoNNCCENaoInerente, setresponseGraficoNNCCENaoInerente, 101)
        chamarAPI("NCCMP", GraficoNNCCEOssos, "GraficoNNCCEOssos", ["  WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo Problema] = 'Ossos' "], setGraficoNNCCEOssos, setresponseGraficoNNCCEOssos, 102)
        chamarAPI("NCCMP", GraficoNNCCEPlastico, "GraficoNNCCEPlastico", ["  WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo Problema] in ('Borracha','Luva Latex','Luva Nitrilica','Plástico duro','Plástico mole - Resíduo') "], setGraficoNNCCEPlastico, setresponseGraficoNNCCEPlastico, 103)
        chamarAPI("NCCMP", GraficoNNCCEMetal, "GraficoNNCCEMetal", ["  WHERE [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' and ( [Grupo Problema.] = 'Corpo Estranho_ Metalico' or [Tipo Problema] in ('Luva anti corte') ) "], setGraficoNNCCEMetal, setresponseGraficoNNCCEMetal, 104)
        
            
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

                case 'RACIndicadoresSemFiltro2':

                    api.getSearaBaseRacIndicadoresSemFiltro2(parametros).then((response) => {
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

            case 'NCCMPUnidade':

                api.getSearaBaseNCCMPUnidade(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    callbackChamarAPI(apiNome)
                    return response
                }).catch(err => {
                    console.log(err);
                });
                break

            case 'NCCMPProblema':

                api.getSearaBaseNCCMPProblema(parametros).then((response) => {
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
            
            GerarGraficoHistoricoAnoAnterior(GraficoCETotal, setresponseGraficoCETotal, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCE, setresponseGraficoRACTotalCE, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRAC, setresponseGraficoRAC, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMP, setresponseGraficoNCCMP, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalAvesPesadasSP, setresponseGraficoCETotalAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEAvesPesadasSP, setresponseGraficoNNCMPTotalCEAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEAvesPesadasSP, setresponseGraficoRACTotalCEAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasSP, setresponseGraficoRACAvesPesadasSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPAvesPesadasSP, setresponseGraficoNCCMPAvesPesadasSP, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalAvesPesadasRS, setresponseGraficoCETotalAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEAvesPesadasRS, setresponseGraficoNNCMPTotalCEAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEAvesPesadasRS, setresponseGraficoRACTotalCEAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesPesadasRS, setresponseGraficoRACAvesPesadasRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPAvesPesadasRS, setresponseGraficoNCCMPAvesPesadasRS, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACAvesLeves, setresponseGraficoRACAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalSuinos, setresponseGraficoCETotalSuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACSuinos, setresponseGraficoRACSuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos, backgroundGradient, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoCETotalPreparados, setresponseGraficoCETotalPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoRACPreparados, setresponseGraficoRACPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnterior(GraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados, backgroundGradient, backgroundGradientCinza)

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
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesFFO, setresponseGraficoRACDetalhesFFO, backgroundGradient, backgroundGradientCinza)
            
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
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesMassatake, setresponseGraficoRACDetalhesMassatake, backgroundGradient, backgroundGradientCinza)
            
            //PDV
            GerarGraficoHistorico(GraficoRACDetalhesPDV, setresponseGraficoRACDetalhesPDV, backgroundGradient, backgroundGradientCinza)
            //Abertura PDV
            GerarGraficoBarras(GraficoRACDetalhesAberturaPDV, setresponseGraficoRACDetalhesAberturaPDV, backgroundGradientCinza, backgroundGradientCinza)
 
            //RAC Crítica
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCritica, setresponseGraficoRACDetalhesCritica, backgroundGradient, backgroundGradientCinza)

            //RAC Linhas Especiais (Seara Nature, Gourmet, Incrível)
            GerarGraficoHistorico(GraficoRACDetalhesEspeciais, setresponseGraficoRACDetalhesEspeciais, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Totais]
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCE, setresponseGraficoRACDetalhesCE, backgroundGradient, backgroundGradientCinza)
            
            //RAC Corpo Estanho - [Inerente]
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCEInerente, setresponseGraficoRACDetalhesCEInerente, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Não Inerente]
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCENaoInerente, setresponseGraficoRACDetalhesCENaoInerente, backgroundGradient, backgroundGradientCinza)

            //RAC Corpo Estanho - [Plástico]
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCEPlastico, setresponseGraficoRACDetalhesCEPlastico, backgroundGradient, backgroundGradientCinza)

            //RAC Inseto
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesInseto, setresponseGraficoRACDetalhesInseto, backgroundGradient, backgroundGradientCinza)

            //RAC Cabelo
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesCabelo, setresponseGraficoRACDetalhesCabelo, backgroundGradient, backgroundGradientCinza)

            //RAC Plastico
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesPlastico, setresponseGraficoRACDetalhesPlastico, backgroundGradient, backgroundGradientCinza)

            //RAC Metal
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesMetal, setresponseGraficoRACDetalhesMetal, backgroundGradient, backgroundGradientCinza)
            
            //RAC Intoxicação
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesIntoxicacao, setresponseGraficoRACDetalhesIntoxicacao, backgroundGradient, backgroundGradientCinza)

            //RAC Larva
            GerarGraficoHistoricoSemMeta(GraficoRACDetalhesLarva, setresponseGraficoRACDetalhesLarva, backgroundGradient, backgroundGradientCinza)

            // //NNC Log
            GerarGraficoHistorico(GraficoNNCLogDetalhesTotal, setresponseGraficoNNCLogDetalhesTotal, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNNCLogDetalhesAves, setresponseGraficoNNCLogDetalhesAves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNNCLogDetalhesPreparados, setresponseGraficoNNCLogDetalhesPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistorico(GraficoNNCLogDetalhesSuinos, setresponseGraficoNNCLogDetalhesSuinos, backgroundGradient, backgroundGradientCinza)

            // //NNC
            GerarGraficoHistoricoAnoAnterior(GraficoNNCAvesPesadas, setresponseGraficoNNCAvesPesadas, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesPesadasUnidades, setresponseGraficoNNCAvesPesadasUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesPesadasProblemas, setresponseGraficoNNCAvesPesadasProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCAvesRS, setresponseGraficoNNCAvesRS, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesRSUnidades, setresponseGraficoNNCAvesRSUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesRSProblemas, setresponseGraficoNNCAvesRSProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCAvesSP, setresponseGraficoNNCAvesSP, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesSPUnidades, setresponseGraficoNNCAvesSPUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesSPProblemas, setresponseGraficoNNCAvesSPProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCAvesPR, setresponseGraficoNNCAvesPR, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesPRUnidades, setresponseGraficoNNCAvesPRUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesPRProblemas, setresponseGraficoNNCAvesPRProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCAvesLeves, setresponseGraficoNNCAvesLeves, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesLevesUnidades, setresponseGraficoNNCAvesLevesUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCAvesLevesProblemas, setresponseGraficoNNCAvesLevesProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCSuinos, setresponseGraficoNNCSuinos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCSuinosUnidades, setresponseGraficoNNCSuinosUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCSuinosProblemas, setresponseGraficoNNCSuinosProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnterior(GraficoNNCPreparados, setresponseGraficoNNCPreparados, backgroundGradient, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCPreparadosUnidades, setresponseGraficoNNCPreparadosUnidades, backgroundGradientCinza)
            GerarGraficoBarras(GraficoNNCPreparadosProblemas, setresponseGraficoNNCPreparadosProblemas, backgroundGradientCinza)

            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCETotal, setresponseGraficoNNCCETotal, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCEInerente, setresponseGraficoNNCCEInerente, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCENaoInerente, setresponseGraficoNNCCENaoInerente, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCEOssos, setresponseGraficoNNCCEOssos, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCEPlastico, setresponseGraficoNNCCEPlastico, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoAnoAnteriorSemMeta(GraficoNNCCEMetal, setresponseGraficoNNCCEMetal, backgroundGradient, backgroundGradientCinza)


            


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
        let menorValorSerie = 200000

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

        //
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

    const GerarGraficoHistoricoAnoAnterior = (objeto, funcao, gradient, gradient2) => {

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
        //debugger
        xaxis.splice(0, 1) //tira 2019
        let yaxis = [{ name: 'Evolutivo 2020' }, { name: 'Evolutivo 2021' }, { name: 'Evolutivo Meta' }, { name: 'Meta' }, { name: '2020' }, { name: '2021' }, { name: 'forcast' }, { name: 'Média Diária' }];

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
        let menorValorSerie = 200000

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

            if (y.name == "2019") {
                console.log("Não entra neste relatório por ser 2019")
            } else {
                series.push(serie)
            }
            //series.push(serie)
        })

        //
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

    const GerarGraficoHistoricoAnoAnteriorSemMeta = (objeto, funcao, gradient, gradient2) => {

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
        //debugger
        xaxis.splice(0, 1) //tira 2019
        xaxis.splice(1, 1) //tira Meta
        let yaxis = [{ name: 'Evolutivo 2020' }, { name: 'Evolutivo 2021' }, { name: 'Evolutivo Meta' }, { name: 'Meta' }, { name: '2020' }, { name: '2021' }, { name: 'forcast' }, { name: 'Média Diária' }];

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
        let menorValorSerie = 200000

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

            if (y.name == "2019" || y.name == "Evolutivo Meta" || y.name == "Meta") {
                console.log("Não entra neste relatório por ser 2019 e Meta")
            } else {
                series.push(serie)
            }
            //series.push(serie)
        })

        //
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
        let menorValorSerie = 200000

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

        //
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

        ////

        let json = []

        for (let i = 0; i < TableRacME.length; i++) {
            json.push(TableRacME[i])
        }

        



        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable" id="tab1">
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

        ////

        let json = []

        for (let i = 0; i < TableRacFinalME.length; i++) {
            json.push(TableRacFinalME[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab2" stripedRows>
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

        ////

        let json = []

        for (let i = 0; i < TableRacFinalMI.length; i++) {
            json.push(TableRacFinalMI[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab3" stripedRows>
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

        ////

        let json = []

        for (let i = 0; i < TableRacFinalRECL.length; i++) {
            json.push(TableRacFinalRECL[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple" className="p-datatable-striped" id="tab3" stripedRows>
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

        ////

        let json = []

        for (let i = 0; i < TableRacFinalPDV.length; i++) {
            json.push(TableRacFinalPDV[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple"  className="p-datatable-striped" id="tab4" stripedRows>
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

        //

        let json = []

        for (let i = 0; i < TableRacFinalTE.length; i++) {
            json.push(TableRacFinalTE[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple"  className="p-datatable-striped" id="tab5" stripedRows>
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

        ////

        let json = []

        for (let i = 0; i < TableRacFinalCRIT.length; i++) {
            json.push(TableRacFinalCRIT[i])
        }



        return (
            <div>
                <div >
                    <DataTable value={json} sortMode="multiple"  className="p-datatable-striped" id="tab6" stripedRows>
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

        ////

        let json = []

        for (let i = 0; i < TableRACAberturaME.length; i++) {
            json.push(TableRACAberturaME[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clAberturaME">
                        <Column field="Mercado" header="Mercado Externo" headerStyle={{ width: '70%' }}></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaMEOrienteMedio = () => {

        if (!TableRacAberturaMEOrienteMedio) return;

        ////

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

        ////

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

        ////

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

        ////

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

        ////

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

    
    const DataTableRACAberturaLinhaEspecialFamilia = () => {

        if (!TableRacAberturaLinhaEspecialFamilia) return;

        ////

        let json = []

        for (let i = 0; i < TableRacAberturaLinhaEspecialFamilia.length; i++) {
            json.push(TableRacAberturaLinhaEspecialFamilia[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRACAberturaLinhaEspecialFamilia">
                        <Column field="CAMPO1" header="Linhas especiais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaLinhaEspecialAcumuladoGourmet = () => {

        if (!TableRacAberturaLinhaEspecialAcumuladoGourmet) return;

        ////

        let json = []

        for (let i = 0; i < TableRacAberturaLinhaEspecialAcumuladoGourmet.length; i++) {
            json.push(TableRacAberturaLinhaEspecialAcumuladoGourmet[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRACAberturaLinhaEspecialAcumuladoGourmet">
                        <Column field="CAMPO1" header="Linhas especiais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaLinhaEspecialAcumuladoIncrivel = () => {

        if (!TableRacAberturaLinhaEspecialAcumuladoIncrivel) return;

        ////

        let json = []

        for (let i = 0; i < TableRacAberturaLinhaEspecialAcumuladoIncrivel.length; i++) {
            json.push(TableRacAberturaLinhaEspecialAcumuladoIncrivel[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRACAberturaLinhaEspecialAcumuladoIncrivel">
                        <Column field="CAMPO1" header="Linhas especiais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaLinhaEspecialAcumuladoNature = () => {

        if (!TableRacAberturaLinhaEspecialAcumuladoNature) return;

        ////

        let json = []

        for (let i = 0; i < TableRacAberturaLinhaEspecialAcumuladoNature.length; i++) {
            json.push(TableRacAberturaLinhaEspecialAcumuladoNature[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRACAberturaLinhaEspecialAcumuladoNature">
                        <Column field="CAMPO1" header="Linhas especiais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    const DataTableRACAberturaLinhaEspecialAcumuladoRotisserie = () => {

        if (!TableRacAberturaLinhaEspecialAcumuladoRotisserie) return;

        ////

        let json = []

        for (let i = 0; i < TableRacAberturaLinhaEspecialAcumuladoRotisserie.length; i++) {
            json.push(TableRacAberturaLinhaEspecialAcumuladoRotisserie[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRACAberturaLinhaEspecialAcumuladoRotisserie">
                        <Column field="CAMPO1" header="Linhas especiais" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );


    }

    

    const DataTableNNCMPCEOssos = () => {

        if (!TableNNCMPCEOssos) return;

        ////

        let json = []

        for (let i = 0; i < TableNNCMPCEOssos.length; i++) {
            json.push(TableNNCMPCEOssos[i])
        }

        var retorno = percorrerJson(TableNNCMPCEOssos[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPCEOssos">
                        {retorno}
                    </DataTable>
                </div>
            </div>
        );
    }

    const DataTableNNCMPCEOssosFornecedor = () => {

        if (!TableNNCMPCEOssosFornecedor) return;

        ////

        let json = []

        for (let i = 0; i < TableNNCMPCEOssosFornecedor.length; i++) {
            json.push(TableNNCMPCEOssosFornecedor[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPCEOssosFornecedor">
                        <Column field="CAMPO1" header="Corpo Estranho OssosFornecedor" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
                    </DataTable>
                </div>
            </div>
        );
    }

    const DataTableNNCMPCEOssosUnidadesReclamantes = () => {

        if (!TableNNCMPCEOssosUnidadesReclamantes) return;

        ////

        let json = []

        for (let i = 0; i < TableNNCMPCEOssosUnidadesReclamantes.length; i++) {
            json.push(TableNNCMPCEOssosUnidadesReclamantes[i])
        }

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPCEOssosUnidadesReclamantes">
                        <Column field="CAMPO1" header="Corpo Estranho Ossos Unidades Reclamantes" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
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
                    rows.push(<Column field={key} header={key.replaceAll("|","")} headerStyle={{ width: '20%' }}></Column>);
                }else{
                    rows.push(<Column field={key} header={key.replaceAll("|","")}></Column>);
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
                        rows.push(<Column field={key2} header={key2.replaceAll("|","")} name='linha' headerStyle={{ width: '70%' }}></Column>);
                    }else{
                        rows.push(<Column field={key2} header={key2.replaceAll("|","")} name='linha'></Column>);
                    }
                    i++
                }
            });
        }

        return rows;
        
    }

    function percorrerJsonHabilitador(obj){    

        var rows = [];
        var j = 0;
        for (var key in obj) { // obtém as chaves do objeto
            // se o valor for diferente de objeto (caso events)
            if (typeof obj[key] !== 'object') {
                if (j == 0){
                    rows.push(<Column field={key} header={key.replaceAll("|","")} headerStyle={{ width: '20%' }}></Column>);
                }else{
                    rows.push(<Column field={key} header={key.replaceAll("|","")}></Column>);
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
                        rows.push(<Column field={key2} header={key2.replaceAll("|","")} name='linha' headerStyle={{ width: '70%' }}></Column>);
                    }else{
                        rows.push(<Column field={key2} header={key2.replaceAll("|","")} name='linha'></Column>);
                    }
                    i++
                }
            });
        }

        return rows;
        
    }

    const DataTableRacRACDetalhesTerceiro = () => {

        if (!TableRacRACDetalhesTerceiro) return;

        //

        let json = []

        for (let i = 0; i < TableRacRACDetalhesTerceiro.length; i++) {
            json.push(TableRacRACDetalhesTerceiro[i])
        }

        

        var retorno = percorrerJson(TableRacRACDetalhesTerceiro[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clAberturaTerceiro">
                    <Column field="Unidade" header="Abertura Terceiro" headerStyle={{ width: '70%' }}></Column>
                        <Column field="RAC" header="QTD"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesMetaRealAves = () => {

        if (!TableRacRACDetalhesMetaRealAves) return;

        //

        let json = []

        for (let i = 0; i < TableRacRACDetalhesMetaRealAves.length; i++) {
            json.push(TableRacRACDetalhesMetaRealAves[i])
        }

    
        let headerGroup = <ColumnGroup>
                            <Row>
                                <Column header="Meta x Real" rowSpan={2} />
                                <Column header="Orçamento" colSpan={2} />
                                <Column header="Real" colSpan={3} />
                                <Column header="Desvio" colSpan={2} />
                            </Row>    
                            <Row>
                               
                                <Column field="ORÇ JUN"  header="Mês" />
                                <Column field="ORÇ 2021"  header="Acumulado"  />
                                <Column field="REAL JUN"  header="Mês"  />
                                <Column field="FORCAST"  header="FORCAST"  />
                                <Column field="REAL 2021"  header="Acumulado"  />
                                <Column field="DESVIO MÊS"  header="Mês"  />
                                <Column field="DESVIO 2021"  header="Acumulado"  />
                            </Row>
                        </ColumnGroup>;

        return (
            <div>
                <div className="card">
                    <DataTable value={json} headerColumnGroup={headerGroup} className="p-datatable clTableRacRACDetalhesMetaRealAves">
                        <Column field="CAMPO1" header="Meta x Real" />
                        <Column field="ORÇ JUN" header="Mês" />
                        <Column field="ORÇ 2021" header="Acumulado"  />
                        <Column field="REAL JUN" header="Mês"  />
                        <Column field="FORCAST" header="FORCAST"  />
                        <Column field="REAL 2021" header="Acumulado"  />
                        <Column field="DESVIO MÊS" header="Mês"  />
                        <Column field="DESVIO 2021" header="Acumulado"  />
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesMetaRealPreparados = () => {

        if (!TableRacRACDetalhesMetaRealPreparados) return;

        //

        let json = []

        for (let i = 0; i < TableRacRACDetalhesMetaRealPreparados.length; i++) {
            json.push(TableRacRACDetalhesMetaRealPreparados[i])
        }

    
        let headerGroup = <ColumnGroup>
                            <Row>
                                <Column header="Meta x Real" rowSpan={2} />
                                <Column header="Orçamento" colSpan={2} />
                                <Column header="Real" colSpan={3} />
                                <Column header="Desvio" colSpan={2} />
                            </Row>    
                            <Row>
                               
                                <Column field="ORÇ JUN"  header="Mês" />
                                <Column field="ORÇ 2021"  header="Acumulado"  />
                                <Column field="REAL JUN"  header="Mês"  />
                                <Column field="FORCAST"  header="FORCAST"  />
                                <Column field="REAL 2021"  header="Acumulado"  />
                                <Column field="DESVIO MÊS"  header="Mês"  />
                                <Column field="DESVIO 2021"  header="Acumulado"  />
                            </Row>
                        </ColumnGroup>;

        return (
            <div>
                <div className="card">
                    <DataTable value={json} headerColumnGroup={headerGroup} className="p-datatable clTableRacRACDetalhesMetaRealPreparados">
                        <Column field="CAMPO1" header="Meta x Real" />
                        <Column field="ORÇ JUN" header="Mês" />
                        <Column field="ORÇ 2021" header="Acumulado"  />
                        <Column field="REAL JUN" header="Mês"  />
                        <Column field="FORCAST" header="FORCAST"  />
                        <Column field="REAL 2021" header="Acumulado"  />
                        <Column field="DESVIO MÊS" header="Mês"  />
                        <Column field="DESVIO 2021" header="Acumulado"  />
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacRACDetalhesMetaRealSuinos = () => {

        if (!TableRacRACDetalhesMetaRealSuinos) return;

        //

        let json = []

        for (let i = 0; i < TableRacRACDetalhesMetaRealSuinos.length; i++) {
            json.push(TableRacRACDetalhesMetaRealSuinos[i])
        }

        let headerGroup = <ColumnGroup>
            <Row>
                <Column header="Meta x Real" rowSpan={2} />
                <Column header="Orçamento" colSpan={2} />
                <Column header="Real" colSpan={3} />
                <Column header="Desvio" colSpan={2} />
            </Row>    
            <Row>
               
                <Column field="ORÇ JUN"  header="Mês" />
                <Column field="ORÇ 2021"  header="Acumulado"  />
                <Column field="REAL JUN"  header="Mês"  />
                <Column field="FORCAST"  header="FORCAST"  />
                <Column field="REAL 2021"  header="Acumulado"  />
                <Column field="DESVIO MÊS"  header="Mês"  />
                <Column field="DESVIO 2021"  header="Acumulado"  />
            </Row>
        </ColumnGroup>;

        return (
        <div>
        <div className="card">
            <DataTable value={json} headerColumnGroup={headerGroup} className="p-datatable clTableRacRACDetalhesMetaRealSuinos">
                <Column field="CAMPO1" header="Meta x Real" />
                <Column field="ORÇ JUN" header="Mês" />
                <Column field="ORÇ 2021" header="Acumulado"  />
                <Column field="REAL JUN" header="Mês"  />
                <Column field="FORCAST" header="FORCAST"  />
                <Column field="REAL 2021" header="Acumulado"  />
                <Column field="DESVIO MÊS" header="Mês"  />
                <Column field="DESVIO 2021" header="Acumulado"  />
            </DataTable>
        </div>
        </div>
        );
        
    }

    

    const DataTableRacCorposEstranhos = () => {

        if (!TableRacCorposEstranhos) return;

        //

        let json = []

        for (let i = 0; i < TableRacCorposEstranhos.length; i++) {
            json.push(TableRacCorposEstranhos[i])
        }

        var retorno = percorrerJson(TableRacCorposEstranhos[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacCorposEstranhos">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacCorposEstranhosInerentes = () => {

        if (!TableRacCorposEstranhosInerentes) return;

        //

        let json = []

        for (let i = 0; i < TableRacCorposEstranhosInerentes.length; i++) {
            json.push(TableRacCorposEstranhosInerentes[i])
        }

        var retorno = percorrerJson(TableRacCorposEstranhosInerentes[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacCorposEstranhosInerentes">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacCorposEstranhosInerentesNaoInerentes = () => {

        if (!TableRacCorposEstranhosInerentesNaoInerentes) return;

        //

        let json = []

        for (let i = 0; i < TableRacCorposEstranhosInerentesNaoInerentes.length; i++) {
            json.push(TableRacCorposEstranhosInerentesNaoInerentes[i])
        }

        var retorno = percorrerJson(TableRacCorposEstranhosInerentesNaoInerentes[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacCorposEstranhosInerentesNaoInerentes">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacCorposEstranhosNaoInerentes = () => {

        if (!TableRacCorposEstranhosNaoInerentes) return;

        //

        let json = []

        for (let i = 0; i < TableRacCorposEstranhosNaoInerentes.length; i++) {
            json.push(TableRacCorposEstranhosNaoInerentes[i])
        }

        var retorno = percorrerJson(TableRacCorposEstranhosNaoInerentes[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacCorposEstranhosNaoInerentes">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesPDV">
                        <Column field="CAMPO1" header="Abertura PDV" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    

    const DataTableRACD3INNATURA = () => {

        if (!TableRacRACD3InNatura) return;


        let json = []

        for (let i = 0; i < TableRacRACD3InNatura.length; i++) {
            json.push(TableRacRACD3InNatura[i])
        }

        var retorno = percorrerJson(TableRacRACD3InNatura[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACD3InNatura">
                        <Column field="CAMPO1" header="RAC D-3 - In-Natura" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRACD0INNATURA = () => {

        if (!TableRacRACD0InNatura) return;


        let json = []

        for (let i = 0; i < TableRacRACD0InNatura.length; i++) {
            json.push(TableRacRACD0InNatura[i])
        }

        var retorno = percorrerJson(TableRacRACD0InNatura[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACD0InNatura">
                        <Column field="CAMPO1" header="RAC D-0 - In-Natura" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRACD3Preparados = () => {

        if (!TableRacRACD3Preparados) return;


        let json = []

        for (let i = 0; i < TableRacRACD3Preparados.length; i++) {
            json.push(TableRacRACD3Preparados[i])
        }

        var retorno = percorrerJson(TableRacRACD3Preparados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACD3Preparados">
                        <Column field="CAMPO1" header="RAC D-3 - Preparados" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRACD0Preparados = () => {

        if (!TableRacRACD0Preparados) return;


        let json = []

        for (let i = 0; i < TableRacRACD0Preparados.length; i++) {
            json.push(TableRacRACD0Preparados[i])
        }

        var retorno = percorrerJson(TableRacRACD0Preparados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACD0Preparados">
                        <Column field="CAMPO1" header="RAC D-0 - Preparados" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCLogD3 = () => {

        if (!TableNNCLogD3) return;


        let json = []

        for (let i = 0; i < TableNNCLogD3.length; i++) {
            json.push(TableNNCLogD3[i])
        }

        var retorno = percorrerJson(TableNNCLogD3[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCLogD3">
                        <Column field="CAMPO1" header="NNC Log D-3" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCLogD0 = () => {

        if (!TableNNCLogD0) return;


        let json = []

        for (let i = 0; i < TableNNCLogD0.length; i++) {
            json.push(TableNNCLogD0[i])
        }

        var retorno = percorrerJson(TableNNCLogD0[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCLogD0">
                        <Column field="CAMPO1" header="NNC Log D-0" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    /////

    const DataTableNNCMPD3INNATURA = () => {

        if (!TableNNCMPD3InNatura) return;


        let json = []

        for (let i = 0; i < TableNNCMPD3InNatura.length; i++) {
            json.push(TableNNCMPD3InNatura[i])
        }

        var retorno = percorrerJson(TableNNCMPD3InNatura[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPD3InNatura">
                        <Column field="CAMPO1" header="NNC MP D-3 - In-Natura" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCMPD0INNATURA = () => {

        if (!TableNNCMPD0InNatura) return;


        let json = []

        for (let i = 0; i < TableNNCMPD0InNatura.length; i++) {
            json.push(TableNNCMPD0InNatura[i])
        }

        var retorno = percorrerJson(TableNNCMPD0InNatura[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPD0InNatura">
                        <Column field="CAMPO1" header="NNC MP D-0 - In-Natura" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCMPD3Preparados = () => {

        if (!TableNNCMPD3Preparados) return;


        let json = []

        for (let i = 0; i < TableNNCMPD3Preparados.length; i++) {
            json.push(TableNNCMPD3Preparados[i])
        }

        var retorno = percorrerJson(TableNNCMPD3Preparados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPD3Preparados">
                        <Column field="CAMPO1" header="NNC MP D-3 - Preparados" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCMPD0Preparados = () => {

        if (!TableNNCMPD0Preparados) return;


        let json = []

        for (let i = 0; i < TableNNCMPD0Preparados.length; i++) {
            json.push(TableNNCMPD0Preparados[i])
        }

        var retorno = percorrerJson(TableNNCMPD0Preparados[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCMPD0Preparados">
                        <Column field="CAMPO1" header="NNC MP D-0 - Preparados" headerStyle={{ width: '70%' }}></Column>
                        <Column field="NUM" header="Nº NNC MP"></Column>
                    </DataTable>
                </div>
            </div>
            );
        
    }

    ////

    
    const DataTableNNCEvolucaoMes = () => {

        if (!TableNNCEvolucaoMes) return;


        let json = []

        for (let i = 0; i < TableNNCEvolucaoMes.length; i++) {
            json.push(TableNNCEvolucaoMes[i])
        }

        var retorno = percorrerJson(TableNNCEvolucaoMes[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCEvolucaoMes">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCEvolucaoMesTotais = () => {

        if (!TableNNCEvolucaoMesTotais) return;


        let json = []

        for (let i = 0; i < TableNNCEvolucaoMesTotais.length; i++) {
            json.push(TableNNCEvolucaoMesTotais[i])
        }

        var retorno = percorrerJson(TableNNCEvolucaoMesTotais[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCEvolucaoMesTotais">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesCritica">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoTotal">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    

    const DataTableRacLarva = () => {

        if (!TableRacLarva) return;


        let json = []

        for (let i = 0; i < TableRacLarva.length; i++) {
            json.push(TableRacLarva[i])
        }

        var retorno = percorrerJson(TableRacLarva[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacLarva">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacIntoxicacao = () => {

        if (!TableRacIntoxicacao) return;


        let json = []

        for (let i = 0; i < TableRacIntoxicacao.length; i++) {
            json.push(TableRacIntoxicacao[i])
        }

        var retorno = percorrerJson(TableRacIntoxicacao[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacIntoxicacao">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacMetal = () => {

        if (!TableRacMetal) return;


        let json = []

        for (let i = 0; i < TableRacMetal.length; i++) {
            json.push(TableRacMetal[i])
        }

        var retorno = percorrerJson(TableRacMetal[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacMetal">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCCEPlastico = () => {

        if (!TableNNCCEPlastico) return;


        let json = []

        for (let i = 0; i < TableNNCCEPlastico.length; i++) {
            json.push(TableNNCCEPlastico[i])
        }

        var retorno = percorrerJson(TableNNCCEPlastico[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCCEPlastico">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCCEMetal = () => {

        if (!TableNNCCEMetal) return;


        let json = []

        for (let i = 0; i < TableNNCCEMetal.length; i++) {
            json.push(TableNNCCEMetal[i])
        }

        var retorno = percorrerJson(TableNNCCEMetal[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCCEMetal">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCCEOssos = () => {

        if (!TableNNCCEOssos) return;


        let json = []

        for (let i = 0; i < TableNNCCEOssos.length; i++) {
            json.push(TableNNCCEOssos[i])
        }

        var retorno = percorrerJson(TableNNCCEOssos[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCCEOssos">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCCE = () => {

        if (!TableNNCCE) return;


        let json = []

        for (let i = 0; i < TableNNCCE.length; i++) {
            json.push(TableNNCCE[i])
        }

        var retorno = percorrerJson(TableNNCCE[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCCE">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableHabilitadorCorposEstranhosNaoInerentes = () => {

        if (!TableHabilitadorCorposEstranhosNaoInerentes) return;


        let json = []

        for (let i = 0; i < TableHabilitadorCorposEstranhosNaoInerentes.length; i++) {
            json.push(TableHabilitadorCorposEstranhosNaoInerentes[i])
        }
        
        

        var retorno = percorrerJsonHabilitador(TableHabilitadorCorposEstranhosNaoInerentes[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableHabilitadorCorposEstranhosNaoInerentes">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableNNCCEInerenteNaoInerente = () => {

        if (!TableNNCCEInerenteNaoInerente) return;


        let json = []

        for (let i = 0; i < TableNNCCEInerenteNaoInerente.length; i++) {
            json.push(TableNNCCEInerenteNaoInerente[i])
        }

        

        var retorno = percorrerJson(TableNNCCEInerenteNaoInerente[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableNNCCEInerenteNaoInerente">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacPlastico = () => {

        if (!TableRacPlastico) return;


        let json = []

        for (let i = 0; i < TableRacPlastico.length; i++) {
            json.push(TableRacPlastico[i])
        }

        var retorno = percorrerJson(TableRacPlastico[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacPlastico">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacCabelo = () => {

        if (!TableRacCabelo) return;


        let json = []

        for (let i = 0; i < TableRacCabelo.length; i++) {
            json.push(TableRacCabelo[i])
        }

        var retorno = percorrerJson(TableRacCabelo[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacCabelo">
                        {retorno}
                    </DataTable>
                </div>
            </div>
            );
        
    }

    const DataTableRacInseto = () => {

        if (!TableRacInseto) return;


        let json = []

        for (let i = 0; i < TableRacInseto.length; i++) {
            json.push(TableRacInseto[i])
        }

        var retorno = percorrerJson(TableRacInseto[0])

        return (
            <div>
                <div className="card">
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacInseto">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoAves">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoPreparados">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoFatiados">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoPescados">
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
                    <DataTable value={json} sortMode="multiple" className="p-datatable clTableRacRACDetalhesEvolucaoSuinos">
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
                        <DataTable value={json} sortMode="multiple" className="p-datatable">
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
                setTimeout(arrumaTabela3niveis('clAberturaME'), 20000)
            })




            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac = 'YARA' AND Unidade NOT IN ('Serviços') "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEOrienteMedio(json)
                setTimeout(arrumaTabela3niveis('clOrienteMedio'), 20000)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + "  AND Especialista_rac IN ('Igor', 'Rejane') AND Unidade NOT IN ('Serviços')   "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEEuropa(json)
                setTimeout(arrumaTabela3niveis('clEuropa'), 20000)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Marcela') AND Unidade NOT IN ('Serviços')  "]).then((response) => {
                
                let json = JSON.parse(response.data)
                setTableRacAberturaMEJapao(json)
                setTimeout(arrumaTabela3niveis('clJapao'), 20000)
                          
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Amanda') AND Unidade NOT IN ('Serviços')  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAsia(json)
                setTimeout(arrumaTabela3niveis('clAsia'), 20000)
            })

            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Regina') AND Unidade NOT IN ('Serviços')  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAmericasAfrica(json)
                setTimeout(arrumaTabela3niveis('clAmericasAfrica'), 20000)
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
            + " AND UNIDADE NOT IN ('VIGOR','DAN VIGOR','AVANTI')		"																																								 
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
                //
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['grupo'];
                }

                setTableRacRACDetalhesTerceiro(json)
                setTimeout(arrumaTabela1nivel('clAberturaTerceiro'), 20000)
            })

            var sqlTableRacRACDetalhesPDV = ""
            + " SELECT																																							"
            + " Nm_Classe_rac CAMPO1																																			"
            + " , Tipo_Problema_rac CAMPO2																																		"
            + " , NULL CAMPO3																																			"
            + " , count(Rac_rac) as NUM																																			"
            + " INTO #RESULTADO 																																				"
            + " FROM [v_base_rac]																																				"
            + " WHERE 1=1																																						"
            + " AND month(Data_rac) = month((select * from v_maiorData)) AND year(Data_rac) = year((select * from v_maiorData))																									"
            + " AND [Origem_do_Problema_rac] IN ('ABUSO DE PRODUTO PDV')																										"
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR')	"
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA')																											"
            + " AND Tipo_rac = 'Real'																																			"
            + " GROUP BY Nm_Classe_rac, Tipo_Problema_rac																									"
            + "              																																					"			
            + " SELECT																																							"
            + " CAMPO1																																							"
            + " , SUM(NUM) NUM																																					"
            + " INTO #R1																																						"
            + " FROM #RESULTADO																																					"
            + " GROUP BY CAMPO1																																					"
            + " 																																								"
            + " SELECT																																							"
            + " CAMPO1																																							"
            + " , CAMPO2																																						"
            + " , SUM(NUM) NUM																																					"
            + " INTO #R2																																						"
            + " FROM #RESULTADO																																					"
            + " GROUP BY CAMPO1, CAMPO2																																			"
            + " 																																								"
            + " SELECT																																							"
            + " CAMPO1																																							"
            + " , CAMPO2																																						"
            + " , CAMPO3																																						"
            + " , SUM(NUM) NUM																																					"
            + " INTO #R3																																						"
            + " FROM #RESULTADO																																					"
            + " GROUP BY CAMPO1, CAMPO2, CAMPO3																																	"
            + " 																																								"
            + " SELECT																																							"
            + " GROUPING(B.CAMPO1) C1																																			"
            + " , GROUPING(B.CAMPO2) C2																																			"
            + " , GROUPING(B.CAMPO3) C3																																			"
            + " , CAST(B.CAMPO1 AS VARCHAR) AS CAMPO1_																																			"
            + " , CAST(B.CAMPO2 AS VARCHAR) AS CAMPO2																																						"
            + " , CAST(B.CAMPO3 AS VARCHAR) AS CAMPO3																																						"
            + " , SUM(NUM) NUM																																					"
            + " INTO #BASE																																						"
            + " FROM #RESULTADO B																																				"
            + " GROUP BY CAMPO1, CAMPO2, CAMPO3																																	"
            + " WITH ROLLUP													  																									"
            + " 																																								"
            + " 																																								"
            + " SELECT DISTINCT B.*																																				"
            + " , R1.NUM AS NUM1																																						"
            + " , R2.NUM AS NUM2																																						"
            + " , R3.NUM AS NUM3																																						"
            + " , CASE																																							"
            + " 	WHEN B.CAMPO3 IS NULL THEN																																	"
            + " 		CASE																																					"
            + " 			WHEN B.CAMPO2 IS NULL THEN 																															"
            + "                 CASE 																																			"
            + " 					WHEN B.CAMPO1_ IS NULL THEN																													"
            + " 					'<b>Total</b>'																																"
            + " 					ELSE '<b>'+B.CAMPO1_+'</b>'																													"
            + " 				END																																				"
            + " 			ELSE '@@.....'+B.CAMPO2																																"
            + " 		END																																						"
            + " 	ELSE '..........'+B.CAMPO3																																	"
            + "     END CAMPO1																																					"
            + " FROM #BASE B																																					"
            + " LEFT JOIN #R1 R1 ON B.CAMPO1_ = R1.CAMPO1																														"
            + " LEFT JOIN #R2 R2 ON B.CAMPO1_ = R2.CAMPO1 AND B.CAMPO2 = R2.CAMPO2																								"
            + " LEFT JOIN #R3 R3 ON B.CAMPO1_ = R3.CAMPO1 AND B.CAMPO2 = R3.CAMPO2 AND B.CAMPO3 = R3.CAMPO3																		"
            + " WHERE B.C3 = 1																																								"
            + " 																																								"
            + " ORDER BY 1, 8 DESC, 4, 2 DESC, 9 DESC, 5, 3 DESC, 10 DESC, 6																									"
            + " 																																								"
            + " DROP TABLE #RESULTADO																																			"
            + " DROP TABLE #R1																																					"
            + " DROP TABLE #R2																																					"
            + " DROP TABLE #R3																																					"
            + " DROP TABLE #BASE																																				"

            api.getSearaBaseSQLNINJA([ sqlTableRacRACDetalhesPDV ]).then((response) => {
                //
                let json = JSON.parse(response.data)                
                setTableRacRACDetalhesPDV(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesPDV'), 20000)

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
                //
                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['Total2'];
                }
                
                setTableRacRACDetalhesCritica(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesCritica'), 20000)
         
            })

            var sqlTableRacRACDetalhesEvolucaoTotal = ""
            + " SELECT																																																			"
            + " Origem Origem,																																																		"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTAL																																																		"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR','AVANTI','Santa Cruz do Sul','Serviços', 'Shipping', 'ITAJAÍ ÓLEO COMESTÍVEIS')             "
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO')            "
            + " AND Origem_do_Problema_rac NOT IN ('Abuso de Produto HOME') "
            + " AND Tipo_rac = 'Real' 																																															"
            + " GROUP BY Origem																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " 'Total' as Origem,																																															"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALFINAL																																																"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR','AVANTI','Santa Cruz do Sul','Serviços', 'Shipping', 'ITAJAÍ ÓLEO COMESTÍVEIS')             "
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO')            "
            + " AND Origem_do_Problema_rac NOT IN ('Abuso de Produto HOME')  																																															"
            + " GROUP BY Origem																																																"
            + " 																																																				"
            + " SELECT																																																			"
            + " sum(Quant_rac) Quant_rac																																														"
            + " INTO #TOTALF																																																	"
            + " FROM [v_base_rac]																																																"
            + " WHERE 1=1																																																		"
            + " AND month(Data_rac) = month((select * from v_maiorData))																																						"
            + " AND year(Data_rac) = year((select * from v_maiorData))																																							"
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR','AVANTI','Santa Cruz do Sul','Serviços', 'Shipping', 'ITAJAÍ ÓLEO COMESTÍVEIS')             "
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO')            "
            + " AND Origem_do_Problema_rac NOT IN ('Abuso de Produto HOME')  																																															"
             																																															
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
            + " AND UNIDADE NOT IN ('DAN VIGOR','MASSATAKE','MARBA','NORONHA','VIGOR','AVANTI','Santa Cruz do Sul','Serviços', 'Shipping', 'ITAJAÍ ÓLEO COMESTÍVEIS')             "
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO')            "
            + " AND Origem_do_Problema_rac NOT IN ('Abuso de Produto HOME')  																																															"
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
            + " + ' FROM (SELECT Origem Origem, [MES-DIA] as [MES-DIA], sum(Quant_rac) Quant_rac  ' +																																"
            + " '         from [v_base_rac] base with (nolock)  ' +																																								"
            + " 																																																				"
            + " 		' WHERE 1=1 ' +																																															"
            + "         ' AND month(Data_rac) = month((select * from v_maiorData))																																	' +			"
            + " 		' AND year(Data_rac) = year((select * from v_maiorData))																																	' +			"
            + " 		' AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') AND [TIPO_ATENDIMENTO_RAC] NOT IN (''ALERTA'',''CONCESSÃO'', ''CRITICA'',''CRÍTICA'',''ELOGIO'',''NEGOCIAÇÃO COMERCIAL'',''OBRIGAÇÃO'',''RAC CAIXA'',''RAC COMPLEMENTAR'',''RECOLHIMENTO'',''RECOLHIMENTO VOLUNTÁRIO'',''NOTIFICAÇÃO'') AND Origem_do_Problema_rac NOT IN (''Abuso de Produto HOME'')		' +			"
            + " 		' AND Tipo_rac = ''Real'' 																																									' +			"
            + " 																																																				"
            + "         ' GROUP BY Origem, [MES-DIA] '+      																																								"
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
            + " 		'  AND UNIDADE NOT IN (''DAN VIGOR'',''MASSATAKE'',''MARBA'',''NORONHA'',''VIGOR'') AND [TIPO_ATENDIMENTO_RAC] NOT IN (''ALERTA'',''CONCESSÃO'', ''CRITICA'',''CRÍTICA'',''ELOGIO'',''NEGOCIAÇÃO COMERCIAL'',''OBRIGAÇÃO'',''RAC CAIXA'',''RAC COMPLEMENTAR'',''RECOLHIMENTO'',''RECOLHIMENTO VOLUNTÁRIO'',''NOTIFICAÇÃO'') AND Origem_do_Problema_rac NOT IN (''Abuso de Produto HOME'')				' +			"
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
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoTotal'), 20000)

                
            })

			
            

            var wherePivotdataTableRacLarva = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            
            + "AND [Grupo_rac] IN ('CORPO ESTRANHO') "
            + "AND [Regional Qual] NOT IN ('FATIADOS','PESCADOS','AVES PR','AVES RS/SC/SP','AVES SP/CO/NE') "
            + "AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR','ARTES GRÁFICAS','CAMPINAS-CD','CAMPO VERDE','CD RIBEIRÃO DAS NEVES','CPO','DOC INDUSTRIA','EIRELI EPP','EIRELI ME','EXCELSIOR','GENESEAS AQUACULTURA','GERÊNCIA NACIONA FS','GRANO ALIMENTOS S.A.','GRIFFOOD','ICOFORT','ITAJAI','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','ITAJAI PESCADOS','LABREZZA','M P FOODS','MARBA','MASSAS SANTA ENERSTINA LTDA','NORONHA', 'OUTROS','PINHAIS - CD','QUALIDADE SUPPLY CHAIN','RIBEIRÃO PRETO – CD','SALVADOR – CD','SAO PAULO – CD','SEARA MEATS','SOMAVE','VARZEA GRANDE – CD') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO') "
            + "AND [PROBLEMA] IN ('INSETO','INSETO VIVO') "
            + "AND [Tipo_Problema] IN ('INSETO','LARVA', 'INSETO VIVO','LARVA VIVA')	 "
            + "AND [SUB TIPO PROBLEMA] IN ('LARVA','LARVA VIVA') "
            + " AND ([Origem] IN ('FABRICAÇÃO')) "


            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacLarva, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacLarva(json)
                setTimeout(arrumaTabela1nivel('clTableRacLarva'), 20000)
            })

            var wherePivotdataTableRacIntoxicacao = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "

            + "AND [REGIONAL QUAL] IN ('PREPARADOS 1','PREPARADOS 2','QUALIDADE','REGULATÓRIO','SUÍNOS','OUTROS','MARKETING E P&D','ITAJAÍ','EXCELSIOR','AVES LEVES') "
            + "AND UNIDADE NOT IN ('JBS') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO','NOTIFICAÇÃO') "
            + "AND [PROBLEMA] IN ('INTOXICAÇÃO ALIMENTAR') "


            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacIntoxicacao, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacIntoxicacao(json)
                setTimeout(arrumaTabela1nivel('clTableRacIntoxicacao'), 20000)
            })

            var wherePivotdataTableRacInseto = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "

            + "AND [ORIGEM] IN ('FABRICAÇÃO') "
            + "AND [GRUPO_rac] IN ('CORPO ESTRANHO') "
            + "AND UNIDADE NOT IN ('AMAI','DAN VIGOR','MARBA','GRANO','GRIFFOOD','JBS','MASSATAKE','SANTA CRIZ DO SUL','SERYA','VIGOR','ITAJAI AVES PESADAS') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "
            + "AND Tipo_Problema IN ('INSETO') "
            + "AND [SUB TIPO PROBLEMA] NOT IN ('LARVA') "
            + " AND ([Origem] IN ('FABRICAÇÃO')) "


            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacInseto, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacInseto(json)
                setTimeout(arrumaTabela1nivel('clTableRacInseto'), 20000)
            })

            var wherePivotdataTableRacCabelo = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            
            + "AND [Origem_do_problema_rac] IN ('FÁBRICA PRODUÇÃO') "
            + "AND [GRUPO_rac] IN ('CORPO ESTRANHO') "
            + "AND UNIDADE NOT IN ('AMAI','DAN VIGOR','MARBA','GRANO','GRIFFOOD','JBS','MASSATAKE','SANTA CRIZ DO SUL','SERYA','VIGOR','ITAJAI AVES PESADAS') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
            + "AND Tipo_Problema IN ('FIO DE CABELO / PÊLO HUMANO','FIO DE CABELO/PÊLO HUMANO', 'PÊLO/ CABELO') "


            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacCabelo, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacCabelo(json)
                setTimeout(arrumaTabela1nivel('clTableRacCabelo'), 20000)
            })

            
            var wherePivotdataTableRacPlastico = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            
            + " AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') "
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA', 'CRITICA','CRÍTICA','NEGOCIAÇÃO COMERCIAL','RAC COMPLEMENTAR') "
            + " AND [Tipo_Problema_rac] IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') "
            + " AND ([Origem] IN ('FABRICAÇÃO')) "

            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacPlastico, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacPlastico(json)
                setTimeout(arrumaTabela1nivel('clTableRacPlastico'), 20000)
            })

            
            var wherePivotdataTableNNCEvolucaoMes = ""
            + " WHERE 1=1 "
            + " and Tipo = 'REAL' "
            + " and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + " and month([Dt Abertura]) = (select month(data) as data from v_maiorData) " 
            + " and [Regional (Qualidade)] not in ('Logística','Outros','Terceiro') and ([Área Responsável] not in ('RASTREABILIDADE HUB') OR [Área Responsável] IS NULL)"
 
            api.getSearaBaseNNCLog1nivelPIVOTDIA([ wherePivotdataTableNNCEvolucaoMes, "Fornecedor as Coluna1, NULL as Coluna2, null as Coluna3", "Fornecedor", " [MES-DIA] ", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableNNCEvolucaoMes(json)
                setTimeout(arrumaTabela1nivel('clTableNNCEvolucaoMes'), 20000)
            })

            var wherePivotdataTableNNCEvolucaoMesTotais = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            
            + "AND [Origem_do_problema_rac] IN ('FÁBRICA PRODUÇÃO') "
            + "AND UNIDADE NOT IN ('MARBA','SANTA CRUZ DO SUL') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
            + "AND Tipo_Problema IN ('LUVA','LUVA NITRÍLICA','PLÁSTICO','PLÁSTICO DURO','PLÁSTICO MOLE') "


            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataTableNNCEvolucaoMesTotais, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableNNCEvolucaoMesTotais(json)
                setTimeout(arrumaTabela2niveis('clTableNNCEvolucaoMesTotais'), 20000)
            })

            var whereTableNNCCEPlastico = ""
            + " WHERE 1=1 "
            + "and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + "and month([Dt Abertura]) = (select month(data) as data from v_maiorData) "
            + " AND [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo Problema] in ('Borracha','Luva Latex','Luva Nitrilica','Plástico duro','Plástico mole - Resíduo') "
         

            api.getSearaBaseNNC1nivelPIVOTDIA([ whereTableNNCCEPlastico, " Filial  as Coluna1, null as Coluna2, null as Coluna3 ", "Filial", " [MES-DIA] " , " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableNNCCEPlastico(json)
                setTimeout(arrumaTabela1nivel('clTableNNCCEPlastico'), 20000)
            })

            var whereTableNNCCEMetal = ""
            + " WHERE 1=1 "
            + "and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + "and month([Dt Abertura]) = (select month(data) as data from v_maiorData) "
            + " AND [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' and ( [Grupo Problema.] = 'Corpo Estranho_ Metalico' or [Tipo Problema] in ('Luva anti corte') ) "

            api.getSearaBaseNNC1nivelPIVOTDIA([ whereTableNNCCEMetal, " Filial  as Coluna1, null as Coluna2, null as Coluna3 ", "Filial", " [MES-DIA] ", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableNNCCEMetal(json)
                setTimeout(arrumaTabela1nivel('clTableNNCCEMetal'), 20000)
            })


            var whereTableNNCCEOssos = ""
            + " WHERE 1=1 "
            + "and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + "and month([Dt Abertura]) = (select month(data) as data from v_maiorData) "
            + " AND [Grupo Problema] = 'Corpo Estranho' and [Reg. Qual] NOT IN ('Itajaí','Outros') and [Entra para a Meta] = 'Sim' AND [Tipo Problema] = 'Ossos'  "

            
            api.getSearaBaseNNC1nivelPIVOTDIA([ whereTableNNCCEOssos, " Filial  as Coluna1, null as Coluna2, null as Coluna3 ", "Filial", " [MES-DIA] ", " [MES-DIA] " ]).then((response) => {    
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
                
                setTableNNCCEOssos(json)
                setTimeout(arrumaTabela1nivel('clTableNNCCEOssos'), 20000)
            })

            var whereTableNNCCE = ""
            + " WHERE 1=1 "
            + "and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + "and month([Dt Abertura]) = (select month(data) as data from v_maiorData) "
            + "and [Grupo Problema] in ('Corpo Estranho') and [Reg. Qual] NOT IN ('OUTROS', 'ITAJAÍ') and [Entra para a Meta] = 'Sim' "

            api.getSearaBaseNNC2niveisPIVOTDIA([ whereTableNNCCE, "[Reg. Prod.] as Coluna1, fornecedor as Coluna2, null as Coluna3", "[Reg. Prod.], fornecedor", " [MES-DIA] ", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableNNCCE(json)
                setTimeout(arrumaTabela2niveis('clTableNNCCE'), 20000)
            })


            var whereTableHabilitadorCorposEstranhosNaoInerentes = ""
            + " WHERE 1=1 "
            + "and ANO = (select year(data) as data from v_maiorData) "
            
           

            api.getSearaBaseCE2niveisPIVOTmesDesvio([ whereTableHabilitadorCorposEstranhosNaoInerentes, "[Negócio] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Negócio], Unidade", " '|' + MES + '|' ", "Mes" ]).then((response) => {
                
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
                
                setTableHabilitadorCorposEstranhosNaoInerentes(json)
                setTimeout(arrumaTabela2niveis('clTableHabilitadorCorposEstranhosNaoInerentes'), 20000)
            })


            var whereTableNNCCEInerenteNaoInerente = ""
            + " WHERE 1=1 "
            + " and year([Dt Abertura]) = (select year(data) as data from v_maiorData) "
            + " and month([Dt Abertura]) = (select month(data) as data from v_maiorData) "
            + " and [Grupo Problema] in ('Corpo Estranho') and [Reg. Qual] NOT IN ('OUTROS', 'ITAJAÍ') and [Entra para a Meta] = 'Sim' "

            api.getSearaBaseNNC2niveisPIVOTDIA([ whereTableNNCCEInerenteNaoInerente, "[Reg. Prod.]  as Coluna1, Fornecedor as Coluna2, null as Coluna3 ", "[Reg. Prod.], Fornecedor", " [TIPO CE] ", " [TIPO CE] "]).then((response) => {
                
                
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
                
                setTableNNCCEInerenteNaoInerente(json)
                setTimeout(arrumaTabela2niveis('clTableNNCCEInerenteNaoInerente'), 20000)
            })

            var wherePivotdataTableRacMetal = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            
            + "AND UNIDADE NOT IN ('AGRO ALFA','AMAI','ATI-GEL','CLAREBOUT','GRANO','GRIFFOOD','MASSATAKE','SANTA CRUZ DO SUL','VIGOR','ARTES GRÁFICAS','CAMPINAS-CD','CAMPO VERDE','CD RIBEIRÃO DAS NEVES','CPO','DOC INDUSTRIA','EIRELI EPP','EIRELI ME','EXCELSIOR','GENESEAS AQUACULTURA','GERÊNCIA NACIONA FS','GRANO ALIMENTOS S.A.','GRIFFOOD','ICOFORT','ITAJAI','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','ITAJAI PESCADOS','LABREZZA','M P FOODS','MARBA','MASSAS SANTA ENERSTINA LTDA','NORONHA', 'OUTROS','PINHAIS - CD','QUALIDADE SUPPLY CHAIN','RIBEIRÃO PRETO – CD','SALVADOR – CD','SAO PAULO – CD','SEARA MEATS','SOMAVE','VARZEA GRANDE – CD') "
            + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
            + "AND [PROBLEMA] IN ('METAL','METÁLICO') "


            api.getSearaBaseRAC1niveisPIVOTDIA([ wherePivotdataTableRacMetal, " Unidade as Coluna1, null as Coluna2, null as Coluna3", "Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacMetal(json)
                setTimeout(arrumaTabela1nivel('clTableRacMetal'), 20000)
            })

            var wherePivotdataEvolucaoAves = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            + "AND Tipo_rac = 'Real'	AND  [Regional Qual] LIKE '%AVES%'  "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Fatiados','Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','Documentação Unidade') ) "



            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataEvolucaoAves, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoAves'), 20000)
            })

            var wherePivotdataEvolucaoPreparados = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            + "AND Tipo_rac = 'Real' "
            
            + "AND Origem IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "
            + "AND (([Regional Qual] LIKE '%Prepar%' or [Regional Qual] IN ('Outros', 'Itajaí')) AND ([Regional Prod] IN ('Outros','Preparados', 'Fatiados') ) OR UNIDADE = 'ITAJAI INDUSTRIALIZADOS') "
            + "AND (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) "





            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataEvolucaoPreparados, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacRACDetalhesEvolucaoPreparados(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoPreparados'), 20000)
            })
                
                
            


            var wherePivotdataEvolucaoFatiados = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            + "AND Tipo_rac = 'Real'	AND  [Regional Qual] LIKE '%Fatiados%'  "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','Documentação Unidade') ) "



            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataEvolucaoFatiados, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacRACDetalhesEvolucaoFatiados(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoFatiados'), 20000)
            })




            var wherePivotdataEvolucaoPescados = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            + "AND Tipo_rac = 'Real'	AND  [Regional Qual] LIKE '%Pescado%'  "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Fatiados','Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            


            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataEvolucaoPescados, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacRACDetalhesEvolucaoPescados(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoPescados'), 20000)
            })


            var wherePivotdataEvolucaoSuinos = ""
            + " WHERE 1=1 "
            + "and year(data_rac) = (select year(data) as data from v_maiorData) "
            + "and month(data_rac) = (select month(data) as data from v_maiorData) "
            + "AND Tipo_rac = 'Real'	AND  [Regional Qual] LIKE '%Su%no%'  "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Fatiados','Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','Documentação Unidade') ) "



            api.getSearaBaseRAC3niveisPIVOTDIA([ wherePivotdataEvolucaoSuinos, "[Regional Qual] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Regional Qual], Unidade", " [MES-DIA] " ]).then((response) => {
                
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
                
                setTableRacRACDetalhesEvolucaoSuinos(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesEvolucaoSuinos'), 20000)
            })


            api.getSearaBaseRacAberturaME2([whereAberturaME + " AND Especialista_rac IN ('Jéssica') AND Unidade NOT IN ('Serviços') "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEContasGlobais(json)
                setTimeout(arrumaTabela3niveis('clContasGlobais'), 20000)
            })

            var whereTableRACAberturaLinhaEspecialFamilia = ""
            + " WHERE 1=1	AND month(Data_rac) = month((select * from v_maiorData)) "
            + " AND year(Data_rac) = year((select * from v_maiorData)) "
            + " AND Nm_Marca_rac in ('SEARA GOURMET','SEARA INCRIVEL','SEARA NATURE','SEARA ROTISSERIE') "																											
            + " AND Tipo_rac = 'Real' "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + "  and (Unidade NOT IN ('Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS','AVANTI','Serviços','Shipping') OR Unidade IS NULL) "
            + " AND (Origem NOT IN ('ABUSO DE PRODUTO HOME') OR Origem IS NULL) "

            api.getSearaBaseRAC2niveis([whereTableRACAberturaLinhaEspecialFamilia," Nm_Marca_rac CAMPO1, Nm_Classe_rac CAMPO2, NULL CAMPO3 "," Nm_Marca_rac, Nm_Classe_rac "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaLinhaEspecialFamilia(json)
                setTimeout(arrumaTabela2niveis('clTableRACAberturaLinhaEspecialFamilia'), 20000)
            })

            var whereTableRacRACDetalhesMetaRealAves = ""
            + " AND Origem IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "
            + " AND ([Regional Qual] LIKE '%AVES%' or [Regional Qual] IN ('Outros','Itajaí')) AND ([Regional Prod] LIKE '%AVES%' or [Regional Prod] IN ('Itajaí - Aves')) "
            + " AND (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) "

            api.getSearaBaseRAC3niveisDesvio([whereTableRacRACDetalhesMetaRealAves," [Negócio Qualidade] CAMPO1, [Unidade] CAMPO2, null CAMPO3 "," [Negócio Qualidade], [Unidade] "]).then((response) => {

                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['C1'];
                    delete json[i]['C2'];
                    delete json[i]['C3'];
                    delete json[i]['CAMPO1_'];
                    delete json[i]['CAMPO2_'];
                    delete json[i]['CAMPO3_'];
                    delete json[i]['NUM'];
                    delete json[i]['CAMPO1_2'];
                    delete json[i]['CAMPO2'];
                    delete json[i]['CAMPO3'];
                }

                setTableRacRACDetalhesMetaRealAves(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesMetaRealAves'), 20000)
            })

            var whereTableRacRACDetalhesMetaRealPreparados = ""
            + " AND Origem IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "
            
            + " AND (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) "
            + " AND (([Regional Qual] LIKE '%Prepar%' or [Regional Qual] IN ('Outros', 'Itajaí')) AND ([Regional Prod] IN ('Outros','Preparados', 'Fatiados') ) OR UNIDADE = 'ITAJAI INDUSTRIALIZADOS') "

            api.getSearaBaseRAC3niveisDesvio([whereTableRacRACDetalhesMetaRealPreparados," [Negócio Qualidade] CAMPO1, [Unidade] CAMPO2, null CAMPO3 "," [Negócio Qualidade], [Unidade] "]).then((response) => {

                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['C1'];
                    delete json[i]['C2'];
                    delete json[i]['C3'];
                    delete json[i]['CAMPO1_'];
                    delete json[i]['CAMPO2_'];
                    delete json[i]['CAMPO3_'];
                    delete json[i]['NUM'];
                    delete json[i]['CAMPO1_2'];
                    delete json[i]['CAMPO2'];
                    delete json[i]['CAMPO3'];
                }

                setTableRacRACDetalhesMetaRealPreparados(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesMetaRealPreparados'), 20000)
            })

            var whereTableRacRACDetalhesMetaRealSuinos = ""
            + " AND Origem IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','EXPEDIÇÃO FÁBRICA FFO','FÁBRICA PRODUÇÃO FFO','FABRICAÇÃO') "
            
            + " AND (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') OR Tipo_Atendimento_rac IS NULL) "
            + " AND (([Regional Qual] LIKE '%Su%no%' or [Regional Qual] IN ('Outros')) AND ([Regional Prod] LIKE '%Su%no%' ) OR UNIDADE = 'ITAJAI SUINOS') "

            api.getSearaBaseRAC3niveisDesvio([whereTableRacRACDetalhesMetaRealSuinos," [Negócio Qualidade] CAMPO1, [Unidade] CAMPO2, null CAMPO3 "," [Negócio Qualidade], [Unidade] "]).then((response) => {

                let json = JSON.parse(response.data)

                for (var i=0; i<json.length; i++){
                    delete json[i]['C1'];
                    delete json[i]['C2'];
                    delete json[i]['C3'];
                    delete json[i]['CAMPO1_'];
                    delete json[i]['CAMPO2_'];
                    delete json[i]['CAMPO3_'];
                    delete json[i]['NUM'];
                    delete json[i]['CAMPO1_2'];
                    delete json[i]['CAMPO2'];
                    delete json[i]['CAMPO3'];
                }

                setTableRacRACDetalhesMetaRealSuinos(json)
                setTimeout(arrumaTabela2niveis('clTableRacRACDetalhesMetaRealSuinos'), 20000)
            })

            var whereTableRACAberturaLinhaEspecialAcumuladoGourmet = ""
            + " WHERE 1=1	AND month(Data_rac) = month((select * from v_maiorData)) "
            + " AND year(Data_rac) = year((select * from v_maiorData)) "
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME', 'Marketing') "																										
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR') "	
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "
            + " AND Nm_Marca_rac in ('SEARA GOURMET') "																											
            + " AND Tipo_rac = 'Real' "

            api.getSearaBaseRAC3niveis([whereTableRACAberturaLinhaEspecialAcumuladoGourmet," Tipo_Problema_rac CAMPO1, Unidade CAMPO2, Nm_item_rac CAMPO3 "," Tipo_Problema_rac, Unidade, Nm_item_rac "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaLinhaEspecialAcumuladoGourmet(json)
                setTimeout(arrumaTabela3niveis('clTableRACAberturaLinhaEspecialAcumuladoGourmet'), 20000)
            })

            var whereTableRACAberturaLinhaEspecialAcumuladoIncrivel = ""
            + " WHERE 1=1	AND month(Data_rac) = month((select * from v_maiorData)) "
            + " AND year(Data_rac) = year((select * from v_maiorData)) "
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME', 'Marketing') "																										
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR') "	
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "
            + " AND Nm_Marca_rac in ('SEARA INCRIVEL') "																											
            + " AND Tipo_rac = 'Real' "

            api.getSearaBaseRAC3niveis([whereTableRACAberturaLinhaEspecialAcumuladoIncrivel," Tipo_Problema_rac CAMPO1, Unidade CAMPO2, Nm_item_rac CAMPO3 "," Tipo_Problema_rac, Unidade, Nm_item_rac  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaLinhaEspecialAcumuladoIncrivel(json)
                setTimeout(arrumaTabela3niveis('clTableRACAberturaLinhaEspecialAcumuladoIncrivel'), 20000)
            })

            var whereTableRACAberturaLinhaEspecialAcumuladoNature = ""
            + " WHERE 1=1	AND month(Data_rac) = month((select * from v_maiorData)) "
            + " AND year(Data_rac) = year((select * from v_maiorData)) "
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME', 'Marketing') "																										
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR') "	
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "
            + " AND Nm_Marca_rac in ('SEARA NATURE') "																											
            + " AND Tipo_rac = 'Real' "

            api.getSearaBaseRAC3niveis([whereTableRACAberturaLinhaEspecialAcumuladoNature," Tipo_Problema_rac CAMPO1, Unidade CAMPO2, Nm_item_rac CAMPO3 "," Tipo_Problema_rac, Unidade, Nm_item_rac  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaLinhaEspecialAcumuladoNature(json)
                setTimeout(arrumaTabela3niveis('clTableRACAberturaLinhaEspecialAcumuladoNature'), 20000)
            })

            var whereTableRACAberturaLinhaEspecialAcumuladoRotisserie = ""
            + " WHERE 1=1	AND month(Data_rac) = month((select * from v_maiorData)) "
            + " AND year(Data_rac) = year((select * from v_maiorData)) "
            + " AND [Origem_do_Problema_rac] NOT IN ('ABUSO DE PRODUTO HOME', 'Marketing') "																										
            + " AND UNIDADE NOT IN ('DAN VIGOR','EIRELI ME','GERÊNCIA NACIONAL FS','ITAJAÍ','ITAJAI ÓLEO COMESTÍVEIS','MARBA','MASSATAKE','MARBA','SANTA CRUZ DO SUL','VIGOR') "	
            + " AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CRÍTICA') "
            + " AND Nm_Marca_rac in ('SEARA ROTISSERIE') "																											
            + " AND Tipo_rac = 'Real' "

            api.getSearaBaseRAC3niveis([whereTableRACAberturaLinhaEspecialAcumuladoRotisserie," Tipo_Problema_rac CAMPO1, Unidade CAMPO2, Nm_item_rac CAMPO3 "," Tipo_Problema_rac, Unidade, Nm_item_rac  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaLinhaEspecialAcumuladoRotisserie(json)
                setTimeout(arrumaTabela3niveis('clTableRACAberturaLinhaEspecialAcumuladoRotisserie'), 20000)
            })

            //////
            var whereTableRacRACD3InNatura = ""
            + " WHERE 1=1	AND Data_rac =  "  
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 1 then DATEADD(DD,-4,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 7 then DATEADD(DD,-3,(select * from v_maiorData)) else DATEADD(DD,-2,(select * from v_maiorData)) end " 																											
            + " AND Tipo_rac = 'Real'  "
            + " AND ([Regional Qual] like '%Ave%' or [Regional Qual] like '%suín%') "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem NOT IN ('ABUSO DE PRODUTO HOME') OR Origem IS NULL) "


            api.getSearaBaseRAC3niveis([whereTableRacRACD3InNatura," Unidade CAMPO1, Nm_Item_RAC CAMPO2, Tipo_Problema_rac CAMPO3 "," Unidade, Nm_Item_RAC, Tipo_Problema_rac "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacRACD3InNatura(json)
                setTimeout(arrumaTabela3niveis('clTableRacRACD3InNatura'), 20000)
            })

             var whereTableRacRACD0InNatura = ""
             + " WHERE 1=1	AND Data_rac =  "   	
             + " case when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 1 then DATEADD(DD,-2,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 7 then DATEADD(DD,-1,(select * from v_maiorData)) else DATEADD(DD,-0,(select * from v_maiorData)) end "																										
            + " AND Tipo_rac = 'Real'   "
            + " AND ([Regional Qual] like '%Ave%' or [Regional Qual] like '%suín%') "
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem NOT IN ('ABUSO DE PRODUTO HOME') OR Origem IS NULL) "

 
             api.getSearaBaseRAC3niveis([whereTableRacRACD0InNatura," Unidade CAMPO1, Nm_Item_RAC CAMPO2, Tipo_Problema_rac CAMPO3 "," Unidade, Nm_Item_RAC, Tipo_Problema_rac "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableRacRACD0InNatura(json)
                 setTimeout(arrumaTabela3niveis('clTableRacRACD0InNatura'), 20000)
             })

             //////
            var whereTableRacRACD3Preparados = ""
            + " WHERE 1=1	AND Data_rac =  "  
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 1 then DATEADD(DD,-4,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 7 then DATEADD(DD,-3,(select * from v_maiorData)) else DATEADD(DD,-2,(select * from v_maiorData)) end" 																											
            + " AND Tipo_rac = 'Real'   "
            + " AND Negocio = 'preparados'"
            + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
			+ " OR Tipo_Atendimento_rac IS NULL) "
            + " and (Unidade NOT IN ('Fatiados','Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
            + " AND (Origem  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','Documentação Unidade') ) "

            api.getSearaBaseRAC3niveis([whereTableRacRACD3Preparados," Unidade CAMPO1, Nm_Item_RAC CAMPO2, Tipo_Problema_rac CAMPO3 "," Unidade, Nm_Item_RAC, Tipo_Problema_rac "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacRACD3Preparados(json)
                setTimeout(arrumaTabela3niveis('clTableRacRACD3Preparados'), 20000)
            })

             var whereTableRacRACD0Preparados = ""
             + " WHERE 1=1	AND Data_rac = "   	
             + " case when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 1 then DATEADD(DD,-2,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 7 then DATEADD(DD,-1,(select * from v_maiorData)) else DATEADD(DD,-0,(select * from v_maiorData)) end"																										
             + " AND Tipo_rac = 'Real'   "
             + " AND Negocio = 'preparados'"
             + " and (Tipo_Atendimento_rac NOT IN ('ALERTA', 'Concessão', 'Crítica','Elogio','Negociação Comercial','Obrigação', 'RAC CAIXA', 'RAC Complementar','Recolhimento','Recolhimento Voluntário') "
             + " OR Tipo_Atendimento_rac IS NULL) "
             + " and (Unidade NOT IN ('Fatiados','Dan Vigor','Marba','Massatake','Santa Cruz do Sul','Vigor','ITAJAI ÓLEO COMESTÍVEIS') OR Unidade IS NULL) "
             + " AND (Origem  IN ('EXPEDIÇÃO FÁBRICA','FABRICAÇÃO','Documentação Unidade') ) "
 
 
             api.getSearaBaseRAC3niveis([whereTableRacRACD0Preparados," Unidade CAMPO1, Nm_Item_RAC CAMPO2, Tipo_Problema_rac CAMPO3 "," Unidade, Nm_Item_RAC, Tipo_Problema_rac "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableRacRACD0Preparados(json)
                 setTimeout(arrumaTabela3niveis('clTableRacRACD0Preparados'), 20000)
             })


             var whereTableNNCLogD3 = ""
             + " WHERE 1=1 "
             
             + " AND [DT ABERTURA] = case when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 1 then DATEADD(DD,-4,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 7 then DATEADD(DD,-3,(select * from v_maiorData)) else DATEADD(DD,-2,(select * from v_maiorData)) end" 
             + " and [Regional (Qualidade)] not in ('Logística', 'Terceiro', 'Outros') and [Área Responsável] not in ('WRAP PIZZA', 'RASTREABILIDADE HUB', 'NNC OCORRÊNCIA PRODUTO; PROCESSO NAS FILIAIS') "
 
             api.getSearaBaseNNCLog3niveis([whereTableNNCLogD3," Fornecedor CAMPO1, [Grupo Problema] CAMPO2, [Tipo Problema] CAMPO3  "," Fornecedor, [Tipo Problema], [Grupo Problema] "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCLogD3(json)
                 setTimeout(arrumaTabela2niveis('clTableNNCLogD3'), 20000)
             })

             var whereTableNNCLogD0 = ""
        
             + " WHERE 1=1 "
             + " AND [DT ABERTURA] =  "
             + " case when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 1 then DATEADD(DD,-2,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 7 then DATEADD(DD,-1,(select * from v_maiorData)) else DATEADD(DD,-0,(select * from v_maiorData)) end"
             + " and [Regional (Qualidade)] not in ('Logística', 'Terceiro', 'Outros') and [Área Responsável] not in ('WRAP PIZZA', 'RASTREABILIDADE HUB', 'NNC OCORRÊNCIA PRODUTO; PROCESSO NAS FILIAIS') "
 
 
             api.getSearaBaseNNCLog3niveis([whereTableNNCLogD0,"  Fornecedor CAMPO1, [Grupo Problema] CAMPO2, [Tipo Problema] CAMPO3  "," Fornecedor, [Tipo Problema], [Grupo Problema] "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCLogD0(json)
                 setTimeout(arrumaTabela2niveis('clTableNNCLogD0'), 20000)
             })

             //////
            var whereTableNNCMPD3InNatura = ""
            + " WHERE 1=1 "
            + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
            + " AND ([Reg. Qual] LIKE '%AVES%' OR [Reg. Qual] like '%suí%') "
            + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
            + " AND [Entra para a Meta] IN ('SIM') "
            + " AND [DT ABERTURA] = "
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 1 then DATEADD(DD,-4,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 7 then DATEADD(DD,-3,(select * from v_maiorData)) else DATEADD(DD,-2,(select * from v_maiorData)) end"

            api.getSearaBaseNNCMP3niveis([whereTableNNCMPD3InNatura," Fornecedor CAMPO1, [Tipo Problema] CAMPO2, Produto CAMPO3 "," Fornecedor, [Tipo Problema], Produto "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableNNCMPD3InNatura(json)
                setTimeout(arrumaTabela3niveis('clTableNNCMPD3InNatura'), 20000)
            })

             var whereTableNNCMPD0InNatura = ""
             + " WHERE 1=1 "
            + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
            + " AND ([Reg. Qual] LIKE '%AVES%' OR [Reg. Qual] like '%suí%') "
            + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
            + " AND [Entra para a Meta] IN ('SIM') "
            + " AND [DT ABERTURA] =  "
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 1 then DATEADD(DD,-2,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 7 then DATEADD(DD,-1,(select * from v_maiorData)) else DATEADD(DD,-0,(select * from v_maiorData)) end"
 
             api.getSearaBaseNNCMP3niveis([whereTableNNCMPD0InNatura," Fornecedor CAMPO1, [Tipo Problema] CAMPO2, Produto CAMPO3 "," Fornecedor, [Tipo Problema], Produto "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCMPD0InNatura(json)
                 setTimeout(arrumaTabela3niveis('clTableNNCMPD0InNatura'), 20000)
             })

             //////
            var whereTableNNCMPD3Preparados = ""
            + " WHERE 1=1 "
            + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
            + " AND [Reg. Prod.] IN ('PREPARADOS') "
            + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
            + " AND [Entra para a Meta] IN ('SIM') "
            + " AND [DT ABERTURA] =  "
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 1 then DATEADD(DD,-4,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-2,(select * from v_maiorData))) = 7 then DATEADD(DD,-3,(select * from v_maiorData)) else DATEADD(DD,-2,(select * from v_maiorData)) end"

            api.getSearaBaseNNCMP3niveis([whereTableNNCMPD3Preparados," Fornecedor CAMPO1, [Tipo Problema] CAMPO2, Produto CAMPO3 "," Fornecedor, [Tipo Problema], Produto "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableNNCMPD3Preparados(json)
                setTimeout(arrumaTabela3niveis('clTableNNCMPD3Preparados'), 20000)
            })

             var whereTableNNCMPD0Preparados = ""
             + " WHERE 1=1 "
            + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
            + " AND [Reg. Prod.] IN ('PREPARADOS') "
            + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
            + " AND [Entra para a Meta] IN ('SIM') "
            + " AND [DT ABERTURA] = DATEADD(DD,-0,(select * from v_maiorData)) "
            + " case when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 1 then DATEADD(DD,-2,(select * from v_maiorData)) when DATEPART(WEEKDAY,DATEADD(DD,-0,(select * from v_maiorData))) = 7 then DATEADD(DD,-1,(select * from v_maiorData)) else DATEADD(DD,-0,(select * from v_maiorData)) end"
 
             api.getSearaBaseNNCMP3niveis([whereTableNNCMPD0Preparados," Fornecedor CAMPO1, [Tipo Problema] CAMPO2, Produto CAMPO3 "," Fornecedor, [Tipo Problema], Produto "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCMPD0Preparados(json)
                 setTimeout(arrumaTabela3niveis('clTableNNCMPD0Preparados'), 20000)
             })

             var whereTableNNCMPCEOssos = ""
             + " WHERE 1=1	 "
             + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
             + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
             + " AND [Entra para a Meta] IN ('SIM') "
             + " AND [Tipo Problema] IN ('OSSOS') "
             + " AND month([DT ABERTURA]) = month((select * from v_maiorData)) "
             + " AND year([DT ABERTURA]) = year((select * from v_maiorData)) "
 
             api.getSearaBaseNNC3niveisPIVOTDIA([whereTableNNCMPCEOssos," Cliente Coluna1, Fornecedor Coluna2, Produto Coluna3 "," Cliente, Fornecedor, Produto ", " [MES-DIA] ", " [MES-DIA] "]).then((response) => {
 
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

                 setTableNNCMPCEOssos(json)
                 setTimeout(arrumaTabela3niveis('clTableNNCMPCEOssos'), 20000)
             })

             var whereTableNNCMPCEOssosFornecedor = ""
             + " WHERE 1=1	 "
             + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
             + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
             + " AND [Entra para a Meta] IN ('SIM') "
             + " AND [Tipo Problema] IN ('OSSOS') "
             + " AND month([DT ABERTURA]) = month((select * from v_maiorData)) "
             + " AND year([DT ABERTURA]) = year((select * from v_maiorData)) "
 
             api.getSearaBaseNNCMP3niveis([whereTableNNCMPCEOssosFornecedor," [Negócio] CAMPO1, Fornecedor CAMPO2, null CAMPO3 "," [Negócio], Fornecedor "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCMPCEOssosFornecedor(json)
                 setTimeout(arrumaTabela2niveis('clTableNNCMPCEOssosFornecedor'), 20000)
             })

             var whereTableNNCMPCEOssosUnidadesReclamantes = ""
             + " WHERE 1=1	 "
             + " AND [Reg. Qual] NOT IN ('ITAJAÍ','OUTROS') "
             + " AND [GRUPO PROBLEMA] NOT IN ('EMBALAGEM SECUNDÁRIA','DISTR / LOG') "
             + " AND [Entra para a Meta] IN ('SIM') "
             + " AND [Tipo Problema] IN ('OSSOS') "
             + " AND month([DT ABERTURA]) = month((select * from v_maiorData)) "
             + " AND year([DT ABERTURA]) = year((select * from v_maiorData)) "
 
             api.getSearaBaseNNCMP2niveis([whereTableNNCMPCEOssosUnidadesReclamantes," [Negócio] CAMPO1, [Filial] CAMPO2, null CAMPO3 "," [Negócio], [Filial] "]).then((response) => {
 
                 let json = JSON.parse(response.data)
                 setTableNNCMPCEOssosUnidadesReclamantes(json)
                 setTimeout(arrumaTabela2niveis('clTableNNCMPCEOssosUnidadesReclamantes'), 20000)
             })

             var whereTableRacCorposEstranhos = ""
             + " WHERE 1=1 "
             + "and year(data_rac) = (select year(data) as data from v_maiorData) "
             + "and month(data_rac) = (select month(data) as data from v_maiorData) "
             + "AND [Origem] IN ('FABRICAÇÃO','EXPEDIÇÃO FÁBRICA','P&D','PRODUÇÃO EM TERCEIRO') "
             + "AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO', 'Santa Cruz do Sul', 'Noronha', 'Amai', 'Grano', 'GRANO ALIMENTOS S.A.') "
             + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
             + "and [Tipo CE] in ('Inerente', 'Não Inerente') "

            api.getSearaBaseRAC3niveisPIVOTDIA([ whereTableRacCorposEstranhos, "[Negócio Qualidade] as Coluna1, Unidade as Coluna2, null as Coluna3", "[Negócio Qualidade], Unidade", " [Tipo_Problema_rac] " ]).then((response) => {
                
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

             
                 setTableRacCorposEstranhos(json)
                 setTimeout(arrumaTabela2niveis('clTableRacCorposEstranhos'), 20000)
             })

             var whereTableRacCorposEstranhosInerente = ""
             + " WHERE 1=1 "
             + "and year(data_rac) = (select year(data) as data from v_maiorData) "
             + "and month(data_rac) = (select month(data) as data from v_maiorData) "
             + "AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO', 'Santa Cruz do Sul', 'Noronha', 'Amai', 'Grano', 'GRANO ALIMENTOS S.A.') "
             
             + "AND [Origem] IN ('FABRICAÇÃO','EXPEDIÇÃO FÁBRICA','P&D','PRODUÇÃO EM TERCEIRO') "
             + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
             + "and [Tipo CE] = 'Inerente' "

            api.getSearaBaseRAC3niveisPIVOTDIA([ whereTableRacCorposEstranhosInerente, "[Negócio Qualidade]  as Coluna1, Unidade as Coluna2, null as Coluna3", "[Negócio Qualidade] , Unidade", " [Tipo_Problema_rac] " ]).then((response) => {
                
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

             
                 setTableRacCorposEstranhosInerentes(json)
                 setTimeout(arrumaTabela2niveis('clTableRacCorposEstranhosInerentes'), 20000)
             })

             var whereTableRacCorposEstranhosNaoInerente = ""
             + " WHERE 1=1 "
             + "and year(data_rac) = (select year(data) as data from v_maiorData) "
             + "and month(data_rac) = (select month(data) as data from v_maiorData) "
             + "AND [Origem] IN ('FABRICAÇÃO','EXPEDIÇÃO FÁBRICA','P&D','PRODUÇÃO EM TERCEIRO') "
             + "AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO', 'Santa Cruz do Sul', 'Noronha', 'Amai', 'Grano', 'GRANO ALIMENTOS S.A.') "
             
             + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
             + "and [Tipo CE] = 'Não Inerente' "

            api.getSearaBaseRAC3niveisPIVOTDIA([ whereTableRacCorposEstranhosNaoInerente, "[Negócio Qualidade]  as Coluna1, Unidade as Coluna2, null as Coluna3", "[Negócio Qualidade] , Unidade", " [Tipo_Problema_rac] " ]).then((response) => {
                
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

             
                 setTableRacCorposEstranhosNaoInerentes(json)
                 setTimeout(arrumaTabela2niveis('clTableRacCorposEstranhosNaoInerentes'), 20000)
             })

             var whereTableRacCorposEstranhosInerenteNaoInerente = ""
             + " WHERE 1=1 "
             + "and year(data_rac) = (select year(data) as data from v_maiorData) "
             + "and month(data_rac) = (select month(data) as data from v_maiorData) "
             + "AND UNIDADE NOT IN ('ITAJAI','MARBA','SANTA CRUZ DO SUL','VERÍSSIMO', 'Santa Cruz do Sul', 'Noronha', 'Amai', 'Grano', 'GRANO ALIMENTOS S.A.') "
             
             + "AND [Origem] IN ('FABRICAÇÃO','EXPEDIÇÃO FÁBRICA','P&D','PRODUÇÃO EM TERCEIRO') "
             + "AND [TIPO_ATENDIMENTO_RAC] NOT IN ('ALERTA','CONCESSÃO', 'CRITICA','CRÍTICA','ELOGIO','NEGOCIAÇÃO COMERCIAL','OBRIGAÇÃO','RAC CAIXA','RAC COMPLEMENTAR','RECOLHIMENTO','RECOLHIMENTO VOLUNTÁRIO') "
             + "and [Tipo CE] in ('Inerente', 'Não Inerente') "
            
            

             api.getSearaBaseRAC3niveisPIVOTDIA([ whereTableRacCorposEstranhosInerenteNaoInerente, "[Negócio Qualidade]  as Coluna1, Unidade as Coluna2, null as Coluna3", " [Negócio Qualidade] , Unidade", " [Tipo CE] " ]).then((response) => {
                
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

             
                 setTableRacCorposEstranhosInerentesNaoInerentes(json)
                 setTimeout(arrumaTabela2niveis('clTableRacCorposEstranhosInerentesNaoInerentes'), 20000)
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
                    <small>Carrengando dados</small>
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
                        <h1></h1>
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
                        <Col className="col-lg-3 col-md-3 col-sm-12">
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
                                    {
                                    isUpdatingData ? (<LoadingSkeletonCard />) : (

                                        DataTableRACAberturaMEJapao()
                                    
                                    )
                                    }                                   
                                    
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
                        <Col className="col-3">
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
                                        <Chart type="bar" data={responseGraficoRACDetalhesAberturaPDV} options={optionsComparativo} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                        </Col>
                        <Col className="col-3">
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
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Aves
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesMetaRealAves()

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
                <Col className="col-6">
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
                </Col>
                    
                <Col className="col-6">

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
                </Col> 
                </Row>   
                </reg>

                <reg id="region RAC - +13">

                    <Row>
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesMetaRealPreparados()

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
                        <Col className="col-6">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC's Meta x Real - Suínos
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacRACDetalhesMetaRealSuinos()

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
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Linhas Especiais - Família
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaLinhaEspecialFamilia()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +16">

                    <Row>
                        
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Gourmet
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaLinhaEspecialAcumuladoGourmet()

                                )}
                            </Col>
                        </Col>
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Incrível
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaLinhaEspecialAcumuladoIncrivel()

                                )}
                            </Col>
                        </Col>
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Nature 
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaLinhaEspecialAcumuladoNature()

                                )}
                            </Col>
                        </Col>
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                Abertura Rotisserie
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACAberturaLinhaEspecialAcumuladoRotisserie()

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
                                &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacInseto()

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
                            &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacCabelo()

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
                            &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacPlastico()

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
                                &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacMetal()

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
                                &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacIntoxicacao()

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
                                &nbsp;
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacLarva()

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

                                    DataTableRacCorposEstranhos()

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

                                    DataTableRacCorposEstranhosInerentes()

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

                                    DataTableRacCorposEstranhosNaoInerentes()

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
                            <Col className="col-lg-6 col-md-6 col-sm-6 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRacCorposEstranhosInerentesNaoInerentes()

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

                                    DataTableHabilitadorCorposEstranhosNaoInerentes()
                                    //inexistente

                                )}
                            </Col>
                        </Col>
                        
                    </Row>
                    
                </reg>

                <reg id="region RAC - +31">

                    <Row>
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D3 - In Natura
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACD3INNATURA()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D3 - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACD3Preparados()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D0 - In Natura
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACD0INNATURA()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                RAC D0 - Preparados
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableRACD0Preparados()

                                )}
                            </Col>
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
                                Evolução Mês - NNC Log
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableNNCEvolucaoMes()

                                )}
                            </Col>
                        </Col>
                    </Row>
                    
                </reg>

                <reg id="region RAC - +37">

                    <Row>
                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log D3
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableNNCLogD3()

                                )}
                            </Col>
                        </Col>

                        <Col className="col-3">
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Log D0
                                <hr></hr>
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (

                                    DataTableNNCLogD0()

                                )}
                            </Col>
                        </Col>
                        
                    </Row>

                
                    
                </reg>

                <reg id="region RAC - +38">

                    <Row>
                        <Col className="col-12">
                            <Row>
                            <Col className="mt-1 col-12 cssSeara2021_titulo">
                                NNC Totais
                                <hr></hr>
                            </Col>
                            </Row>
                            <Row>
                            <Col className="col-lg-3 col-md-3 col-sm-12">&nbsp;</Col>
                            <Col className="col-lg-6 col-md-6 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="cssSeara2021_tituloGrafico  align-self-center">
                                        <Chart type="bar" data={responseGraficoNCCMP} options={lightOptions} className="divMaior2" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-3 col-md-3 col-sm-12 ">&nbsp;</Col>
                            </Row>
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
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadas} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPesadasUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPesadasProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasRS} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesRSUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesRSProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasSP} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesSPUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesSPProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPAvesPesadasPR} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPRUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesPRProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPAvesLeves} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesLevesUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCAvesLevesProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPSuinos} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCSuinosUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCSuinosProblemas} options={optionsComparativo} className="divMenor" />
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
                                    <Chart type="bar" data={responseGraficoNCCMPPreparados} options={lightOptions} className="divMaior" />
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCPreparadosUnidades} options={optionsComparativo} className="divMenor" />
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title=" " subTitle="" className="cssSeara2021_tituloGrafico ">
                                        <Chart type="bar" data={responseGraficoNNCPreparadosProblemas} options={optionsComparativo} className="divMenor" />
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
                                 DataTableNNCCEPlastico()
                                
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
                                 DataTableNNCCEMetal()
                                
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
                                 DataTableNNCCEOssos()
                                
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
                                 DataTableNNCCE()
                                
                            )}
                        </Col>

                    </Row>
                </reg>

                <reg id="region NNC +50">
                <Row>   
                    <Col className="col-6"> 
                        <Row>
                            <Col className=" col-12 cssSeara2021_titulo">
                                NNC MP Corpos Estranhos Inerentes e Não Inerentes
                            <hr></hr>
                            </Col>
                        </Row>
                        <Row>

                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    DataTableNNCCEInerenteNaoInerente()
                                    
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12">   
                        <Row>
                            <Col className=" col-12 cssSeara2021_titulo">
                                NNC MP Corpos Estranhos - Ossos - Unidade Reclamante / Fornecedor / Produto
                            <hr></hr>
                            </Col>
                        </Row>
                        <Row>

                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    DataTableNNCMPCEOssos()
                                    
                                )}
                            </Col>

                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-3">    
                        <Row>
                            <Col className=" col-12 cssSeara2021_titulo">
                                NNC MP Corpos Estranhos - Ossos - Fornecedor
                            <hr></hr>
                            </Col>
                        </Row>
                        <Row>

                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    DataTableNNCMPCEOssosFornecedor()
                                    
                                )}
                            </Col>

                        </Row>
                    </Col>
                    <Col className="col-3">    
                        <Row>
                            <Col className=" col-12 cssSeara2021_titulo">
                                NNC MP Corpos Estranhos - Unidades reclamantes
                            <hr></hr>
                            </Col>
                        </Row>
                        <Row>

                            <Col className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    DataTableNNCMPCEOssosUnidadesReclamantes()
                                    
                                )}
                            </Col>

                        </Row>
                    </Col>
                </Row>
                </reg>

                <reg id="region NNC +48"> 
                <Row>
                <Col className="col-6"> 
                    <Row>
                        <Col className=" col-6 cssSeara2021_titulo">
                            NNC MP D-3 - In natura
                        <hr></hr>
                        </Col>
                        <Col className=" col-6 cssSeara2021_titulo">
                            NNC MP D-3 - Preparados
                        <hr></hr>
                        </Col>
                    </Row>             
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableNNCMPD3INNATURA()
                                
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableNNCMPD3Preparados()
                                
                            )}
                        </Col>

                    </Row>
                </Col>
                <Col className="col-6">   
                    <Row>
                        <Col className=" col-6 cssSeara2021_titulo">
                            NNC MP D-0 - In natura
                        <hr></hr>
                        </Col>
                        <Col className=" col-6 cssSeara2021_titulo">
                            NNC MP D-0 - Preparados
                        <hr></hr>
                        </Col>
                    </Row>              
                    <Row>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableNNCMPD0INNATURA()
                                
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                 DataTableNNCMPD0Preparados()
                                
                            )}
                        </Col>

                    </Row>
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
                
               

            </div>

        </div>
    )
}

export default Home;