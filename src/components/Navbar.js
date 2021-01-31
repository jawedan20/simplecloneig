import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav>
                <div className="container">
                    <div class="nav-wrapper">
                        <a href="#" class="brand-logo ">Logo</a>
                        <ul class="right hide-on-med-and-down">
                            <li><a href="/"><i class="material-icons">search</i></a></li>
                            <li><a href="/username"><i class="material-icons">view_module</i></a></li>
                            <li><a href="/message"><i class="material-icons">refresh</i></a></li>
                            <Link to="/message"><i class="material-icons">home</i></Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
