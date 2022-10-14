import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import routes from '../../routes';

class DefaultLayout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
    
    render = () => {
        return(
            <div className='app'>
                <div className="app-body">
                    <main>
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                <route.component {...props} />
                                            )} />
                                        ) :  null;
                                    })}
                                    <Redirect to="/"/>
                                </Switch>
                            </Suspense>

                        </Container>
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({state:state})

export default connect(mapStateToProps,null)(DefaultLayout) 