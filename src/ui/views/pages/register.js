import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    setAddress,
    setProfileName 
} from '../../../action/actions';
import PerpustakaanServices from "../../../services/services"


 class RegisterPage extends Component {

    onSubmit = () => {
        const payload = {
            username: this.props.state.perpustakaan.username,
            password:this.props.state.perpustakaan.password,
            profileName:this.props.state.perpustakaan.profileName,
            address:this.props.state.perpustakaan.address,
        }
        console.log(payload);
        PerpustakaanServices.register(payload)
        .then(res => {
            console.log(res.data);
            if(res.status === 200){
                this.props.setUsername("")
                this.props.setPassword("")
                this.props.setProfileName("")
                this.props.setAddress("")
                this.props.history.push("/login")
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
                        <CardHeader><h2>Register</h2></CardHeader>
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
                                className='mt-2'
                                onChange={(e) => this.props.setPassword(e.target.value)}
                                value={this.props.state.perpustakaan.password}
                                />
                                <Input 
                                type="text"
                                placeholder='Profile Name'
                                className='mt-2'
                                onChange={(e) => this.props.setProfileName(e.target.value)}
                                value={this.props.state.perpustakaan.profileName}
                                />
                                <Input 
                                type="textarea" 
                                name="address" 
                                id="address"
                                placeholder='Address'
                                className='mt-2'
                                onChange={(e) => this.props.setAddress(e.target.value)}
                                value={this.props.state.perpustakaan.address}
                                />
                                <Button
                                className='mt-2'
                                type='button'
                                onClick={() => this.onSubmit()}
                                >
                                Sign Up
                                </Button>
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
        setProfileName : (data) => dispatch(setProfileName(data)),
        setAddress : (data) => dispatch(setAddress(data)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage)