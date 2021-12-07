import React from 'react';
import {useState, useContext, useEffect} from 'react';
import AdminMyNavbar from './AdminMyNavbar';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import Axios  from 'axios';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import { Alert, Row, Col, FloatingLabel, Button, Form} from 'react-bootstrap';

function Dishes() {
    const {admin, setAdmin} = useContext(UserContext);
    const [dishesTable, setDishesTable] = useState([]);
    const [addValidated, setAddValidated] = useState(false);
    const [updateValidated, setUpdateValidated] = useState(false);
    const [addError, setAddError] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [addSuccess, setAddSuccess] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState("");
    const [addDishName, setAddDishName] = useState("");
    const [addDishDescription, setAddDishDescription] = useState("");
    const [addDishPrice, setAddDishPrice] = useState("");
    const [updateDishID,setUpdateDishID] = useState("");
    const [updateDishName,setUpdateDishName] = useState("");
    const [updateDishDescription,setUpdateDishDescription] = useState("");
    const [updateDishPrice,setUpdateDishPrice] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getdishes')
            const dishes = await response.json()
            setDishesTable(dishes)
        }
        fetchData();
        console.log(dishesTable);
    },[]);

    const rerender = () => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getdishes')
            const dishes = await response.json()
            setDishesTable(dishes)
        }
        fetchData();
        console.log(dishesTable);
    };

    const handleAddSubmit = (event) => {
        event.preventDefault();
        setAddSuccess("");
        setAddError("");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            Axios.post("http://localhost:3001/addDishes", {
                dishName: addDishName,
                dishDescription: addDishDescription,
                dishPrice: addDishPrice,
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    setAddError(response.data.err.code);      
                } else {
                    setAddSuccess("Success");
                    setDishesTable([]);
                    rerender();
                }
            }); 
        }
    }
    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        setUpdateSuccess("");
        setUpdateError("");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            Axios.post("http://localhost:3001/updateDishes", {
                dishID: updateDishID,
                dishName: updateDishName,
                dishDescription: updateDishDescription,
                dishPrice: updateDishPrice,
    
            }).then((response) => {
                console.log(response);
                if (response.data.err) {
                    setUpdateError(response.data.err.code);      
                } else if (response.data.affectedRows === 0) {
                    setUpdateError("Could not match any rows with the given ID");
                } else {
                    setUpdateSuccess("Success");
                    setDishesTable([]);
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
                    <Form.Control required  placeholder="Name" onChange={(e) => {setAddDishName(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required  placeholder="Description" onChange={(e) => {setAddDishDescription(e.target.value)}}/>
                    </Col>
                    <Col>
                    <Form.Control required type="number" placeholder="Price" onChange={(e) => {setAddDishPrice(e.target.value)}}/>
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
                    <Form.Control required type="number" placeholder="ID" onChange={(e) => {setUpdateDishID(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required  placeholder="Name" onChange={(e) => {setUpdateDishName(e.target.value)}} />
                    </Col>
                    <Col>
                    <Form.Control required  placeholder="Description" onChange={(e) => {setUpdateDishDescription(e.target.value)}}/>
                    </Col>
                    <Col>
                    <Form.Control required type="number" placeholder="Price" onChange={(e) => {setUpdateDishPrice(e.target.value)}}/>
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
                        <th>Dish ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price (PKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishesTable.map((dishesTable, k) => (
                         <tr id={dishesTable.dish_id} key={k}>
                            <td>{dishesTable.dish_id}</td>
                            <td>{dishesTable.dish_name}</td>
                            <td>{dishesTable.dish_desc}</td>
                            <td>{dishesTable.dish_price}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
        </Container>
        </>
    )
}

export default Dishes
