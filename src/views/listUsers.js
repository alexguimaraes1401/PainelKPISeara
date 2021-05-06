import React from 'react';
import 'primeicons/primeicons.css'
import Api from '../api/userApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const listUsersTexts = {
    columnName: "Nome de usuario",
    columnEmail: "E-mail",
    columnRoles: "Roles/Claims",
    columnActions: "Ações",
    tableHeader: "Usuários cadastrados",
    searchColumnEmailPlaceholder: "Busque por e-mail",
    searchColumnNamePlaceholder: "Busque por nome de usuário",
    searchColumnRole: "Busque por roles/claims",
}

class ListUserJxs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalRecords: 0,
            loading: true,
            globalFilter: null
        };
        // this.toast = React.createRef();
        this.getUsers();
    }

    getUsers() {
        Api.get().then(r => {
            const users = JSON.parse(r.data);
            const totalRecords = users.length;
            this.setState({
                users: JSON.parse(r.data),
                totalRecords: totalRecords,
                loading: false
            });
            console.log(this.state)
        }).catch(e => {

        }).finally(() => {

        })
    }

    edit(rowData) {
        console.log(rowData)
    }
    confirmInactivate(rowData) {
        console.log(rowData)
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="mr-1 p-button-rounded p-button-warning p-mr-2" onClick={() => this.edit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmInactivate(rowData)} />
            </React.Fragment>
        );
    }

    rolesBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <div>
                    {rowData.Roles.map((r, index) => {
                        return (<div key={index}>
                            Role:
                            <span className={`customer-badge status-qualified`}>{r.Role}</span>
                            Claims in Role:
                            <span className={`customer-badge status-qualified`}>{JSON.stringify(r.Claims)}</span>
                        </div>)
                    })}
                </div>
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header" style={{ display: "flex", "justifyContent": "space-between" }}>
                {listUsersTexts.tableHeader}
                {/* <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
                </span> */}
            </div>
        );

        return (
            <div>
                <div className="card">
                    <DataTable
                        value={this.state.users}
                        header={header}
                        lazy
                        paginator
                        first={this.state.users.first}
                        rows={10}
                        loading={this.state.loading}
                        totalRecords={this.state.totalRecords}
                        resizableColumns
                        columnResizeMode="expand"
                        globalFilter={this.state.globalFilter}
                        emptyMessage="No customers found."
                        className="p-datatable-responsive-demo p-datatable-sm p-datatable-striped">
                        <Column
                            field="Username"
                            header={listUsersTexts.columnName}
                            filter
                            filterPlaceholder={listUsersTexts.searchColumnNamePlaceholder}
                            filterMatchMode="contains"
                            style={{ width: '20%' }}
                            sortable>
                        </Column>
                        <Column
                            field="Email"
                            filter
                            filterPlaceholder={listUsersTexts.searchColumnEmailPlaceholder}
                            filterMatchMode="contains"
                            header={listUsersTexts.columnEmail}
                            style={{ width: '25%' }}
                            sortable>
                        </Column>
                        <Column
                            header={listUsersTexts.columnRoles}
                            body={this.rolesBodyTemplate}>
                        </Column>
                        <Column
                            header={listUsersTexts.columnActions}
                            style={{ width: '15%' }}
                            body={this.actionBodyTemplate}>
                        </Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}

const ListUsers = () => {
    return <ListUserJxs />
};

export default ListUsers;