import React from 'react';
import {useState, useContext, useEffect} from 'react';
import AdminMyNavbar from './AdminMyNavbar';
import { Container, Table } from 'react-bootstrap';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import Axios from 'axios';
import { Alert, Row, Col, FloatingLabel, Button, Form} from 'react-bootstrap';


function EmployeesOfOrders() {
    const [employeesTable, setEmployeesTable] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [validated, setValidated] = useState(false);
    const [addOrdID, setAddOrdID] = useState(false);
    const [addEmpID, setAddEmpID] = useState(false);
    const [showTable, setShowTable] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getemployeesorderview')
            const emp = await response.json()
            setEmployeesTable(emp)
            console.log(employeesTable);
        }
        fetchData();
        
    },[]);

    const rerender = () => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getemployeesorderview')
            const emp = await response.json()
            setEmployeesTable(emp)
            console.log(employeesTable);
        }
        fetchData();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            Axios.post("http://localhost:3001/addorderhasemployees", {
                orderID: addOrdID,
                empID: addEmpID,
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    setError(response.data.err.code);      
                } else {
                    setSuccess("Success");
                    setEmployeesTable([]);
                    rerender();
                }
            }); 
        }
    }


    const deletee = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");
        console.log(event.currentTarget.id);
        const ordID = employeesTable[event.currentTarget.id].order_ID;
        const empID = employeesTable[event.currentTarget.id].emp_ID;
        console.log( ordID + " " + empID);
        Axios.post("http://localhost:3001/deleteorderhasemployees", {
            orderID: ordID,
            empID: empID,

        }).then((response) => {
            console.log(response);
            if (response.data.err) { 
                //deal with error
            } else {
                setEmployeesTable([]);
                rerender();
            }
        }); 
    }


    return (
        <>
            <AdminMyNavbar/>
            <Container>
            <Form className='mt-5' noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                    <Form.Control required type="number" placeholder="Order ID" onChange={(e) => {setAddOrdID(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="number" placeholder="Employee ID" onChange={(e) => {setAddEmpID(e.target.value)}}/>
                    </Col>
                </Row>
                <Button type='submit'  className='loginButton' variant="primary"  >Add</Button>
            </Form>
            <Alert show={error} className="mt-3" variant='danger'> {error}</Alert>
            <Alert show={success} className="mt-3" variant='success'> {success}</Alert>
            </Container>
            <Container show={showTable}>
             <Table  className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Employee Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesTable.map((employeesTable, k) => (
                         <tr id={employeesTable.emp_id,employeesTable.order_id} key={k}>
                            <td>{employeesTable.order_ID}</td>
                            <td>{employeesTable.emp_ID}</td>
                            <td>{employeesTable.emp_name}</td>
                            <td>{employeesTable.empcat_id}</td>
                            <td><Trash className='trash' id ={k}  onClick={e => deletee(e)}   variant="primary"/></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
            </Container>
        </>
    )
}

export default EmployeesOfOrders
