import React, {useEffect, useContext, useState, Fragment} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import axios from 'axios';
import NavBar from './NavBarP';
import Footer from './Footer';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {

    const { isAdmin} = useContext(ImagenContext);

    //State de usuarios
    const [usuarios, guardarUsuarios] = useState(0);
    //State max user
    const [maxUser, guardarMaxUser] = useState('');
    //State max reco
    const [maxReco, guardarMaxReco] = useState('');
    //State total reco
    const [totalReco, guardarTotalReco] = useState(0);
    //State de mostrar Dashboard
    const [mostrar, guardarMostrar] = useState(false);
    //State data
    const [dataRetro, guardarDataRetro] = useState([]);
    const [dataEmo, guardarDataEmo] = useState([]);
    //State opciones
    const [optionsRetro, guardarOptionsRetro] = useState([]);
    const [optionsEmo, guardarOptionsEmo] = useState([]);

    //Traer los datos del dashboard
    useEffect(() => {
        const consultarDatos = async () =>{
            const url = process.env.REACT_APP_API_BACKEND_URL + `/dashboard`;
            const response = await axios.get(url, {
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              });
            mostrarRetro(response.data.retros);
            mostrarEmociones(response.data.emotions);
            guardarTotalReco(getTotalReco(response.data.recomendations));
            let array = getMaxReco(response.data.recomendations).split('|');
            guardarMaxUser(array[0]);
            guardarMaxReco(array[1]);
            guardarUsuarios(response.data.users);
            if(dataRetro && dataEmo){
                guardarMostrar(true);
            }
            else{
                console.log('No hay data');
            }
            // guardarRetros(response.data.retros);
        }
        if(isAdmin){
            consultarDatos();
        }
    }, []);

    const getTotalReco = (recoArray) =>{
        let item = recoArray.find(x => x.nombre === 'admin');
        return item.recomendaciones;
    }

    const getMaxReco = (recoArray) =>{
        var array = recoArray.filter(item => item.nombre !== 'admin');
        var maxValue = Math.max(...array.map(item => item.recomendaciones));
        var item = array.find(x => x.recomendaciones === maxValue);
        return item.nombre + '|' + item.recomendaciones;
    }

    const mostrarEmociones = (emocionesArray) =>{
        let labelsEmo = [];
        let valoresEmo = [];
        let totalE = emocionesArray.find(x => x.nombre === 'total');
        let total = totalE.valor;
        emocionesArray.forEach(element => {
            if(element.nombre !== 'total')
            {
                labelsEmo.push(element.nombre);
                valoresEmo.push(element.valor / total);
            }
        });
        let data={
            labels: labelsEmo,
            datasets: [{
                label: 'Resultados',
                backgroundColor: ['green', 'lightblue', 'violet', 'gray', 'orange', 'blue', 'red', 'yellow'],
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,255,0,0.2)',
                hoverBorderColor: '#FF0000',
                data: valoresEmo
            }]
        };
        let opciones={
            responsive: true
        };
        guardarDataEmo(data)
        guardarOptionsEmo(opciones);
    };

    const mostrarRetro = (retroArray) =>{
        let labelsRetro = [];
        let valoresRetro = [];
        retroArray.forEach(element => {
            if(element.nombre !== 'total')
            {
                labelsRetro.push(element.nombre);
                valoresRetro.push(element.valor);
            }
        });
        let data={
            labels: labelsRetro,
            datasets: [{
                label: 'Resultados',
                backgroundColor: ['green', 'yellow', 'red'],
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,255,0,0.2)',
                hoverBorderColor: '#FF0000',
                data: valoresRetro
            }]
        };
        let opciones={
            maintainAspectRatio: false,
            responsive: true
        };
        guardarDataRetro(data)
        guardarOptionsRetro(opciones);
    };

    if(mostrar){
        return(
            <Fragment>
                <NavBar/>
                <div className="container mb-5">
                    <div className="row titulo-contenedor">
                        <h1 className="titulo-seccion">Dashboard:</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h1 className="class-Title center">Cantidad de usuarios</h1>
                                    <p className="titulo-seccion center">{usuarios}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h1 className="class-Title center">Total de recomendaciones guardadas</h1>
                                    <p className="titulo-seccion center">{totalReco}</p> 
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h1 className="class-Title center">Usuario con más recomendaciones</h1>
                                    <p className="titulo-seccion center">{maxUser}: {maxReco}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row center">
                        <div className="col-sm-6 col-md-6">
                            <div className="card center" >
                                <div className="card-body">
                                    <h1 className="class-Title center">Retroalimentación de usuarios</h1>
                                </div>
                                <div style={{width: '400px', height: '400px'}}>
                                    <Bar data={dataRetro} options={optionsRetro}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="card center">
                                <div className="card-body">
                                    <h1 className="class-Title center">Porcentajes de emociones</h1>
                                </div>
                                <div style={{width: '400px', height: '400px'}}>
                                    <Pie data={dataEmo} options={optionsEmo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        );
    }
    else{
        return (
            <Fragment>
                <NavBar/>
                <Footer/>
            </Fragment>
        );
    }
}
 
export default Dashboard;