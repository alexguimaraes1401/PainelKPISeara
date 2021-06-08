import React from "react";
import { withRouter } from "react-router";
import 'primeicons/primeicons.css'
import Api from '../api/userApi'
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Card } from 'primereact/card';

const registerTexts = {
    SelectRole: "Select a role",
    FullName: "Full name",
    EmailAddress: "Email address",
    EditPassword: "Edit password",
    RepeatPassword: "Repeat password",
    HaveAnAaccount: "Have an account?",
    EditAccount: "Edit Account",
    LogIn: "Log In",
    SelectRole: "Select a role",
    UnableSaveUserData: "unable to save user data.",
    UserDataSaved: "User data successfully saved!",
    PageTitle: "Edit Account"
}
const toastStatus = {
    success: 'success',
    error: 'error',
}

class EditUserJxs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            arr: [ //claims
                { id: 1, value: "Read", isChecked: true },
                { id: 2, value: "Write", isChecked: false },
            ],
            Role: 'user',
            enableSubmit: false,
            showProgressbar: false
        };
        this.toast = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const user = this.fetchData(id);
    }

    fetchData = id => {
        this.refs.btn.setAttribute("disabled", "disabled");
        this.refs.loader.style.display = "block";
        Api.getOne(id).then(r => {
            this.refs.btn.removeAttribute("disabled");

            if (r.data === "null")
                window.location.href = `${window.location.origin}/404`;

            return JSON.parse(r.data);
        }).then(user => {
            this.setState({
                id: user.Id,
                username: user.Username,
                email: user.Email,
                arr: [ //claims
                    { id: 1, value: "Read", isChecked: true },
                    { id: 2, value: "Write", isChecked: false },
                ],
                enableSubmit: true,
                showProgressbar: false
            })

            const userRoles = JSON.parse(user.Roles)

            if (userRoles.length)
                this.setState({ Role: userRoles[0].Role })

            userRoles.forEach(role => {
                role.Claims.forEach(claim => {

                    let arrCopy = this.state.arr
                    arrCopy.forEach(item => {
                        if (item.value.toLowerCase() === claim.toLowerCase())
                            item.isChecked = true
                    })
                    this.setState({ arr: arrCopy })

                });
            });

        }).catch(e => {
            if (e?.response?.status === 401 && e?.response?.data) {
                const response = JSON.parse(e.response.data)
                this.showToast(toastStatus.error, e.response.Message)

            } if (e?.response?.status === 400 && e?.response?.data) {
                const response = JSON.parse(e.response.data)
                this.showToast(toastStatus.error, response.Message, "")
            } else {

            }
        }).finally(() => {
            this.refs.loader.style.display = "none";
        })

    };

    handleSubmit(event) {
        event.preventDefault();
        this.refs.btn.setAttribute("disabled", "disabled");
        this.refs.loader.style.display = "block";
        let user = {}
        user["username"] = this.state.username
        user["email"] = this.state.email
        user["Id"] = this.state.id
        user["Roles"] = [{
            Role: this.state.Role,
            Claims: this.state.arr.filter(r => r.isChecked).map(r => r.value)
        }]

        Api.put(user).then(r => {
            if (r.status === 201) {
                this.showToast(toastStatus.success, registerTexts.UserDataSaved)
            }
        }).catch(e => {
            if (e?.response?.status === 400 && e?.response?.data) {
                const response = JSON.parse(e.response.data)
                this.showToast(toastStatus.error, response.Message)
            } else {
                this.showToast(toastStatus.error, registerTexts.UnableSaveUserData)
            }
        }).finally(() => {
            this.refs.btn.removeAttribute("disabled");
            this.refs.loader.style.display = "none";
        })
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCheckChieldElement(event) {
        let arrCopy = this.state.arr
        arrCopy.forEach(item => {
            if (item.value === event.target.value)
                item.isChecked = event.target.checked
        })
        this.setState({ arr: arrCopy })
    }

    showToast(severity, message, details) {
        this.toast.current.show({ severity: severity, summary: message, detail: details });
    }

    render() {
        const usernameOk = this.state.username.length > 0;
        const emailOk = this.state.email.length > 0;
        const enabledSubmit =
            usernameOk
            && emailOk;

        return (
            <Card title={registerTexts.PageTitle} style={{ marginBottom: '2em' }}>
                <form onSubmit={this.handleSubmit}>
                    <Toast ref={this.toast} position="bottom-right"></Toast>
                    {/* NOME COMPELTO */}
                    <div className="form-group input-group">
                        <div className="input-group-prepend" >
                            <span className="input-group-text"> <i style={{ color: usernameOk ? 'green' : 'red' }} className="pi pi-user"></i> </span>
                        </div>
                        <input
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            className="form-control"
                            placeholder={registerTexts.FullName}
                            type="text" />
                    </div>

                    {/* EMAIL */}
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i style={{ color: emailOk ? 'green' : 'red' }} className="pi pi-envelope"></i> </span>
                        </div>
                        <input
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className="form-control"
                            placeholder={registerTexts.EmailAddress}
                            type="email" />
                    </div>

                    {/* PERFIL */}
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="pi pi-flag"></i> </span>
                        </div>
                        <select
                            className="form-control"
                            value={this.state.Role}
                            name="Role"
                            onChange={this.handleInputChange}>
                            <option value="user">{registerTexts.SelectRole}</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* UNIDADES */}
                    <div className="form-group">
                        {
                            this.state.arr.map((item) => {
                                return (
                                    <div key={item.value} className="custom-control custom-checkbox" >
                                        <input name="isGoing" type="checkbox" id={item.value} value={item.value} checked={item.isChecked} onChange={this.handleCheckChieldElement} className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor={item.value}>{item.value}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="form-group">
                        <button type="submit"
                            ref="btn"
                            disabled={!enabledSubmit}
                            className="btn btn-primary btn-block">
                            {registerTexts.EditAccount}
                        </button>
                    </div>
                    <br />
                    <div ref="loader" style={{ display: 'none' }}>
                        <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                    </div>

                </form>
            </Card>
        );
    }
}

export default withRouter(EditUserJxs);
