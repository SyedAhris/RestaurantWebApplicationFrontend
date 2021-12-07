import React from 'react';
import {useState, useContext, useEffect} from 'react';
import AdminMyNavbar from './AdminMyNavbar';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import Axios from 'axios';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import { Alert, Row, Col, FloatingLabel, Button, Form} from 'react-bootstrap';
function Employees() {
    const [employeesTable, setEmployeesTable] = useState([]);
    const [addValidated, setAddValidated] = useState(false);
    const [updateValidated, setUpdateValidated] = useState(false);
    const [addError, setAddError] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [addEmpName, setAddEmpName] = useState("");
    const [addEmpCatID, setAddEmpCatID] = useState("");
    const [addHireDate, setAddHireDate] = useState("");
    const [addEmpCnic, setAddEmpCnic] = useState("");
    const [addEmpNumber, setAddEmpNumber] = useState("");
    const [addEmpSalary, setAddEmpSalary] = useState("");
    const [addEmpEmail, setAddEmpEmail] = useState("");
    const [addEmpPassword, setAddEmpPassword] = useState("");

    const [updateEmpID, setUpdateEmpID] = useState("");
    const [updateEmpName, setUpdateEmpName] = useState("");
    const [updateEmpCatID, setUpdateEmpCatID] = useState("");
    const [updateHireDate, setUpdateHireDate] = useState();
    const [updateEmpCnic, setUpdateEmpCnic] = useState("");
    const [updateEmpNumber, setUpdateEmpNumber] = useState("");
    const [updateEmpSalary, setUpdateEmpSalary] = useState("");
    const [updateEmpEmail, setUpdateEmpEmail] = useState("");
    const [updateEmpPassword, setUpdateEmpPassword] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getemployees')
            const emp = await response.json()
            setEmployeesTable(emp)
            for (var i =0 ; i<employeesTable.length; i++) {
                var date = new Date(employeesTable[i].hire_date);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var dt = date.getDate();
    
                if (dt < 10) {
                    dt = '0' + dt;
                  }
                  if (month < 10) {
                    month = '0' + month;
                  }
    
                  employeesTable[i].hire_date = (year+'-' + month + '-'+dt);
                  console.log(year+'-' + month + '-'+dt);
            }
        }
        fetchData();
        console.log(employeesTable);
    },[]);

    const rerender = () => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getemployees')
            const emp = await response.json()
            setEmployeesTable(emp)
            for (var i =0 ; i<employeesTable.length; i++) {
                var date = new Date(employeesTable[i].hire_date);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var dt = date.getDate();
    
                if (dt < 10) {
                    dt = '0' + dt;
                  }
                  if (month < 10) {
                    month = '0' + month;
                  }
    
                  employeesTable[i].hire_date = (year+'-' + month + '-'+dt);
                  console.log(year+'-' + month + '-'+dt);
            }
        }
        fetchData();
        console.log(employeesTable);
    };


    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        setUpdateSuccess("");
        setUpdateError("");
        console.log("updatesubmit")
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            console.log("cnic" + updateEmpCnic);
            Axios.post("http://localhost:3001/updateEmployees", {
                empID: updateEmpID,
                empName: updateEmpName,
                empCatID: updateEmpCatID,
                hireDate: updateHireDate,
                cnic: updateEmpCnic,
                number: updateEmpNumber,
                salary: updateEmpSalary,
                email: updateEmpEmail,
                password: updateEmpPassword,
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    setUpdateError(response.data.err.code);      
                } else if (response.data.affectedRows === 0) {
                    setUpdateError("Could not match any rows with the given ID");
                } else {
                    setUpdateSuccess("Success");
                    setEmployeesTable([]);
                    rerender();
                }
            }); 
        }
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();
        setAddSuccess("");
        setAddError("");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            console.log("cnic " + addEmpCnic);
            Axios.post("http://localhost:3001/addEmployees", {
                empName: addEmpName,
                empCatID: addEmpCatID,
                hireDate: addHireDate,
                cnic: addEmpCnic,
                number: addEmpNumber,
                salary: addEmpSalary,
                email: addEmpEmail,
                password: addEmpPassword,
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    setAddError(response.data.err.code);      
                } else {
                    setAddSuccess("Success");
                    setEmployeesTable([]);
                    rerender();
                }
            }); 
        }
    }
    return (
        <>
            <AdminMyNavbar/>
            <Container>
            <Form className='mt-5' noValidate validated={addValidated} onSubmit={handleAddSubmit}>
                <Row>
                    <Col>
                    <Form.Control required  placeholder="Name" onChange={(e) => {setAddEmpName(e.target.value)}} />
                    <Form.Control className='mt-3' required type='number'  placeholder="Number" onChange={(e) => {setAddEmpNumber(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="number" placeholder="Category ID" onChange={(e) => {setAddEmpCatID(e.target.value)}} />
                    <Form.Control className='mt-3' required type='number'  placeholder="Salary" onChange={(e) => {setAddEmpSalary(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="date"  placeholder="Hire Date" onChange={(e) => {setAddHireDate(e.target.value)}}/>
                    <Form.Control className='mt-3' required type='email'  placeholder="Email" onChange={(e) => {setAddEmpEmail(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="text"  placeholder="CNIC" onChange={(e) => {setAddEmpCnic(e.currentTarget.value)}} />
                    <Form.Control className='mt-3' required type='password'  placeholder="Password" onChange={(e) => {setAddEmpPassword(e.target.value)}} />
                    </Col>
                    
                </Row>
                <Button type='submit'  className='loginButton' variant="primary"  >ADD</Button>
            </Form>
            <Alert show={addError} className="mt-3" variant='danger'> {addError}</Alert>
            <Alert show={addSuccess} className="mt-3" variant='success'> {addSuccess}</Alert>
            </Container>

            <Container>
            <Form className='mt-5' noValidate validated={updateValidated} onSubmit={handleUpdateSubmit}>
                <Row>
                    <Col>
                    <Form.Control required  placeholder="Name" onChange={(e) => {setUpdateEmpName(e.target.value)}} />
                    <Form.Control className='mt-3' required type='number'  placeholder="Number" onChange={(e) => {setUpdateEmpNumber(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="number" placeholder="Category ID" onChange={(e) => {setUpdateEmpCatID(e.target.value)}} />
                    <Form.Control className='mt-3' required type='number'  placeholder="Salary" onChange={(e) => {setUpdateEmpSalary(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type="date"  placeholder="Hire Date" onChange={(e) => {setUpdateHireDate(e.target.value)}}/>
                    <Form.Control className='mt-3' required type='email'  placeholder="Email" onChange={(e) => {setUpdateEmpEmail(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required placeholder="CNIC" onChange={(e) => {setUpdateEmpCnic(e.target.value)}}/>
                    <Form.Control className='mt-3' required type='password'  placeholder="Password" onChange={(e) => {setUpdateEmpPassword(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required type='number'  placeholder="Employee ID" onChange={(e) => {setUpdateEmpID(e.target.value)}} />
                    </Col>
                </Row>
                <Button type='submit'  className='loginButton' variant="primary"  >UPDATE</Button>
            </Form>
            <Alert show={updateError} className="mt-3" variant='danger'> {updateError}</Alert>
            <Alert show={updateSuccess} className="mt-3" variant='success'> {updateSuccess}</Alert>
            </Container>


            <Container>
             <Table className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Category</th>
                        <th>CNIC</th>
                        <th>Hire Date</th>
                        <th>Salary (PKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesTable.map((employeesTable, k) => (
                         <tr id={employeesTable.emp_id} key={k}>
                            <td>{employeesTable.emp_id}</td>
                            <td>{employeesTable.emp_name}</td>
                            <td>{employeesTable.emp_email}</td>
                            <td>{employeesTable.emp_phone_no}</td>
                            <td>{employeesTable.emp_cat_name}</td>
                            <td>{employeesTable.CNIC_no }</td>
                            <td>{employeesTable.hire_date}</td>
                            <td>{employeesTable.salary}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
            </Container>
        </>
    )
}

export default Employees
