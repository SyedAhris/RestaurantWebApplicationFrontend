import React, {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Row, Col, FloatingLabel, Button, Form, Container} from 'react-bootstrap';
import './Login.css'
import Axios from 'axios';
import {UserContext} from '../UserContext'
import MyNavbar from '../components/MyNavbar';
function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);
    const [formValidated, setFormValidated] = useState(false);
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);
    const handleSubmit = (event) => {
        console.log('hello from handleSUbmit')
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('hello from handleSUbmit insde if')
            setFormValidated(false);
          event.preventDefault();
          event.stopPropagation();
        } else {
            Axios.post("http://localhost:3001/login", {
                userEmail: userEmail,
                userPassword: userPassword,
    
            }).then((response) => {
                console.log(response);
                if (response.data.message) {
                    setError(response.data.message);      
                } else {
                    
                    setUser(response.data[0]);
                    setIsLoggedIn(true);
                    console.log(response.data[0]);
                    console.log(user);
                }
            }); 
        }
        
        setValidated(true);
      };


    return (
        <>
        <MyNavbar/>
        <Container>
                { isLoggedIn ? <Navigate to="/menu" /> : null }
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <h1 className=" mt-5 p-3 text-center rounded"> Login</h1>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control required type="email" placeholder="name@example.com" onChange={(e) => {setUserEmail(e.target.value)}}/>
                            </FloatingLabel>

                            <FloatingLabel required controlId="floatingPassword" label="Password">
                                <Form.Control required type="password" placeholder="Password" onChange={(e) => {setUserPassword(e.target.value)}}/>
                            </FloatingLabel>
                            <div class="align-right">
                                <Button type='submit'  className='loginButton' variant="primary"  >Login</Button>
                            </div>
                            <Alert show={error} className="mt-3" variant='danger'> {error}</Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </>
    )
}

export default Login
