import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Conexao from '../Conexao/Conexao'
import { Chart } from "react-google-charts";
import champs from '../championFull.json'

export default class Grafico extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            champId: this.props.match.params.champId,
            query: "",
            erro: null,
            filas: [],
            icone: this.props.match.params.iconeId,
            level: 0,
            nomeInvocador: this.props.match.params.nomeInvocador,
            melhoresCampeoes: [],
            listaPartidas: [],
            dadosGrafico: [],
            dadosGrafico2: [],
            optionsGrafico: {

            }
        }



    }

    componentDidMount() {

        Conexao.post("/Partidas", {
            invocadorId: this.state.id,
            championId: Number(this.state.champId)
        }).then(resposta => {
            const dados = resposta.data;

            if (dados.erro != null) {
                this.setState({ erro: dados.erro });
            } else {

                this.setState({
                    listaPartidas: dados.listaPartidas,

                });

                var dadosGraficos = [
                    ["Data", "Ouro obtido", "Dano",]
                ]
                this.state.listaPartidas.forEach(item =>

                    dadosGraficos.push([
                        item.dataPartida,
                        Number(item.detalhes.ouroObtido),

                        Number(item.detalhes.totalDanoToChampions),
                    ])

                );

                var dadosGraficos2 = [
                    ["Data", "Wards", "Abates", "Mortes", "Assistencias"]
                ]
                this.state.listaPartidas.forEach(item =>

                    dadosGraficos2.push([
                        item.dataPartida,

                        Number(item.detalhes.totalWards),
                        Number(item.detalhes.abates),
                        Number(item.detalhes.mortes),
                        Number(item.detalhes.assistencias)])

                );


                this.setDadosgrafico(dadosGraficos, dadosGraficos2);


            }
        }).catch(error => {
            console.log(error)

        })

    }

    setDadosgrafico(colunas, colunas2) {

        this.setState({ dadosGrafico: colunas, dadosGrafico2: colunas2 })
    }

    render() {
        return (<Layout>
            {this.state.erro != null ?
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.erro}
                    <button type="button" onClick={() => this.setState({ erro: null })} className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                : ""}
            <div className="row">
                <div className="col-3">
                    <img src={"/imagens/profileicon/" + this.state.icone + ".png"} width="40" height="40" alt="icone de invocador" /> <h3>{this.state.nomeInvocador}</h3>
                </div>
                <div className="col-3">
                <img src={"/imagens/champion/" + champs.keys[this.state.champId] + ".png"} width="40" height="40" alt="campeao" /><h3>{champs.keys[this.state.champId]}</h3>
                </div>
                <div className="col-3">

                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-6">

                    <Chart
                        width={'100%'}
                        height={'350px'}
                        chartType="ColumnChart"
                        data={this.state.dadosGrafico}
                        options={this.state.optionsGrafico}
                    />


                </div>
                <div className="col-6">

                    <Chart
                        width={'100%'}
                        height={'350px'}
                        chartType="ColumnChart"
                        data={this.state.dadosGrafico2}
                        options={this.state.optionsGrafico}
                    />


                </div>
            </div>

            <div className="row">

                <div className="col-md-12">
                    <table width="100%" border="2">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Posição</th>
                                <th>Resultado</th>
                                <th>KDA</th>
                                <th>Ouro</th>
                                <th>Farm</th>
                                <th>Dano</th>
                                <th>Wards</th>
                                <th colSpan="2">Feitiço</th>

                                <th colSpan="6">Itens</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                this.state.listaPartidas.map((item) => {

                                    return (
                                        <tr>
                                            <td>{item.dataPartida}</td>
                                            <td>{item.lane}</td>
                                            <td>{item.detalhes.vitoria === true ? "Vitoria" : "Derrota"}</td>

                                            <td>{item.detalhes.abates}/{item.detalhes.mortes}/{item.detalhes.assistencias}</td>
                                            <td>{item.detalhes.ouroObtido}</td>
                                            <td>{item.detalhes.totalMinionsFarmados}</td>
                                            <td>{item.detalhes.totalDanoToChampions}</td>
                                            <td>{item.detalhes.totalWards}</td>
                                            <td><img src={"/imagens/item/" + item.detalhes.feitico1 + ".png"} width="40" height="40" alt="feitiço1" /></td>
                                            <td><img src={"/imagens/item/" + item.detalhes.feitico2 + ".png"} width="40" height="40" alt="feitiço2" /></td>
                                            <td>{Number(item.detalhes.item0) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item0 + ".png"} width="40" height="40" alt={item.detalhes.item0} />}</td>
                                            <td>{Number(item.detalhes.item1) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item1 + ".png"} width="40" height="40" alt={item.detalhes.item1} />}</td>
                                            <td>{Number(item.detalhes.item2) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item2 + ".png"} width="40" height="40" alt={item.detalhes.item2} />}</td>
                                            <td>{Number(item.detalhes.item3) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item3 + ".png"} width="40" height="40" alt={item.detalhes.item3} />}</td>
                                            <td>{Number(item.detalhes.item4) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item4 + ".png"} width="40" height="40" alt={item.detalhes.item4} />}</td>
                                            <td>{Number(item.detalhes.item5) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item5 + ".png"} width="40" height="40" alt={item.detalhes.item5} />}</td>
                                            <td>{Number(item.detalhes.item6) === 0 ? "" : <img src={"/imagens/item/" + item.detalhes.item6 + ".png"} width="40" height="40" alt={item.detalhes.item6} />}</td>

                                        </tr>
                                    )
                                }

                                )

                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </Layout>);
    }
}