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
import { LineWeight } from '@material-ui/icons';
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
    const canvasRef = React.useRef();
    
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

                            false,
                            false,
                            false,
                            false,
                            false,

                            false,
                            false,
                            false,
                            false,
                            false,   
                            
                            false,
                            false,
                            false,
                            false,
                            false,

                            false,
                            false,
                            false,
                            false,
                            false,

                            false,
                        ]


    function percorreNumeroChamados(){
        // debugger
        for(var i=0; i < numeroChamados.length; i++){
            if(numeroChamados[i] == false){
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

    let [TableRacAberturaME, setTableRacAberturaME] = React.useState() 

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



    let whereRACPreparados = "WHERE ([Regional (Qualidade)] like 'Preparados%' or [Regional (Qualidade)] in ('Outros', 'Itajaí')) "
    whereRACPreparados += " AND ([Origem da RAC] IN ('Documentação Unidade','EXPEDIÇÃO FÁBRICA','FABRICAÇÃO')"
    whereRACPreparados += "                                 OR [Origem da RAC] IS NULL) "
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
    whereRACCE += " AND [Origem da RAC] IN ( "
    whereRACCE += " 'Documentação Unidade',  "
    whereRACCE += " 'EXPEDIÇÃO FÁBRICA',  "
    whereRACCE += " 'FABRICAÇÃO',  "
    whereRACCE += " 'P-D') "

    let whereNNCMP = " WHERE ([Reg. Qual] NOT IN ('Itajaí', 'Outros')) "
    whereNNCMP += " AND ([Grupo Problema] NOT IN ('Distr / Log', 'Embalagem Secundária') or [Grupo Problema] is null) "
    whereNNCMP += " AND ([Entra para a Meta] <> 'Não' or [Entra para a Meta] is null) "

    //Handlers
    React.useEffect(() => {
               
        chamarAPI("CETotal",GraficoCETotal, "GraficoCETotal", [' where 1=1 '], setGraficoCETotal, setresponseGraficoCETotal, 0)     // 1
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCE, "GraficoNNCMPTotalCE", [' where 1=1 '], setGraficoNNCMPTotalCE, setresponseGraficoNNCMPTotalCE, 1)       // 2
        chamarAPI("RAC",GraficoRACTotalCE, "GraficoRACTotalCE", [whereRACCE], setGraficoRACTotalCE, setresponseGraficoRACTotalCE, 2)     // 3
        chamarAPI("RAC",GraficoRAC, "GraficoRAC", [' where 1=1 '], setGraficoRAC, setresponseGraficoRAC, 3)    // 4
        chamarAPI("NCCMP",GraficoNCCMP, "GraficoNCCMP", [whereNNCMP], setGraficoNCCMP, setresponseGraficoNCCMP, 4)    // 5 
        
        chamarAPI("CETotal",GraficoCETotalAvesPesadas, "GraficoCETotalAvesPesadas", [' where NEGOCIO = \'Aves Pesadas\'  '], setGraficoCETotalAvesPesadas, setresponseGraficoCETotalAvesPesadas, 5)     // 6
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCEAvesPesadas, "GraficoNNCMPTotalCEAvesPesadas", [' where [Regional (Qualidade)] in (\'Aves Pesadas 1\',\'Aves Pesadas 2\',\'Aves Pesadas 3\', \'Aves Pesadas PR\') '], setGraficoNNCMPTotalCEAvesPesadas, setresponseGraficoNNCMPTotalCEAvesPesadas, 6)       // 7
        chamarAPI("RACTotalCE",GraficoRACTotalCEAvesPesadas, "GraficoRACTotalCEAvesPesadas", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas 1\',\'Aves Pesadas 2\',\'Aves Pesadas 3\', \'Aves Pesadas PR\')  '], setGraficoRACTotalCEAvesPesadas, setresponseGraficoRACTotalCEAvesPesadas, 7)     // 8
        chamarAPI("RACIndicadores",GraficoRACAvesPesadas, "GraficoRACAvesPesadas", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas 1\',\'Aves Pesadas 2\',\'Aves Pesadas 3\', \'Aves Pesadas PR\')  '], setGraficoRACAvesPesadas, setresponseGraficoRACAvesPesadas, 8)    // 9
        chamarAPI("NCCMP",GraficoNCCMPAvesPesadas, "GraficoNCCMPAvesPesadas", [whereNNCMP + ' and [Reg. Qual] in (\'Aves Pesadas 1\',\'Aves Pesadas 2\',\'Aves Pesadas 3\', \'Aves Pesadas PR\')  '], setGraficoNCCMPAvesPesadas, setresponseGraficoNCCMPAvesPesadas, 9)    // 10

        chamarAPI("CETotal",GraficoCETotalAvesPesadasPR, "GraficoCETotalAvesPesadasPR", [' where [NEGOCIO] = \'Aves Pesadas PR\' '], setGraficoCETotalAvesPesadasPR, setresponseGraficoCETotalAvesPesadasPR, 10)     // 11
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCEAvesPesadasPR, "GraficoNNCMPTotalCEAvesPesadasPR", ['  where [Regional (Qualidade)] = \'Aves Pesadas PR\'  '], setGraficoNNCMPTotalCEAvesPesadasPR, setresponseGraficoNNCMPTotalCEAvesPesadasPR, 11)       // 12
        chamarAPI("RACTotalCE",GraficoRACTotalCEAvesPesadasPR, "GraficoRACTotalCEAvesPesadasPR", ['  WHERE [Negócio (Qualidade)] in (\'Aves Pesadas PR\')   '], setGraficoRACTotalCEAvesPesadasPR, setresponseGraficoRACTotalCEAvesPesadasPR, 12)     // 13
        chamarAPI("RACIndicadores",GraficoRACAvesPesadasPR, "GraficoRACAvesPesadasPR", [' WHERE [Regional (Qualidade)] in (\'Aves Pesadas PR\')  '], setGraficoRACAvesPesadasPR, setresponseGraficoRACAvesPesadasPR, 13)    // 14
        chamarAPI("NCCMP",GraficoNCCMPAvesPesadasPR, "GraficoNCCMPAvesPesadasPR", [whereNNCMP + ' and [Reg. Qual] = \'Aves Pesadas PR\'  '], setGraficoNCCMPAvesPesadasPR, setresponseGraficoNCCMPAvesPesadasPR, 14)    // 15

        chamarAPI("CETotal",GraficoCETotalAvesLeves, "GraficoCETotalAvesLeves", [' where [NEGOCIO]  = \'Aves Leves\' '], setGraficoCETotalAvesLeves, setresponseGraficoCETotalAvesLeves, 15)     // 11
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCEAvesLeves, "GraficoNNCMPTotalCEAvesLeves", [' where [Regional (Qualidade)] = \'Aves Leves\' '], setGraficoNNCMPTotalCEAvesLeves, setresponseGraficoNNCMPTotalCEAvesLeves, 16)       // 12
        chamarAPI("RACTotalCE",GraficoRACTotalCEAvesLeves, "GraficoRACTotalCEAvesLeves", ['  WHERE [Negócio (Qualidade)] = \'Aves Leves\'   '], setGraficoRACTotalCEAvesLeves, setresponseGraficoRACTotalCEAvesLeves, 17)     // 13
        chamarAPI("RACIndicadores",GraficoRACAvesLeves, "GraficoRACAvesLeves", [' WHERE [Negócio (Qualidade)] = \'Aves Leves\'  '], setGraficoRACAvesLeves, setresponseGraficoRACAvesLeves, 18)    // 14
        chamarAPI("NCCMP",GraficoNCCMPAvesLeves, "GraficoNCCMPAvesLeves", [whereNNCMP + ' and [Reg. Qual] = \'Aves Leves\'  '], setGraficoNCCMPAvesLeves, setresponseGraficoNCCMPAvesLeves, 19)    // 15

        chamarAPI("CETotal",GraficoCETotalSuinos, "GraficoCETotalSuinos", [' where [NEGOCIO]  = \'Suínos\' '], setGraficoCETotalSuinos, setresponseGraficoCETotalSuinos, 20)     // 11
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCESuinos, "GraficoNNCMPTotalCESuinos", [' where [Regional (Qualidade)] = \'Suínos\' '], setGraficoNNCMPTotalCESuinos, setresponseGraficoNNCMPTotalCESuinos, 21)       // 12
        chamarAPI("RACTotalCE",GraficoRACTotalCESuinos, "GraficoRACTotalCESuinos", ['  WHERE [Negócio (Qualidade)] = \'Suínos\'   '], setGraficoRACTotalCESuinos, setresponseGraficoRACTotalCESuinos, 22)     // 13
        chamarAPI("RACIndicadores",GraficoRACSuinos, "GraficoRACSuinos", [' WHERE [Negócio (Qualidade)] = \'Suínos\'  '], setGraficoRACSuinos, setresponseGraficoRACSuinos, 23)    // 14
        chamarAPI("NCCMP",GraficoNCCMPSuinos, "GraficoNCCMPSuinos", [whereNNCMP + ' and [Reg. Qual] = \'Suínos\'  '], setGraficoNCCMPSuinos, setresponseGraficoNCCMPSuinos, 24)    // 15

        chamarAPI("CETotal",GraficoCETotalPreparados, "GraficoCETotalPreparados", [' where [NEGOCIO]  = \'Preparados\' '], setGraficoCETotalPreparados, setresponseGraficoCETotalPreparados, 25)     // 11
        chamarAPI("NNCMPTotalCE",GraficoNNCMPTotalCEPreparados, "GraficoNNCMPTotalCEPreparados", [' where [Regional (Qualidade)] in (\'Preparados 1\',\'Preparados 2\',\'Preparados 3\', \'Outros\') '], setGraficoNNCMPTotalCEPreparados, setresponseGraficoNNCMPTotalCEPreparados, 26)       // 12
        chamarAPI("RACTotalCE",GraficoRACTotalCEPreparados, "GraficoRACTotalCEPreparados", ['  WHERE [Negócio (Qualidade)] = \'Preparados\'   '], setGraficoRACTotalCEPreparados, setresponseGraficoRACTotalCEPreparados, 27)     // 13
        chamarAPI("RACIndicadores",GraficoRACPreparados, "GraficoRACPreparados", [whereRACPreparados], setGraficoRACPreparados, setresponseGraficoRACPreparados, 28)    // 14
        chamarAPI("NCCMP",GraficoNCCMPPreparados, "GraficoNCCMPPreparados", [whereNNCMP + ' and [Reg. Qual] in (\'Preparados 5\',\'Preparados 2\',\'Preparados 3\', \'Outros\')  '], setGraficoNCCMPPreparados, setresponseGraficoNCCMPPreparados, 29)    // 15

        chamarAPI("RACUnicoUnidade",GraficoRACUnidadesAvesPesadas, "GraficoRACUnidadesAvesPesadas", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Pesadas\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACUnidadesAvesPesadas, setresponseGraficoRACUnidadesAvesPesadas,30)                                                                    // 6
        chamarAPI("RACUnicoProblema",GraficoRACProblemasAvesPesadas, "GraficoRACProblemasAvesPesadas", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Pesadas\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACProblemasAvesPesadas, setresponseGraficoRACProblemasAvesPesadas,31)

        chamarAPI("RACUnicoUnidade",GraficoRACUnidadesAvesPesadasPR, "GraficoRACUnidadesAvesPesadasPR", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Pesadas PR\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACUnidadesAvesPesadasPR, setresponseGraficoRACUnidadesAvesPesadasPR,32)                                                                    // 6
        chamarAPI("RACUnicoProblema",GraficoRACProblemasAvesPesadasPR, "GraficoRACProblemasAvesPesadasPR", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Pesadas PR\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACProblemasAvesPesadasPR, setresponseGraficoRACProblemasAvesPesadasPR,33)

        chamarAPI("RACUnicoUnidade",GraficoRACUnidadesAvesLeves, "GraficoRACUnidadesAvesLeves", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Leves\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves,34)                                                                    // 6
        chamarAPI("RACUnicoProblema",GraficoRACProblemasAvesLeves, "GraficoRACProblemasAvesLeves", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Aves Leves\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves,35)

        chamarAPI("RACUnicoUnidade",GraficoRACUnidadesSuinos, "GraficoRACUnidadesSuinos", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Suínos\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos,36)                                                                    // 6
        chamarAPI("RACUnicoProblema",GraficoRACProblemasSuinos, "GraficoRACProblemasSuinos", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] = \'Suínos\' and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos,37)

        chamarAPI("RACUnicoUnidade",GraficoRACUnidadesPreparados, "GraficoRACUnidadesPreparados", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] in (\'Preparados\') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados,38)                                                                    // 6
        chamarAPI("RACUnicoProblema",GraficoRACProblemasPreparados, "GraficoRACProblemasPreparados", [' where Tipo = \'REAL\' and [Negócio (Qualidade)] in (\'Preparados\') and Ano = year((select * from v_maiorData)) and Mês = month((select * from v_maiorData)) '], setGraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados,39)

        chamarAPI("RACIndicadores",GraficoRACME, "GraficoRACME", [" where 1=1 "], setGraficoRACME, setresponseGraficoRACME, 40)
        chamarAPI("RACIndicadores",GraficoRACME, "GraficoRACMI", [" where 1=1 "], setGraficoRACMI, setresponseGraficoRACMI, 41)

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
            case 'RACIndicadores':
                
                    api.getSearaBaseRacIndicadores(parametros).then((response) => {
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
            case 'RACUnicoUnidade':
                
                    api.getSearaBaseRACUnicoUnidade(parametros).then((response) => {
                            
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

            case 'RACUnicoProblema':
                
                    api.getSearaBaseRACUnicoProblema(parametros).then((response) => {
                            
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

            GerarGraficoBarras(GraficoRACUnidadesAvesLeves, setresponseGraficoRACUnidadesAvesLeves, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasAvesLeves, setresponseGraficoRACProblemasAvesLeves, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesSuinos, setresponseGraficoRACUnidadesSuinos, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasSuinos, setresponseGraficoRACProblemasSuinos, backgroundGradientCinza)

            GerarGraficoBarras(GraficoRACUnidadesPreparados, setresponseGraficoRACUnidadesPreparados, backgroundGradientCinza)
            GerarGraficoBarras(GraficoRACProblemasPreparados, setresponseGraficoRACProblemasPreparados, backgroundGradientCinza)

            GerarGraficoHistoricoSemMeta(GraficoRACME, setresponseGraficoRACME, backgroundGradient, backgroundGradientCinza)
            GerarGraficoHistoricoSemMeta(GraficoRACME, setresponseGraficoRACME, backgroundGradient, backgroundGradientCinza)

        }, 0)
        
    }

 
    const GerarGraficoHistorico = (objeto, funcao, gradient, gradient2) => {
            
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
            let yaxis = [{name:'Evolutivo 2020'},{name:'Evolutivo 2021'},{name:'Evolutivo Meta'},{name:'Meta'},{name:'2019'},{name:'2020'},{name: '2021'},{name: 'forcast'},{name: 'Média Diária'}];

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
                                    {name: "Evolutivo 2021", value: x.value[0].a2021},
                                    {name: "forcast", value: x.value[0].forcast.replace(",",".")},
                                    {name: "Média Diária", value: x.value[0].mediaDiaria.replace(",",".")},
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
                let varborderDash = [0,0]
                let fontWeight = 'bold'
                let lineSize = 2
                let fontSize = "12"

                switch (y.name){

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

                for(var i = 0; i < dataset.length; i++){
                    if(dataset[i] == "") dataset[i] = null
                    if(parseFloat(dataset[i]) > maiorValorSerie && yAx == "B") maiorValorSerie = parseFloat(dataset[i])
                    if(parseFloat(dataset[i]) < menorValorSerie && yAx == "B") menorValorSerie = parseFloat(dataset[i])
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
            let maxYB = maiorValorSerie*(menorValorSerie/maiorValorSerie + 1.2)

            let tipo = 'line'
            let cor = 'transparent'
            let corLabel = 'transparent'
            let yAx = "B"
            let varborderDash = [0,0]

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
                data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,maxYB ],
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

  
            

            if(typeof(funcao)=="function"){
                funcao(dashboardData);
            }

            setIsUpdatingData(false)
    }

    const GerarGraficoHistoricoSemMeta = (objeto, funcao, gradient, gradient2) => {
            
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
        xaxis.splice(2,1) //tira a meta
        let yaxis = [{name:'Evolutivo 2020'},{name:'Evolutivo 2021'},{name:'Evolutivo Meta'},{name:'2019'},{name:'2020'},{name: '2021'},{name: 'forcast'},{name: 'Média Diária'}];

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
                                {name: "Evolutivo 2021", value: x.value[0].a2021},
                                {name: "forcast", value: x.value[0].forcast.replace(",",".")},
                                {name: "Média Diária", value: x.value[0].mediaDiaria.replace(",",".")},
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
            let varborderDash = [0,0]

            switch (y.name){

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

            for(var i = 0; i < dataset.length; i++){
                if(dataset[i] == "") dataset[i] = null
                if(parseFloat(dataset[i]) > maiorValorSerie && yAx == "B") maiorValorSerie = parseFloat(dataset[i])
                if(parseFloat(dataset[i]) < menorValorSerie && yAx == "B") menorValorSerie = parseFloat(dataset[i])
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

            if(y.name == "Meta" || y.name == "Evolutivo Meta" ){
                console.log("Não entra neste relatório por ser meta")
            }else{
                series.push(serie)
            }
        })

        //debugger
        maiorValorSerie = parseFloat(maiorValorSerie)
        menorValorSerie = parseFloat(menorValorSerie)
        let maxYB = maiorValorSerie*(menorValorSerie/maiorValorSerie + 1.2)

        let tipo = 'line'
        let cor = 'transparent'
        let corLabel = 'transparent'
        let yAx = "B"
        let varborderDash = [0,0]

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
            data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,maxYB ],
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


        

        if(typeof(funcao)=="function"){
            funcao(dashboardData);
        }

        setIsUpdatingData(false)
}

    const GerarGraficoBarras = (objeto, funcao, gradient) => {
        
        if(!objeto) return
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
            let cor = gradient ?? '#bfbfbf'
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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
                    <DataTable value={json} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Mercado" header="Mercado"></Column>
                        <Column field="Rac" header="Rac"></Column>
                        <Column field="Cd Item" header="Cd Item"></Column>
                        <Column field="Item" header="Item"></Column>
                        <Column field="Marca" header="Marca"></Column>
                        <Column field="Data de Fabricação" header="Data de Fabricação"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestação" header="Manifestação"></Column>
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

        
    }

    const DataTableRACAberturaMEOrienteMedio = () => {

        if (!TableRacAberturaMEOrienteMedio) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEOrienteMedio.length; i++) {
            json.push(TableRacAberturaMEOrienteMedio[i])
        }

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

        
    }



    const DataTableRACAberturaMEEuropa = () => {

        if (!TableRacAberturaMEEuropa) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEEuropa.length; i++) {
            json.push(TableRacAberturaMEEuropa[i])
        }

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

        
    }

    const DataTableRACAberturaMEJapao = () => {

        if (!TableRacAberturaMEJapao) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEJapao.length; i++) {
            json.push(TableRacAberturaMEJapao[i])
        }

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

        
    }

    const DataTableRACAberturaMEAsia = () => {

        if (!TableRacAberturaMEAsia) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEAsia.length; i++) {
            json.push(TableRacAberturaMEAsia[i])
        }

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

        
    }

    const DataTableRACAberturaMEAmericasAfrica = () => {

        if (!TableRacAberturaMEAmericasAfrica) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEAmericasAfrica.length; i++) {
            json.push(TableRacAberturaMEAmericasAfrica[i])
        }

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

        
    }

    const DataTableRACAberturaMEContasGlobais = () => {

        if (!TableRacAberturaMEContasGlobais) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacAberturaMEContasGlobais.length; i++) {
            json.push(TableRacAberturaMEContasGlobais[i])
        }

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

        
    }

    const buscarTabelaRACUnicoProblema = () => {
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

    var flagTable = false;

    const buscarDados = (response, funcao, graficoRetorno, funcaoRetorno ) => {
  
        setIsUpdatingData(true)

        let parm = " ";

        if(!flagTable){
            api.getSearaBaseRacME(parm).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacME(json)
            }) 
            
            api.getSearaBaseRacFinal(["  AND Unidade = 'Brasília'  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalME(json)
            })

            api.getSearaBaseRacFinal(["  AND Unidade = 'Itapiranga'  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalMI(json)
            })

            api.getSearaBaseRacFinal(["  AND Unidade = 'Forquilinha'  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalRECL(json)
            })

            api.getSearaBaseRacFinal(["  AND Unidade = 'Seara'  "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalPDV(json)
            })

            api.getSearaBaseRacFinal(["  AND Unidade = 'Lapa' "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalTE(json)
            })

            api.getSearaBaseRacFinal([" AND Unidade = 'Ipumirim' "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacFinalCRIT(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaME(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEOrienteMedio(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEEuropa(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEJapao(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAsia(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEAmericasAfrica(json)
            })

            api.getSearaBaseRacAberturaME([" AND 1=1 "]).then((response) => {

                let json = JSON.parse(response.data)
                setTableRacAberturaMEContasGlobais(json)
            })

            flagTable = true;
        }

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
                                <Chart type="bar" data={responseGraficoCETotalAvesPesadasPR} options={lightOptions} className="divMaior"/>
                            </Card>
                        )}
                    </Col>
                    <Col className="col-lg-6 col-md-6 col-sm-12">
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadasPR} options={lightOptions} className="divMenor"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-12 col-md-12 col-sm-12">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesPesadasPR} options={lightOptions} className="divMenor"/>
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
                                <Chart type="bar" data={responseGraficoRACAvesPesadasPR} options={lightOptions} className="divMedia"/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                <Chart type="bar" data={responseGraficoNCCMPAvesPesadasPR} options={lightOptions} className="divMedia"/>
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
                                    <Chart type="bar" data={responseGraficoCETotalAvesLeves} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesLeves} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEAvesLeves} options={lightOptions} className="divMenor"/>
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
                                    <Chart type="bar" data={responseGraficoRACAvesLeves} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPAvesLeves} options={lightOptions} className="divMedia"/>
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
                                    <Chart type="bar" data={responseGraficoCETotalSuinos} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCESuinos} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCESuinos} options={lightOptions} className="divMenor"/>
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
                                    <Chart type="bar" data={responseGraficoRACSuinos} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPSuinos} options={lightOptions} className="divMedia"/>
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
                                    <Chart type="bar" data={responseGraficoCETotalPreparados} options={lightOptions} className="divMaior"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="RAC" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEPreparados} options={lightOptions} className="divMenor"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoNNCMPTotalCEPreparados} options={lightOptions} className="divMenor"/>
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
                                    <Chart type="bar" data={responseGraficoRACPreparados} options={lightOptions} className="divMedia"/>
                                </Card>
                            )}
                        </Col>
                        <Col>
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                <Card title="NNC MP" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                    <Chart type="bar" data={responseGraficoNCCMPPreparados} options={lightOptions} className="divMedia"/>
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadas} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadas} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadas} options={optionsComparativo} className="divMenor2"/>
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
                                    <Chart type="bar" data={responseGraficoRACAvesPesadasPR} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesPesadasPR} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesPesadasPR} options={optionsComparativo} className="divMenor2"/>
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
                                    <Chart type="bar" data={responseGraficoRACAvesLeves} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesAvesLeves} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasAvesLeves} options={optionsComparativo} className="divMenor2"/>
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
                                    <Chart type="bar" data={responseGraficoRACSuinos} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesSuinos} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasSuinos} options={optionsComparativo} className="divMenor2"/>
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
                                    <Chart type="bar" data={responseGraficoRACPreparados} options={lightOptions} className="divMaior2"/>
                                </Card>
                            )}
                        </Col>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACUnidadesPreparados} options={optionsComparativo} className="divMenor2"/>
                                    </Card>
                                )}
                            </Col>
                            <Col className="col-lg-12 col-md-12 col-sm-12">
                                {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                    <Card title="" subTitle="" className="mt-1 cssSeara2021_tituloGrafico">
                                        <Chart type="bar" data={responseGraficoRACProblemasPreparados} options={optionsComparativo} className="divMenor2"/>
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
                                    <Chart type="bar" data={responseGraficoRACMI} options={lightOptions} className="divMaior2"/>
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
                                    <Chart type="bar" data={responseGraficoRACME} options={lightOptions} className="divMaior2"/>
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
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEOrienteMedio() 
                            
                            )}  
                        </Col>
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEEuropa() 
                            
                            )}
                        </Col>
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEJapao() 
                            
                            )}
                        </Col>
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEAsia() 
                            
                            )}
                        </Col>
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEAmericasAfrica() 
                            
                            )}
                        </Col>
                        <Col className="col-lg-2 col-md-4 col-sm-1">
                            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                                
                                DataTableRACAberturaMEContasGlobais() 
                            
                            )}
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
                <reg id="region RAC - Total">
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