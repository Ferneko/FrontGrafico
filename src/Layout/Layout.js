import React, { Component } from 'react'
import './Layout.css';
import { Link } from 'react-router-dom';


export default class extends Component {

    render() {
        return (<div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <div className="navbar-brand col-sm-3 col-md-2 mr-0">
                <Link to={"/"}>
                    Mecanics League
                    </Link>
                    </div>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <div className="nav-link" href="#">Sair do sistema</div>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <main role="main" className="col-12">
                        <br/>
                        {this.props.children}
                    </main>
                </div>
            </div>
        </div>
        )
    }
}