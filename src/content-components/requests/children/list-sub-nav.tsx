import React, { useState } from "react";
import { FilterType } from "../ts/type"

interface ListRequestNavProps {
    filter_setter: React.Dispatch<React.SetStateAction<FilterType>>,
}
export const ListRequestNav: React.FC<ListRequestNavProps> = (props) => {
 
    return (
        <nav className="navbar navbar-expand-lg secondary-nav pr-0 pl-0 me-0 ms-0">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.filter_setter('all')}>🟢 Open</a>
                    </li>
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.filter_setter('with')}>👤 Assigned</a>
                    </li>
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.filter_setter('without')}>❓ Unassigned</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}