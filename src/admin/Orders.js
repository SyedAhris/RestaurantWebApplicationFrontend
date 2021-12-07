import React from 'react'
import AdminMyNavbar from './AdminMyNavbar'
import { ListGroup, Table,Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import {useState, useContext, useEffect} from 'react';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import Axios from 'axios';
function Orders() {

    const [orderTable, setOrderTable] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getorderview')
            const emp = await response.json()
            setOrderTable(emp)
            console.log(emp);
            console.log(orderTable)
            for (var i =0 ; i<orderTable.length; i++) {
                var date = new Date(orderTable[i].order_date);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var dt = date.getDate();
    
                if (dt < 10) {
                    dt = '0' + dt;
                  }
                  if (month < 10) {
                    month = '0' + month;
                  }
    
                  orderTable[i].order_date = (year+'-' + month + '-'+dt);
                  console.log(year+'-' + month + '-'+dt);
            }
        }
        fetchData();
        
    },[]);


    const rerender = () => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getorderview')
            const emp = await response.json()
            setOrderTable(emp)
            console.log(emp);
            console.log(orderTable)
            for (var i =0 ; i<orderTable.length; i++) {
                var date = new Date(orderTable[i].order_date);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var dt = date.getDate();
    
                if (dt < 10) {
                    dt = '0' + dt;
                  }
                  if (month < 10) {
                    month = '0' + month;
                  }
    
                  orderTable[i].order_date = (year+'-' + month + '-'+dt);
                  console.log(year+'-' + month + '-'+dt);
            }
        }
        fetchData();
    };

    const deletee = (event) => {
        event.preventDefault();
        console.log(event.currentTarget.id);
        const ordID = orderTable[event.currentTarget.id].order_id;
        const dishID = orderTable[event.currentTarget.id].dish_id;
        const qty = orderTable[event.currentTarget.id].qty;
        console.log( ordID + " " + dishID + " " + qty);
        if (qty === 1) {
            Axios.post("http://localhost:3001/deleteorderdishes", {
                orderID: ordID,
                dishID: dishID,
                qty: qty,

            }).then((response) => {
                console.log(response);
                if (response.data.err) { 
                    console.log(response.data.err)
                } else {
                    Axios.post("http://localhost:3001/getorderhasdishes", {
                                ordID: ordID,
                            }).then((res)=> {
                                console.log(res);
                                if (res.data.length === 0) {
                                    console.log("yes it was last element")
                                    Axios.post("http://localhost:3001/deleteorderandemployees", {
                                        orderID: ordID,
                                        }).then((response)=> {
                                            console.log(response);
                                        });
                                }
                                setOrderTable([]);
                                rerender();
                            });
                    setOrderTable([]);
                    rerender();
                }
            }); 
        } else {
            Axios.post("http://localhost:3001/decreaseorderqty", {
                orderID: ordID,
                dishID: dishID,
                qty: qty,

            }).then((response) => {
               console.log(response);
               setOrderTable([]);
                rerender();
            }); 
            
        }
        
    }


    return (
        <>
            <AdminMyNavbar/>
            <Container>
            <Table className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Dish ID</th>
                        <th>Dish</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Order Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderTable.map((orderTable, k) => (
                            <tr id={orderTable.order_id} key={k}>
                                <td>{orderTable.order_id}</td>
                            <td>{orderTable.order_date}</td>
                            <td>{orderTable.order_time}</td>
                            <td>{orderTable.d_ID}</td>
                            <td>{orderTable.dish_name}</td>
                            <td>{orderTable.qty}</td>
                            <td>{orderTable.dish_price}</td>
                            <td>{orderTable.order_price}</td>
                            <td><Trash className='trash' id ={k}  onClick={e => deletee(e)}   variant="primary"/></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
        </Container>
        </>
    )
    
}

export default Orders
