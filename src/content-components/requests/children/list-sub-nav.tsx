import React, { useState } from "react";
import { FilterType } from "../ts/type"

interface ListRequestNavProps {
    filter_setter: React.Dispatch<React.SetStateAction<FilterType>>,
    search_setter: React.Dispatch<React.SetStateAction<string>>,
}
export const ListRequestNav = (props: ListRequestNavProps) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.search_setter(searchInput.trim());
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);

        //if its 0 call fnc again so user doesnt have to enter to re filter
        if (value.trim().length === 0) {
            props.search_setter('');
        }
    };
    return (
        <nav className="navbar navbar-expand-lg secondary-nav">
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
            <form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
                <input value={searchInput} onChange={handleChange} className="form-control me-2" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary" type='submit'>Search</button>
            </form>
        </nav>
    )
}