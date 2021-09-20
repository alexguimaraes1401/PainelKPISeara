import React, { Suspense, lazy } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Container from 'react-bootstrap/Container';

// Grab components out of the ReactRouterDOM that we will be using
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

import UserApi from './api/loginApi'

import 'react-pro-sidebar/dist/css/styles.css';
import './index.css';
import './css/sidebar-desktop.css';
import './css/login.css';
import './css/charts.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import NavbarMobile from './components/navbarMobile';
import NavbarDesktop from './components/navbarDesktop';
import SidebarDesktop from './components/sidebarDesktop';
import { Toast } from 'primereact/toast';

const ContactUs = lazy(() => import("./views/contactUs"));
const NotFoundPage = lazy(() => import("./views/notFoundPage"));
const DashViewAbsorcao = lazy(() => import("./views/dashViewAbsorcao"));
const PageTeste = lazy(() => import("./views/PageTeste"));
const DashViewNNCLog = lazy(() => import("./views/dashViewNNCLog"));
const DashViewNNCMP = lazy(() => import("./views/dashViewNNCMP"));
const DashViewRac = lazy(() => import("./views/rac"));
const Home = lazy(() => import("./views/home"));
const CreateUser = lazy(() => import("./views/createUser"));
const ListUsers = lazy(() => import("./views/listUsers"));
const EditUser = lazy(() => import("./views/editUser"));

function App() {
    const userKpiDigitalTemp = { name: 'admin', pass: 'admin' }
    const [state, setState] = React.useState({ username: "", password: "" });
    // const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const toast = React.useRef(null);

    const handleLogin = (e) => {
       
        const user = state;
        
        if(user.username.length < 1 || user.password.length < 1)
        {
            showInfo("Dados inválidos", "Os campos Usuário e Senha são obrigatórios",  6000)
            return;   
        }

        UserApi.post(user)
            .then(r => {
                if (r.status === 200) {
                    localStorage.setItem('user', JSON.stringify({ name: user.username, token: r.data }));
                    setIsAuthenticated(true);
                    window.location.reload(false);
                }
            }).catch((e,ex) => {
                if (e.response &&  e.response.status === 404) {
                    showInfo("Usuário não encontrado", "Por favor verifique usuário e senha e tente novamente.", 6000)
                }else {
                    showInfo("Nao foi possivel compeltar esta ação", "No momento não é possível completar esta ação.", 6000)
                }
                setIsAuthenticated(false);
            }).finally(() => {
            })
    }

    const showInfo = (summaryMesage, detailMessage, time) => {
        // toast.current.clear();
        toast.current.show({ severity: 'info', summary: summaryMesage, detail: detailMessage, life: time ?? 3000 });
    }
    
    const showError = (summaryMesage, detailMessage, time) => {
        // toast.current.clear();
        toast.current.show({ severity: 'error', summary: summaryMesage, detail: detailMessage, life: time ?? 3000 });
    }

    const handleLogout = (e) => {
        setUser({});
        setState({ username: "", password: "" })
        localStorage.clear();
        window.location.reload(false);
        setIsAuthenticated(false);
    };

    //Handlers
    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleInputChange = (e) => {
        e.preventDefault()
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let statetemp = { ...state };
        statetemp[name] = value
        setState({ ...statetemp });
    }

    /* Local Componentes */

    const Layout = ({ children }) => {
        return (
            <div className="pdfsize">
                <NavbarMobile username={user.name} handleLogout={handleLogout} />
                <NavbarDesktop username={user.name} handleLogout={handleLogout} />
                <SidebarDesktop />
                <Toast ref={toast} position="bottom-right"></Toast>
                <div className="main-content">
                    {children}
                </div>
            </div>
        );
    };

    const ChangePageLoader = () => {
        return (
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
        )
    }

    const loginfooter = <span>
        <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
    </span>;

    /* Se nao esta logado exibe tela de login: */
    if (!user) {
        return (
            <div className="global-container" >
                <Toast ref={toast} position="bottom-right"></Toast>
                <div className="card login-form">
                    <Card
                        title="Bem vindo"
                        subTitle="faça o login para acessar o sistema"
                        className="card-body"
                        footer={<span>
                            <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
                        </span>} >
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <InputText
                                    id="name1"
                                    name="username"
                                    style={{ width: '100%' }}
                                    value={state.username}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <label htmlFor="name1">Usuário</label>
                            </span>
                        </div>
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <Password
                                    id="pass"
                                    name="password"
                                    style={{ width: '100%' }}
                                    value={state.password}
                                    onChange={(e) => handleInputChange(e)}
                                    feedback={false}
                                    toggleMask />
                                <label htmlFor="pass">Senha</label>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    

    /*Exibe paginas no Router*/
    return (
        <Router>
            <Suspense fallback={<ChangePageLoader />}>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/PageTeste' component={PageTeste} />
                        <Route path='/absorcao' component={DashViewAbsorcao} />
                        <Route path='/cadastro' component={CreateUser} />
                        <Route path='/usuarios' component={ListUsers} />
                        <Route exact path='/usuario/:id' component={EditUser} />
                        <Route path='/nnclog' component={DashViewNNCLog} />
                        <Route path='/nncmp' component={DashViewNNCMP} />
                        <Route path='/rac' component={DashViewRac} />
                        <Route path='404' component={NotFoundPage} />
                        <Route path='*' component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Suspense>
        </Router>
    )
}

export default App;