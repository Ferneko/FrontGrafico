import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../Home/Home'
import NaoEncontrado from '../404/NaoEncontrado'
import Grafico from "../Grafico/Grafico";
const Routas = () => (
    <BrowserRouter>
        <Switch>
       
                <Route exact path="/Grafico/:id/:champId/:nomeInvocador/:iconeId" component={Grafico} />
                <Route exact path="/" component={Home} />
                <Route path="*" component={NaoEncontrado} />
        </Switch>

    </BrowserRouter>

);
 
export default Routas;