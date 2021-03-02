import React from 'react';
import { Avatar } from 'primereact/avatar';
import { PanelMenu } from 'primereact/panelmenu';
import { itemsPanelMenu } from '../domain/constants';
import '../css/sidebar-mobile.css';

const NavbarMobile = (props) => {
    return (<div className="header-nav-bar-mobile">
        <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
            <div className="spinner diagonal part-1"></div>
            <div className="spinner horizontal"></div>
            <div className="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">
            <ul className="sidebarMenuInner mt-5">
                <li>
                    <Avatar icon="pi pi-user" className="p-mr-2" style={{ height: 24, width: 24, backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
            &nbsp; {props.username}
                    <span>Web Developer</span>
                </li>
                {/* <li><a href="https://vanila.io" target="_blank">Company</a></li>
                    <li><a href="https://instagram.com/plavookac" target="_blank">Instagram</a></li> */}
                <div className="sidebar-sticky">
                    <PanelMenu model={itemsPanelMenu} />
                    <div style={{ cursor: 'pointer', position: 'absolute', bottom: '15px', left: '15px' }} onClick={(e) => props.handleLogout(e)}>
                        <li>
                            <i style={{ cursor: 'pointer', color: 'rgb(33 37 41)' }} className="pi pi-sign-out"></i>
                    &nbsp; Logout
                </li>
                    </div>
                </div>
            </ul>
        </div>
    </div>)
}

export default NavbarMobile;