import React from 'react'
import AdminMyNavbar from './AdminMyNavbar'
import { Form ,ListGroup, Table,Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import {useState, useContext, useEffect} from 'react';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import Axios from 'axios';
function AddOrders() {
    const {adminCart, setAdminCart} = useContext(UserContext);
    const {adminCartTotal, setAdminCartTotal} = useContext(UserContext);
    const [dishes, setDishes] = useState([]);
    const [showCart, setShowCart] = useState(true);
    const [chef, setChef] = useState([]);
    const [waiter, setWaiter] = useState([]);
    const [cashier, setCashier] = useState([]);
    const [chosenChef, setChosenChef] =useState();
    const [chosenWaiter, setChosenWaiter] =useState();
    const [chosenCashier, setChosenCashier] =useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getdishes')
            const dish = await response.json()
            setDishes(dish)
        }
        fetchData();
        console.log(dishes);
        const fetchChef = async () => {
            const response = await fetch('http://localhost:3001/getChef');
            const ch = await response.json();
            setChef(ch);
            setChosenChef( ch[0].emp_id+' '+ch[0].emp_name);
        }
        fetchChef();
        console.log(chosenChef);
        console.log(chef)
        const fetchWaiter = async () => {
            const response = await fetch('http://localhost:3001/getWaiter')
            const ch = await response.json()
            setWaiter(ch)
            setChosenWaiter( ch[0].emp_id+' '+ch[0].emp_name);
        }
        fetchWaiter();
        console.log(waiter);
        const fetchCashier = async () => {
            const response = await fetch('http://localhost:3001/getCashier')
            const ch = await response.json()
            setCashier(ch)
            setChosenCashier( ch[0].emp_id+' '+ch[0].emp_name);
        }
        fetchCashier();
        console.log(cashier);
    },[]);

    useEffect(()=> {
        setShowCart(true);
    })

    const cardOnClick = e => {
        e.preventDefault();
        setShowCart(false);
        var qtyIncreased = false;
        for (var i = 0; i<adminCart.length;i++) {
            if (adminCart[i].dish_id===dishes[e.target.id].dish_id) {
                console.log('hello from multiple items')
                adminCart[i].qty = adminCart[i].qty + 1;
                qtyIncreased = true;
            }
        }
        if (!qtyIncreased) {
            var pushData = dishes[e.target.id]; 
            pushData.qty = 1
            adminCart.push(pushData);
        }
        setAdminCartTotal(adminCartTotal+dishes[e.target.id].dish_price);
        console.log(adminCart);
        
    }
    const deleteFromCart = e => {
        setShowCart(true);
        e.preventDefault();
        setAdminCartTotal(adminCartTotal-(adminCart[e.currentTarget.id].dish_price));
        if (adminCart[e.currentTarget.id].qty===1) {
            adminCart.splice(e.currentTarget.id,1);
        } else {
            adminCart[e.currentTarget.id].qty = adminCart[e.currentTarget.id].qty - 1;
        }
        setAdminCart(adminCart);
        setShowCart(false);
    }

    const confirm = f => {
        console.log("hello confirm click");
        f.preventDefault();
        Axios.post("http://localhost:3001/addOrder", {
                totalPrice: adminCartTotal,

        }).then((response) => {
                console.log(response)
        }); 
        for (var i = 0; i<adminCart.length;i++) {
            Axios.post("http://localhost:3001/addOrderDishes", {
                dishID: adminCart[i].dish_id,
                qty   : adminCart[i].qty,
            }).then((response) => {
                console.log(response);
            }); 
        }
        setAdminCart([]);
            console.log(adminCart);
            setAdminCartTotal(0);
        console.log(chosenChef)
        Axios.post("http://localhost:3001/addOrderEmployee", {
                empID: parseInt(chosenChef.substring(0,1)),
            }).then((response) => {
                console.log(response);
            }); 
            Axios.post("http://localhost:3001/addOrderEmployee", {
                empID: parseInt(chosenWaiter.substring(0,1)),
            }).then((response) => {
                console.log(response);
            }); 
            Axios.post("http://localhost:3001/addOrderEmployee", {
                empID: parseInt(chosenCashier.substring(0,1)),
            }).then((response) => {
                console.log(response);
            }); 
            setAdminCart([]);
            console.log(adminCart);
            setAdminCartTotal(0);
            
}


    return (
        <>
            <AdminMyNavbar/>
            <Container>
            <h1 className='mt-5'> Menu </h1>
            <Row>
                {dishes.map((dishes, k) => (
                    <Col className='mt-5' key={k} xs={12} md={4} lg={3}>
                        <Card bg='light' border='primary'>
                            
                            <Card.Body>
                                <Card.Title>{dishes.dish_name}</Card.Title>
                                <Card.Text>{dishes.dish_desc}</Card.Text>
                                <Card.Text>{"PKR " + dishes.dish_price}</Card.Text>
                                <Button id ={k}  onClick={e => cardOnClick(e)} variant="primary">+</Button>
                            </Card.Body>
                        
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        <hr/>
        <Container>
                <Row>
                    {adminCart.map((adminCart, k) => (
                        <Col show={showCart} className='mt-5' key={k} xs={12} md={6} lg={3}>
                            <Card  bg='light' border='primary'>
                                <Card.Body>
                                    <Card.Title>{adminCart.dish_name}</Card.Title>
                                    <Card.Text>{"Quantity=" + adminCart.qty}</Card.Text>
                                    <Card.Text>{"PKR " + adminCart.dish_price * adminCart.qty}</Card.Text>
                                    <Card.Title><Trash className='trash' id ={k} onClick={e => deleteFromCart(e)}   variant="primary"/></Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                <h7 className='mt-5'>Your Cart Total: {adminCartTotal}</h7>
                </Row>

                <Container>
                <Form>
                    <p>Choose Chef:</p>
                    <Form.Select onChange={(e) => {setChosenChef(e.target.value)}} aria-label="Default select example">
                        {chef.map((chef, k)=>(
                            <option value={k}>{chef.emp_id + ' ' + chef.emp_name}</option>
                        ))}
                    </Form.Select>
                    <p>Choose Waiter:</p>
                    <Form.Select onChange={(e) => {setChosenWaiter(e.target.value)}} aria-label="Default select example">
                         {waiter.map((waiter, k)=>(
                            <option value={k}>{waiter.emp_id + ' ' + waiter.emp_name}</option>
                        ))}
                    </Form.Select>
                    <p>Choose Cashier:</p>
                    <Form.Select onChange={(e) => {setChosenCashier(e.target.value)}} aria-label="Default select example">
                        {cashier.map((cashier, k)=>(
                            <option value={k}>{cashier.emp_id + ' ' + cashier.emp_name}</option>
                        ))} 
                    </Form.Select>
                </Form>
                </Container>

                <Button onClick={f => confirm(f)}  className=' mt-5 size-sm' variant="primary" >Confirm Order</Button>
            </Container>
        </>
    )
}

export default AddOrders
