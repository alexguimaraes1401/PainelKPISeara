import React from 'react';
import { itemsPanelMenu } from '../domain/constants';
import { PanelMenu } from 'primereact/panelmenu';

const SidebarDesktop = () => {
    return (
        <div className="sidebar-desk">
            <nav className="col-md-2 d-none d-md-block sidebar pl-0 pr-0">
                <div className="sidebar-sticky">
                    <PanelMenu model={itemsPanelMenu} />
                    {/*Setas para esconder menu*/}
                    {/* <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                        <i style={{ 'fontSize': '1.4em', cursor: 'pointer', color: 'rgb(73 80 87)' }} className="pi pi-angle-double-left"></i>
                    </div> */}
                </div>
            </nav>
        </div>
        )
}

export default SidebarDesktop;