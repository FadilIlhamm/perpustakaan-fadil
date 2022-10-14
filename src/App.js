import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable  from 'react-loadable';
import './App.scss'

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
const DefaultLayout = Loadable({
  loader : () => import('./ui/container/default-layout'),
  loading
})

export default class App extends Component{

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" name="Home" component={DefaultLayout}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

