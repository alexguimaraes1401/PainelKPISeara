
import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import '../css/login.css';


function Login(username, password, handleLogin, setUsername, setPassword, setUser) {

    // const userKpiDigitalTemp = { name: 'admin', pass: 'admin' }
    // const [username, setUsername] = React.useState("");
    // const [password, setPassword] = React.useState("");
    // const [user, setUser] = React.useState()

    // const handleLogin = (e) => {
    //     console.log('handleLogin')
    //     if (username.toLocaleLowerCase() === userKpiDigitalTemp.name.toLocaleLowerCase() && password === userKpiDigitalTemp.pass) {
    //         setUser({ name: username, pass: password });
    //         localStorage.setItem('user', JSON.stringify({ name: username }));
    //     }
    // }

    const footer = <span>
        <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
    </span>;

    return (<div className="global-container">
        <div className="card login-form">
            <Card title="Bem vindo" subTitle="faça o login para acessar o sistema" className="card-body" footer={footer} >
                <div className="pt-4 p-field p-grid">
                    {/* <h5>Usuário</h5>
                <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} /> */}
                    <span className="p-float-label">
                        <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Usuário</label>
                    </span>
                </div>
                <div className="pt-4 p-field p-grid">
                    {/* <h5>Senha</h5>
                <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask /> */}
                    <span className="p-float-label">
                        <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                        <label htmlhtmlFor="in">Senha</label>
                    </span>
                </div>
            </Card>
        </div>
    </div>)
}

export default Login;