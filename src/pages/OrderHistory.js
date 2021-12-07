import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { ListGroup, Table,Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import MyNavbar from '../components/MyNavbar';
import Axios from 'axios';
function OrderHistory() {

    const {cart, setCart} = useContext(UserContext); 
    const {user, setUser} = useContext(UserContext);
    const [orderHist, setOrderHist] = useState(false);
    const [loading, setLoading] = useState('Loading');
    const [onlineOrderTable, setOnlineOrderTable] = useState([]);
    const [onlineOrderTableView, setOnlineOrderTableView] = useState([]);
    const [onlineOrderDishesTable, setOnlineOrderDishesTable] = useState([]);

    useEffect(()=> {
        if (user) {
            Axios.post("http://localhost:3001/getOnlineOrderView", {
                custID: user.cust_id,
    
            }).then((response) => {
                console.log(response);
                if (response.data.length === 0) {
                    setOrderHist(false);
                } else {
                    console.log('from then');
                    setOrderHist(true);
                    console.log(response.data);
                    setOnlineOrderTable(response.data);
                    onlineOrderTableView[0]= response.data[0];
                    console.log(onlineOrderTable);
                    onlineOrderTableView[0].dishName = ([[response.data[0].dish_name,response.data[0].o_qty]]);
                    onlineOrderTableView[0].totalPrice = response.data[0].dish_price * response.data[0].o_qty;
                    console.log(onlineOrderTableView)
                    var count = 0;
                    for (var i = 1; i<response.data.length;i++) {
                        console.log("i = " + i + ' count = ' + count);

                        if (response.data[i].oo_id === response.data[i-1].oo_id) {
                            console.log('inside if')
                            onlineOrderTableView[count].dishName.push([response.data[i].dish_name,response.data[i].o_qty]);
                            onlineOrderTableView[count].totalPrice = (response.data[i].dish_price * response.data[i].o_qty) + onlineOrderTableView[count].totalPrice;
                            
                            
                        } else {
                            console.log('inside else')
                            count= count + 1;
                            onlineOrderTableView[count]= response.data[i];
                            onlineOrderTableView[count]['dishName'] = ([[response.data[i].dish_name,response.data[i].o_qty]]);
                            onlineOrderTableView[count].totalPrice = response.data[i].dish_price * response.data[i].o_qty;
                        }
                    }
                    for (var i =0 ; i<onlineOrderTableView.length; i++) {
                        var date = new Date(onlineOrderTableView[i].oo_date);
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var dt = date.getDate();

                        if (dt < 10) {
                            dt = '0' + dt;
                          }
                          if (month < 10) {
                            month = '0' + month;
                          }

                          onlineOrderTableView[i].oo_date = (year+'-' + month + '-'+dt);
                          console.log(year+'-' + month + '-'+dt);
                    }
                    console.log(count);
                    console.log(onlineOrderTableView);
                }
                setLoading('Order History');
            }); 
        }
    }, [])
    if (orderHist) {
        console.log(onlineOrderTableView);
        return (
            <>
            <MyNavbar/>
            <Container>
                <h1 className='mt-5'>{loading}</h1>
                <Table className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Order Dishes</th>
                        <th>Order Address</th>
                        <th>Order Phone #</th>
                        <th>Price</th>
                        <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {onlineOrderTableView.map((onlineOrderTableView, k) => (
                        <tr  key={k}>
                            <td>{onlineOrderTableView.oo_id}</td>
                            <td>{onlineOrderTableView.oo_date}</td>
                            <td>
                                <tr>
                                    <td>
                                    <ListGroup variant='flush'>
                                    {onlineOrderTableView.dishName.map((table,m) => (
                                    <ListGroup.Item key={k}>{table[0]}</ListGroup.Item> 
                                    ))}
                                    </ListGroup>
                                    </td>
                                    <td>
                                    <ListGroup variant='flush'>
                                    {onlineOrderTableView.dishName.map((table,m) => (
                                    <ListGroup.Item key={k}>{table[1]}</ListGroup.Item> 
                                    ))}
                                    </ListGroup>
                                    </td>
                                </tr>
                            </td>
                            <td>{onlineOrderTableView.oo_address}</td>
                            <td>{onlineOrderTableView.oo_phnumber}</td>
                            <td>{onlineOrderTableView.totalPrice}</td>
                            <td>{onlineOrderTableView.oo_status}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            </>
        )
    } else {
        return (
            <>
            <MyNavbar/>
            <h1>You have not placed any orders yet </h1>
            </>
        )
    }
    
}

export default OrderHistory