import React, {useState, useContext} from 'react'
import { Alert, Row, Col, FloatingLabel, Button, Form, Container} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import {UserContext} from '../UserContext';
import MyNavbar from '../components/MyNavbar';
function SignUp() {
    // eslint-disable-next-line
    const [userEmail, setUserEmail] = useState(""); // eslint-disable-next-line
    const [userPassword, setUserPassword] = useState(""); // eslint-disable-next-line
    const [userName, setUserName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [formValidated, setFormValidated] = useState(false);
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setFormValidated(false);
          event.preventDefault(); 
          event.stopPropagation();
        } else {
            if (userPassword===userConfirmPassword) {
                Axios.post("http://localhost:3001/signup", {
                userName: userName,
                userNumber: userNumber,
                userAddress: userAddress,
                userEmail: userEmail,
                userPassword: userPassword,
    
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    if (response.data.err.code==="ER_DUP_ENTRY") {    
                        setError("Account with this email already exists");       
                    } else if (response.data.err.sqlMessage==="CONSTRAINT `check_cust_no` failed for `my_db`.`customers`") {    
                        setError("Customer number should start from 0 and should be 11 characters long.");       
                    }
                    
                }
                if (response.data.affectedRows) {
                    if(response.data.affectedRows===1){
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
                }
            }); 
              } else {
                  setError("Password Mismatch");
              }
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
                            <h1 className=" mt-0 p-3 text-center rounded"> Sign Up</h1>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control required type="email" placeholder="name@example.com" onChange={(e) => {setUserEmail(e.target.value)}}/>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control required type="text" placeholder="xyz" onChange={(e) => {setUserName(e.target.value)}} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Address"
                                className="mb-3"
                            >
                                <Form.Control required type="text" placeholder="xyz" onChange={(e) => {setUserAddress(e.target.value)}} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone Number"
                                className="mb-3"
                            >
                                <Form.Control required type="number" placeholder="xyz" onChange={(e) => {setUserNumber(e.target.value)}}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                <Form.Control required type="password" placeholder="Password" onChange={(e) => {setUserPassword(e.target.value)}}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                                <Form.Control required type="password" placeholder="Password" onChange={(e) => {setUserConfirmPassword(e.target.value)}}/>
                            </FloatingLabel>
                            <div class="align-right">
                                <Button type='submit' className='loginButton' variant="primary"  >Sign Up</Button>
                            </div>
                            <Alert show={error} className="mt-3" variant='danger'> 
                                {error}
                            </Alert>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </>
    )
}

export default SignUp
