import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Conexao from '../Conexao/Conexao';
import champs from '../championFull.json'
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            query: "",
            erro: null,
            filas: [],
            icone: "",
            level: 0,
            nomeInvocador: "",
            accountId:"",
            melhoresCampeoes: []


        }

        this.setQuery = this.setQuery.bind(this)
        this.enviarParaBackEnd = this.enviarParaBackEnd.bind(this);

    }

    componentDidMount() {

        /*
                Conexao.get("").then(resposta => {
                    const dados = resposta.data;
                    if (dados.erro != null) {
                        this.setState({ erro: dados.erro });
                    } else {
                        this.setState({
        
                            todasCasquinhas: dados.todasCasquinhas,
                            casquinhaId: dados.todasCasquinhas[0].id,
        
                            todosAdicionais: dados.todosAdicionais,
                            adicionalid: dados.todosAdicionais[0].id,
        
                            todosAcompanhamentos: dados.todosAcompanhamentos,
                            acompanhamentoId: dados.todosAcompanhamentos[0].id,
        
                            todosSabores: dados.todosSabores,
                            saboresid: dados.todosSabores[0].id
                        });
                    }
                });
                */
    }

    setQuery(e) {
        this.setState({
            query: e.target.value,
        })
    }





    enviarParaBackEnd() {



        Conexao.get("/Invocador/" + this.state.query).then(resposta => {

            const dados = resposta.data;
            console.log(dados.erro)
            if (dados.erro != null) {
                this.setState({ erro: dados.erro });
            } else {
                console.log(dados)
                this.setState({
                    filas: dados.filas,
                    icone: dados.icone,
                    level: dados.level,
                    nomeInvocador: dados.nomeInvocador,
                    accountId : dados.accountId,
                    melhoresCampeoes:dados.melhoresCampeoes,
                    erro: dados.mensagem
                });
                //this.props.history.push('/ListaRelatorioEstoque')
            }
        }).catch(error => {
            console.log(error)
        })


    }
    render() {
        return (
            <Layout>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"/> 
                {this.state.erro != null ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {this.state.erro}
                        <button type="button" onClick={() => this.setState({ erro: null })} className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    : ""}

                <div className="row">
                    <div className="col-3"></div>
                    <div className="input-group col-md-6">

                        <input type="text" className="form-control" placeholder="Nome de invocador" onChange={this.setQuery} />
                        <div className="input-group-append">
                            <button className="btn btn-success" onClick={this.enviarParaBackEnd} type="button"><i className="glyphicon glyphicon-search"></i> Buscar </button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        {this.state.filas.length > 0 ?
                            <table border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td colSpan="5"><h2>{this.state.nomeInvocador} - Level : {this.state.level}</h2></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">
                                            <img src={"/imagens/profileicon/" + this.state.icone + ".png"} width="100" height="100" alt="icone de invocador" />
                                        </td>
                                        <td>{this.state.filas[0].nomeFila} </td>
                                        <td> {this.state.filas[0].pontos} Pontos </td>
                                        <td> Vitórias: {this.state.filas[0].vitorias} </td>
                                        <td> Derrotas: {this.state.filas[0].derrotas}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.filas[1].nomeFila} </td>
                                        <td> {this.state.filas[1].pontos} Pontos </td>
                                        <td> Vitórias: {this.state.filas[1].vitorias} </td>
                                        <td> Derrotas: {this.state.filas[1].derrotas}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : ""}

                        <br />

                        {this.state.melhoresCampeoes.length > 0 ?
                            <table border="0" width="100%">
                                <thead>
                                <tr>
                                        <th colSpan="4" align="center"><h2>Melhores Campeões</h2></th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {console.log(champs)}
                                    {this.state.melhoresCampeoes.map( (item, i) => {
                                        return ( 
                                            <tr key={i}>
                                            <td>
                                                <Link to={"/grafico/"+this.state.accountId+"/"+item.idCampeao+"/"+this.state.nomeInvocador+"/"+this.state.icone}>
                                                <img src={"/imagens/champion/" + champs.keys[item.idCampeao] + ".png"} width="100" height="100" alt="campeao" />
                                                </Link>
                                           </td>
                                        <td>{champs.keys[item.idCampeao]}</td>
                                          
                                            <td> Level Maestria: {item.levelMaestria} </td>
                                           
                                       
                                          
                                            <td> Pontos Maestria: {item.pontosMaestria} </td>
                                           
                                        </tr>
                                      )}
                                    )}
                                   
                                   </tbody>
                            </table>
                            : ""
                        }
                    </div>
                    <div className="col-3">
                   
                    </div>
                </div>







            </Layout>);
    }
}
