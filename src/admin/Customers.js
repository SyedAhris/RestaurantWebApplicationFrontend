import React from 'react';
import {useState, useContext, useEffect} from 'react';
import AdminMyNavbar from './AdminMyNavbar';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import { Axios } from 'axios';
import { Trash, PlusCircle, Pen } from 'react-bootstrap-icons';
function Customers() {
    const {admin, setAdmin} = useContext(UserContext);
    const [customerTable, setCustomerTable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getcustomers')
            const customer = await response.json()
            setCustomerTable(customer)
        }
        fetchData();
        console.log(customerTable);
    },[]);

    return (
        <>
            <AdminMyNavbar/>
            <Container>
             <Table className='mt-5' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerTable.map((customerTable, k) => (
                         <tr id={customerTable.dish_id} key={k}>
                            <td>{customerTable.cust_id}</td>
                            <td>{customerTable.cust_name}</td>
                            <td>{customerTable.cust_email}</td>
                            <td>{customerTable.cust_number}</td>
                            <td>{customerTable.cust_address}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
            </Container>
        </>
    )
}

export default Customers
