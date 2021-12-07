import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { Table, Alert, Modal, FloatingLabel, Form,Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import Axios from 'axios';
import { Trash } from 'react-bootstrap-icons';
import MyNavbar from '../components/MyNavbar'
import './Cart.css'
function Cart() {
    const [show, setShow] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [oo_id, setooId] = useState();
    const {cart, setCart} = useContext(UserContext); 
    const {cartTotal, setCartTotal} = useContext(UserContext); 
    const {user, setUser} = useContext(UserContext);
    const [userAddress, setUserAddress] = useState(user.cust_address);
    const [userNumber, setUserNumber] = useState(user.cust_number);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () =>{
        if (orderSuccess) {
            setCart([]);
            setCartTotal(0);
        }
        setModalShow(false);
    } 
    const handleModalShow = () => setModalShow(true);
    const cardOnClick = e => {
        setShow(true);
        e.preventDefault();
        setCartTotal(cartTotal-(cart[e.currentTarget.id].dish_price));
        if (cart[e.currentTarget.id].qty===1) {
            cart.splice(e.currentTarget.id,1);
        } else {
            cart[e.currentTarget.id].qty = cart[e.currentTarget.id].qty - 1;
        }
        setCart(cart);
        setShow(false);
    }
    const confirmOrder = () => {
        
    }
    const checkout = f => {
        console.log(modalShow);
        setModalShow(true);
    }
    useEffect(()=> {
        setShow(true);
    })

    const handleSubmit = (event) => {
        console.log('hello from handleSUbmit')
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('hello from handleSUbmit insde if')
          event.preventDefault();
          event.stopPropagation();
        } else {
            Axios.post("http://localhost:3001/addOnlineOrder", {
                custID: user.cust_id,
                totalPrice: cartTotal,
                number: userNumber,
                address: userAddress,

            }).then((response) => {
                console.log(response)
            }); 
            var x;
            for (var i = 0; i<cart.length;i++) {
            Axios.post("http://localhost:3001/addOnlineOrderDishes", {
                dishID: cart[i].dish_id,
                custID: user.cust_id,
                qty   : cart[i].qty,
            }).then((response) => {
                console.log(response);
                setooId(response.data[0]);
                console.log(oo_id);
                x= parseInt(response.data[0]);
            }); 
            }
            setOrderSuccess(true);

            
        }
        
        setValidated(true);
      };

    if (cart.length===0){
        return (
            <>
            <MyNavbar/>
            <Container>
                <h4 className='mt-5'>Looks like you have not added anything to your cart, move to Menu to add some dishes.</h4>
            </Container>
            </>
        )
    } else {
        return (
            <>
                    <MyNavbar/>
                        <Modal show={modalShow} onHide={handleModalClose} backdrop='static' keybaord={false}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Your Order</Modal.Title>
                </Modal.Header>
                <Form  noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control required type="number" defaultValue={user.cust_number} placeholder="xyz" onChange={(e) => {setUserNumber(e.target.value)}}/>
                    </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Address"
                            className="mb-3"
                        >
                            <Form.Control required type="text" defaultValue={user.cust_address} placeholder="xyz" onChange={(e) => {setUserAddress(e.target.value)}} />
                        </FloatingLabel>

                        <Table show={false} className='mt-5' striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Dish Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((cart, k) => (
                                <tr key={k}>
                                    <td>{k+1}</td>
                                    <td>{cart.dish_name}</td>
                                    <td>{cart.qty}</td>
                                    <td>{cart.dish_price * cart.qty}</td>
                                </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td></td>
                                    <td>{cartTotal}</td>
                                </tr>
                            </tbody>
                        </Table>
                </Modal.Body>
                <Modal.Footer>
                    {!orderSuccess ?  <><Button variant="secondary" onClick={handleModalClose}>Close</Button><Button type='submit' variant="primary">confirm</Button></>:<Alert  className="mt-3" variant='success'>Your order has been placed, it will be delivered to you shortly.</Alert> }
               
                </Modal.Footer>
                </Form>
            </Modal>
            <Container>
                <Row>
                    {cart.map((cart, k) => (
                        <Col show={show} className='mt-5' key={k} xs={12} md={6} lg={3}>
                            <Card  bg='light' border='primary'>
                                <Card.Body>
                                    <Card.Title>{cart.dish_name}</Card.Title>
                                    <Card.Text>{"Quantity" + cart.qty}</Card.Text>
                                    <Card.Text>{"PKR " + cart.dish_price * cart.qty}</Card.Text>
                                    <Card.Title><Trash className='trash' id ={k}  onClick={e => cardOnClick(e)}  variant="primary"/></Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                <h7 className='mt-5'>Your Cart Total: {cartTotal}</h7>
                </Row>
                <Button onClick={f => checkout(f)} type='button' className='rounded-pill mt-5 size-sm' variant="primary" >Proceed to Checout</Button>
            </Container>
        
            </>
        )
    }
}

export default Cart
