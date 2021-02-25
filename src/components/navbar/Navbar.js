import React  from 'react'
import { Redirect } from 'react-router-dom'

import {connect} from 'react-redux'

function Navbar({user}) {
    if(user === null) return <Redirect to={'/login'} />  
    
    document.addEventListener('DOMContentLoaded', function () {
        const M = window.M;
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {});
    });

    return (
        <div className="navbar-fixed">
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo ">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/"><i className="material-icons">home</i></a></li>
                            <li><a href="/create"><i className="material-icons">control_point</i></a></li>
                            <li><a className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">people</i></a></li>
                        </ul>
                        <ul id='dropdown1' className='dropdown-content'>
                            <li><a href={`/profile/${user.username}`}>Profile</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href='/logout'>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.auth.user
    }
}
export default connect(mapStateToProps)(Navbar) ;