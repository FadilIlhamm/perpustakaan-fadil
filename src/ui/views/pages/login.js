import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    Input,
    
} from 'reactstrap';
import {
    setToken,
    setUsername,
    setPassword, 
} from '../../../action/actions';
import PerpustakaanServices from "../../../services/services"

class LoginPage extends Component {
    onSubmit = () => {
        const payload = {
            username: this.props.state.perpustakaan.username,
            password:this.props.state.perpustakaan.password
        }

        PerpustakaanServices.login(payload)
        .then(res => {
            console.log(res.data);
            if(res.data.message === "LOGIN SUCCESS"){
                this.props.setToken(res.data.data.token)
                this.props.setToken(`${res.data.data.token}`)
                this.props.history.push("/katalog")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render = () => {
        return(
            <Row className="text-center mt-5">
                <Col xs={3}></Col>
                <Col xs={6} className>
                    <Card>
                        <CardHeader><h2>Login</h2></CardHeader>
                        <CardBody>
                            <Form>
                                <Input 
                                type="text"
                                placeholder='username'
                                onChange={(e) => this.props.setUsername(e.target.value)}
                                value={this.props.state.perpustakaan.username}
                                />
                                <Input 
                                type="password"
                                placeholder='password'
                                onChange={(e) => this.props.setPassword(e.target.value)}
                                value={this.props.state.perpustakaan.password}
                                className='mt-2'
                                />
                                <Button
                                    className='mt-2'
                                    type='button'
                                    onClick={() => this.onSubmit()}
                                >
                                    Login
                                </Button>
                                <a href='#'><h5>Forgot Password?</h5></a>
                                <p>new user</p>
                                <Link to='/register'><Button>Register</Button></Link>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={3}></Col>
            </Row>
        )
    } 
}

const mapStateToProps=(state)=>({state:state})
const mapDispatchToProps=(dispatch)=>{
    return{
        setToken : (data) => dispatch(setToken(data)),
        setUsername : (data) => dispatch(setUsername(data)),
        setPassword : (data) => dispatch(setPassword(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)