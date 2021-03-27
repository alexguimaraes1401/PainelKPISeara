import React from 'react';
import 'primeicons/primeicons.css'

const registerTexts = {
    SelectRole: "Select a role",
    FullName: "Full name",
    EmailAddress: "Email address",
    CreatePassword: "Create password",
    RepeatPassword: "Repeat password",
    HaveAnAaccount: "Have an account?",
    CreateAccount: "Create Account",
    LogIn: "Log In"
}

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            passwordConfirm: '',
            email: '',
            arr: [{ id: 1, value: "São Paulo", isChecked: false },
            { id: 2, value: "Ribeirão", isChecked: true },
            { id: 3, value: "Araraquara", isChecked: false }],
            roles: [{"Gerente": {

            }}]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    }

    handleSubmit(event) {
        alert('A user was submitted: ' + JSON.stringify(this.state, null, 4));
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {/* NOME COMPELTO */}
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="pi pi-user"></i> </span>
                    </div>
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder={registerTexts.FullName}
                        type="text" />
                </div>

                {/* EMAIL */}
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="pi pi-envelope"></i> </span>
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
                    <select className="form-control">
                        <option selected="">{registerTexts.SelectRole}</option>
                        <option>Designer</option>
                        <option>Manager</option>
                        <option>Accaunting</option>
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
                        <span className="input-group-text"> <i className="pi pi-lock"></i> </span>
                    </div>
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder={registerTexts.CreatePassword}
                        type="password" />
                </div>

                {/* CONFIRMAR SENHA */}
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="pi pi-lock"></i> </span>
                    </div>
                    <input
                        name="passwordConfirm"
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder={registerTexts.RepeatPassword}
                        type="password" />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> {registerTexts.CreateAccount}  </button>
                </div>
                <p className="text-center">{registerTexts.HaveAnAccount} <a href="">{registerTexts.LogIn}</a> </p>
                <br />

            </form>
        );
    }
}

const CreateUser = () => {
    return <Reservation />
};

export default CreateUser;