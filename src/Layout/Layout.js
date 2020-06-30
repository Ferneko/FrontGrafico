import React, { Component } from 'react'
import './Layout.css';
import { Link } from 'react-router-dom';


export default class extends Component {

    render() {
        return (<div>
           <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@800&display=swap" rel="stylesheet"/> 
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-5"  id="telaInicial"> 
                <div className="col-sm-8 col-md-2 mr-0" id="title">
                    <Link to={"/"} id="font">
                        <b>Mecanics League</b>
                    </Link>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <main role="main" className="col-12">
                        <br />
                        {this.props.children}
                    </main>
                </div>
            </div>
        </div>
        )
    }
}