import React from 'react';
import 'primeicons/primeicons.css'
import Api from '../api/userApi'
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Password } from 'primereact/password';

const registerTexts = {
    SelectRole: "Select a role",
    FullName: "Full name",
    EmailAddress: "Email address",
    CreatePassword: "Create password",
    RepeatPassword: "Repeat password",
    HaveAnAaccount: "Have an account?",
    CreateAccount: "Create Account",
    LogIn: "Log In",
    SelectRole: "Select a role",
    UnableSaveUserData: "unable to save user data.",
    UserDataSaved: "User data successfully saved!"
}

const toastStatus = {
    success: 'success',
    error: 'error',
}

class CreateUserJxs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            arr: [ //claims
                { id: 1, value: "Read", isChecked: true },
                { id: 2, value: "Write", isChecked: false },
            ],
            Role: 'user',
            enableSubmit: true,
            showProgressbar: false
        };
        this.toast = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.refs.btn.setAttribute("disabled", "disabled");
        this.refs.loader.style.display = "block";

        let user = {}
        user["username"] = this.state.username
        user["email"] = this.state.email
        user["password"] = this.state.password
        user["Roles"] = [{
            Role: this.state.Role,
            Claims: this.state.arr.filter(r => r.isChecked).map(r => r.value)
        }]

        Api.post(user).then(r => {
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
        const passwordOk = this.state.password.length > 0;
        const passwordConfirmOk = this.state.passwordConfirm.length > 0;
        const emailOk = this.state.email.length > 0;
        const enabledSubmit =
            usernameOk
            && passwordOk
            && passwordConfirmOk
            && emailOk;

        return (
            <form onSubmit={this.handleSubmit}>
                <Toast ref={this.toast}></Toast>
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

                {/* SENHA */}
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i style={{ color: passwordOk ? 'green' : 'red' }} className="pi pi-lock"></i> </span>
                    </div>
                    <Password
                        name="password"
                        placeholder={registerTexts.CreatePassword}
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        toggleMask />

                </div>

                {/* CONFIRMAR SENHA */}
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i style={{ color: passwordConfirmOk ? 'green' : 'red' }} className="pi pi-lock"></i> </span>
                    </div>
                    <Password
                        name="passwordConfirm"
                        placeholder={registerTexts.RepeatPassword}
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange}
                        feedback={false}
                        toggleMask />

                </div>

                <div className="form-group">
                    <button type="submit"
                        ref="btn"
                        disabled={!enabledSubmit}
                        className="btn btn-primary btn-block">
                        {registerTexts.CreateAccount}
                    </button>
                </div>
                <p className="text-center">{registerTexts.HaveAnAccount} <a href="">{registerTexts.LogIn}</a> </p>
                <br />
                <div ref="loader" style={{ display: 'none' }}>
                    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                </div>

            </form>
        );
    }
}

const CreateUser = () => {
    return <CreateUserJxs />
};

export default CreateUser;