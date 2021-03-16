function navigateToPage(path) {
    if (typeof window !== 'undefined') {
        window.location.href = path;
    }
}

const itemsPanelMenu = [
    {
        label: 'KPIs',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'Início',
                command: () => { navigateToPage('/') },
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Absorção',
                command: () => { navigateToPage('/absorcao') },
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Acumulada Peso Griller',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Auto Infração',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Bloqueados',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Checklist',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Controle de Ossos',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Dripp',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Microbiologia',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'NNC Log',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'NNC MP',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'OC',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Peso Griller',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Plano SIF',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'PNC',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'RAC',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'RAS (dividida em 3: BD, Devoluções e Score) ',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Sanidade',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Segregados',
                icon: 'pi pi-fw pi-external-link'
            },
            {
                label: 'Tempo de Resposta',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    }

];

const lightOptions = {
    legend: {
        labels: {
            fontColor: '#495057'
        }
    },
    scales: {
        xAxes: [{
            ticks: {
                fontColor: '#495057'
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: '#495057'
            }
        }]
    }
};

const colorsBars = ["#80F31F", "#A5DE0B", "#C7C101", "#E39E03", "#F6780F", "#FE5326", "#FB3244", "#ED1868", "#D5078E", "#B601B3", "#9106D3", "#6B16EC", "#472FFA", "#2850FE", "#1175F7", "#039BE5", "#01BECA", "#0ADCA8", "#1DF283", "#3AFD5D", "#5CFD3A", "#82F21E", "#A7DD0A", "#C9BF01", "#E49C03", "#F77610", "#FE5127", "#FB3046", "#EC166A", "#D40690", "#B401B5", "#8F06D5", "#6917ED", "#4531FB", "#2752FE", "#1077F6", "#039DE4", "#01C0C8", "#0BDEA6", "#1FF381", "#3BFD5B", "#5EFD39", "#84F11D", "#A9DB0A", "#CBBD01", "#E69A04", "#F77411", "#FE4F29", "#FA2E48", "#EB156D"]

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

export { months, colorsBars, lightOptions, itemsPanelMenu };