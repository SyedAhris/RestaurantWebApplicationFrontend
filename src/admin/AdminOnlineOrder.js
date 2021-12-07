import React from 'react'
import AdminMyNavbar from './AdminMyNavbar'
import { Form, Alert,ListGroup, Table,Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import {useState, useContext, useEffect} from 'react';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
import Axios from 'axios';
function AdminOnlineOrder() {
  const {admin, setAdmin} = useContext(UserContext);
  const [onlineOrderTableView, setOnlineOrderTableView] = useState([]);
  const [onlineOrderTableViewName, setOnlineOrderTableViewName] = useState([]);
  const [onlineOrderTable, setOnlineOrderTable] = useState([]);
  const [ordID, setOrdID] = useState();
  const [chosenStatus, setChosenStatus] =useState();
  const [success, setSuccess] =useState("");
  const [error, setError] =useState("");
  const [validated, setValidated] =useState(false);
  const [loading, setLoading] = useState('Loading');

  const rowOnClick = e => {
    e.preventDefault();
    console.log('hello from row click ' + e.currentTarget.id);
  }

  


const rerender = () => {
  Axios.post("http://localhost:3001/getOnlineOrderViewAll", {

        }).then((response) => {
            console.log(response);
            if (response.data.length === 0) {
              setOnlineOrderTable([])
            } else {
                console.log('from then');
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
                for (var i =0 ; i<onlineOrderTableView.length; i++) {
                  var custID = onlineOrderTableView[i].oo_cust_id;
                  console.log(onlineOrderTableView[i].oo_cust_id);
                  Axios.post("http://localhost:3001/getCustomersWithID", {
                    custID: custID,
    
                  }).then((response, onlineOrderTableView1 = onlineOrderTableView[i]) => {
                    console.log(response);
                    if (response.data.message) {     
                    } else {
                      console.log(response.data[0].cust_name);
                      onlineOrderTableViewName[i] = response.data[0].cust_name;
                      setOnlineOrderTable(onlineOrderTableViewName);
                    }
                  }); 
                }
                console.log(onlineOrderTableViewName);
                console.log(count);
                console.log(onlineOrderTableView);
            }
            setLoading('Order History');
        }); 
};

const deletee = (event) => {
  event.preventDefault();
  console.log(event.currentTarget.id);
  const ordID = event.currentTarget.id;
  console.log( ordID);
  Axios.post("http://localhost:3001/deleteonlineorder", {
      orderID: ordID,

  }).then((response) => {
      console.log(response);
      if (response.data.err) { 
          console.log(response.data.err);
      } else {
        console.log("yelloooo")
          setOnlineOrderTable("");
          setOnlineOrderTable([]);
          console.log(onlineOrderTable);
          rerender();
      }
  }); 
}
  useEffect(()=> {
    if (admin) {
        Axios.post("http://localhost:3001/getOnlineOrderViewAll", {

        }).then((response) => {
            console.log(response);
            if (response.data.length === 0) {
              // do something if empty
            } else {
                console.log('from then');
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
                for (var i =0 ; i<onlineOrderTableView.length; i++) {
                  var custID = onlineOrderTableView[i].oo_cust_id;
                  console.log(onlineOrderTableView[i].oo_cust_id);
                  Axios.post("http://localhost:3001/getCustomersWithID", {
                    custID: custID,
    
                  }).then((response, onlineOrderTableView1 = onlineOrderTableView[i]) => {
                    console.log(response);
                    if (response.data.message) {     
                    } else {
                      console.log(response.data[0].cust_name);
                      onlineOrderTableViewName[i] = response.data[0].cust_name;
                      setOnlineOrderTable(onlineOrderTableViewName);
                    }
                  }); 
                }
                console.log(onlineOrderTableViewName);
                console.log(count);
                console.log(onlineOrderTableView);
            }
            setLoading('Order History');
        }); 
    }
}, [])



const handleSetSubmit = (event) => {
  event.preventDefault();
  setError("");
  setSuccess("");
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    Axios.post("http://localhost:3001/setOrderStatus", {
                    ordID: ordID,
                    status: chosenStatus,
                  }).then((response) => {
                    console.log(response)
                      if (response.data.affectedRows === 0) { 
                          setError("No Matching Rows Found");
                      } else {
                          setSuccess("Success")
                          rerender();
                      }
                  }); 
  }
}

    return (
      <>
      
      <AdminMyNavbar/>


      <Container>
            <Form className='mt-5' noValidate validated={validated} onSubmit={handleSetSubmit}>
                <Row>
                    <Col>
                    <Form.Control required type="number" placeholder="Order ID" onChange={(e) => {setOrdID(e.target.value)}} />
                    </Col>
                    <Col>
                        <Form.Select onChange={(e) => {setChosenStatus(e.target.value)}} aria-label="Default select example">
                            <option value="OrderPlaced">Order Placed</option>
                            <option value="OrderAccepted">Order Accepted</option>
                            <option value="OrderDelivered">Order Delivered</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Button type='submit'  className='loginButton' variant="primary"  >SET</Button>
            </Form>
            <Alert show={error} className="mt-3" variant='danger'> {error}</Alert>
            <Alert show={success} className="mt-3" variant='success'> {success}</Alert>
            </Container>









        <Container>
          <Table className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
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
                         <tr id={onlineOrderTableView.oo_id} onClick={e => rowOnClick(e)} key={k}>
                            <td>{onlineOrderTableView.oo_id}</td>
                            <td>{onlineOrderTableView.cust_name}</td>
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
                            <td><Trash className='trash' id ={onlineOrderTableView.oo_id}  onClick={e => deletee(e)}   variant="primary"/></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
        </Container>
        </>
    )
}

export default AdminOnlineOrder
