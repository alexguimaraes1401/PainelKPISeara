import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const NavbarDesktop = (props) => {

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Navbar bg="dark" variant="dark" fixed="top" className="navbar-desk" >
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="https://logodownload.org/wp-content/uploads/2014/12/seara-logo-1-1.png"
                    //width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Painel de KPIs
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Bem-vindo: <a href="#" style={{ textDecoration: 'none' }}>{capitalize(props.username)}</a>
                </Navbar.Text>
                &nbsp;
                &nbsp;
                <Navbar.Text>
                    <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => props.handleLogout(e)}>
                        <span style={{ cursor: 'pointer', color: 'rgb(255 255 255 / 50%)' }}>
                            Sair &nbsp;
                            <i style={{ cursor: 'pointer', color: '#fff' }} className="pi pi-sign-out"></i>
                        </span>
                    </a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarDesktop;