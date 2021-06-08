import React, { Suspense, lazy } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Container from 'react-bootstrap/Container';

// Grab components out of the ReactRouterDOM that we will be using
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

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
const DashViewNNCLog = lazy(() => import("./views/dashViewNNCLog"));
const DashViewNNCMP = lazy(() => import("./views/dashViewNNCMP"));
const DashViewRac = lazy(() => import("./views/rac"));
const Home = lazy(() => import("./views/home"));

function App() {
    const userKpiDigitalTemp = { name: 'admin', pass: 'admin' }
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState();
    const toast = React.useRef(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    
    const handleLogin = (e) => {
        if (username.toLocaleLowerCase() === userKpiDigitalTemp.name.toLocaleLowerCase() && password === userKpiDigitalTemp.pass) {
            setUser({ name: username, pass: password });
            localStorage.setItem('user', JSON.stringify({ name: username }));
            setIsAuthenticated(true);
        }
    }

    const handleLogout = (e) => {
        setUser({});
        setUsername("");
        setPassword("");
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


    /* Local Componentes */
    const Login = () => {
        const loginfooter = <span>
            <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
        </span>;
        return (
            <div className="global-container">
                <div className="card login-form">
                    <Card title="Bem vindo" subTitle="faça o login para acessar o sistema" className="card-body" footer={loginfooter} >
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="username">Usuário</label>
                            </span>
                        </div>
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                                <label htmlFor="in">Senha</label>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

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

    /* Se nao esta logado exibe tela de login: */
    if (!user) {
        return (
            <Login />
        )
    }

    

    /*Exibe paginas no Router*/
    return (
        <Router>
            <Suspense fallback={<ChangePageLoader />}>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/contact' component={ContactUs} />
                        <Route path='/absorcao' component={DashViewAbsorcao} />
                        <Route path='/nnclog' component={DashViewNNCLog} />
                        <Route path='/nncmp' component={DashViewNNCMP} />
                        <Route path='/rac' component={DashViewRac} />
                        <Route path='*' component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Suspense>
        </Router>
    )
}

export default App;