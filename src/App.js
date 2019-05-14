import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import file from './Step1.json';

const fs = require('fs');


export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file,
            cityIDList: [],
            cities: '',
            cityIDString: '',
            data: [],
            ready:false

        }
    }

    componentWillMount() {
        this.setState({
            cities : file.List
        }, () =>{
            for(let i=0;i<this.state.cities.length;i++){
                this.state.cityIDList[i]=this.state.cities[i].CityCode

            }
            this.createString()
            const that = this
            axios.get('http://api.openweathermap.org/data/2.5/group?id='+this.state.cityIDString+'&units=metric&appid=dfdb43df91ab4df1b4858ada62183a0c')
                .then(res => {
                    const data = res.data.list.map(obj => obj);
                    console.log(data)
                    this.setState({ data },()=>{this.setState({ready:true})});
                });


        });

    }

    createString(){
        for(let i=0;i<this.state.cityIDList.length;i++){
            this.state.cityIDString+=this.state.cityIDList[i]
            if(i!=this.state.cityIDList.length-1)
                this.state.cityIDString+=","
        }
        console.log(this.state.cityIDString)
    }

    render() {


        return (

            <div className="App">
                {this.state.ready ? (
                  this.state.data.map((obj)=>{
                      return(
                          <div>
                              {obj.weather.map((obj)=>{
                                  return(
                                      <div>Weather Description: {obj.description}</div>
                                  )
                              })}
                          <div>Tempeture: {obj.main.temp}</div>
                          <div>Id: {obj.id}</div>
                            <div>Name: {obj.name}</div><br/>
                          </div>
                      )
                  })
                ) : (
                <div></div>
                    )}
            </div>

        )
    }
}