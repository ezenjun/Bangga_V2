import React from 'react'
import './sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import sidebarItems from "../../assets/JSONdata/sidebarItems.json";

const SidebarItem = props=>{
    const active= props.isactive? 'active' : ''

    return(
        <div className="sidebar_item">
            <div className={`sidebar_item-inner ${active}`}>
                <i className={props.icon}></i>
                <span className="sidebar-text">
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = () => {
    const pathName = useLocation().pathname;

    return (
        <div className="Sidebar" >
            <div className="sidebar-items">
                {
                    sidebarItems.map((item, index)=>(
                        <Link className="links" to={item.route} key={index}>
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                isactive={item.route === pathName? true:false}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
