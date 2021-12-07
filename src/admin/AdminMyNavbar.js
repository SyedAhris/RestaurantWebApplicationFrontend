import React from 'react'
import {Button, Navbar, Container, Nav } from 'react-bootstrap';
import {useState, useContext} from 'react';
import {UserContext} from '../UserContext';
import {NavLink} from 'react-router-dom';
import {BoxArrowLeft} from 'react-bootstrap-icons';
function AdminMyNavbar() {
    const {adminIsLoggedIn, setAdminIsLoggedIn} = useContext(UserContext);
    const {admin, setAdmin} = useContext(UserContext);
    if (adminIsLoggedIn===false) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <NavLink to= "/adminlogin"> 
                        </NavLink>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else if (admin.empcat_id === 1) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/admin/customers">Customers</NavLink>
                            <NavLink className="nav-link" to="/admin/employees">Employees</NavLink>
                            <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
                            <NavLink className="nav-link" to="/admin/addorders">Add Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/onlineorders">Online Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/employeeonlineorders">Employee of Online Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/employeeorders">Employee of Orders</NavLink>
                        </Nav>
                        <Navbar.Text>
                            {admin.emp_name}
                        </Navbar.Text>
                        <Navbar.Text>
                            <h5><BoxArrowLeft onClick={event =>  window.location.href='/adminlogin'}  className='m-1 mt-3 logout' /></h5>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else if (admin.empcat_id === 2) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <NavLink className="nav-link" to="/admin/addorders">Add Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/employeeorders">Employee of Orders</NavLink>
                        </Nav>
                        <Navbar.Text>
                            {admin.emp_name}
                        </Navbar.Text>
                        <Navbar.Text>
                            <h5><BoxArrowLeft onClick={event =>  window.location.href='/adminlogin'}  className='m-1 mt-3 logout' /></h5>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else if (admin.empcat_id ===3) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <NavLink className="nav-link" to="/admin/onlineorders">Online Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/employeeonlineorders">Employee of Online Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/customers">Customers</NavLink>
                        </Nav>
                        <Navbar.Text>
                            {admin.emp_name}
                        </Navbar.Text>
                        <Navbar.Text>
                            <h5><BoxArrowLeft onClick={event =>  window.location.href='/adminlogin'}  className='m-1 mt-3 logout' /></h5>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else if (admin.empcat_id === 4) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <NavLink className="nav-link" to="/admin/onlineorders">Online Orders</NavLink>
                            <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
                            <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                        </Nav>
                        <Navbar.Text>
                            {admin.emp_name}
                        </Navbar.Text>
                        <Navbar.Text>
                            <h5><BoxArrowLeft onClick={event =>  window.location.href='/adminlogin'}  className='m-1 mt-3 logout' /></h5>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else {
        return (
            <>
                
            </>
        )
    }
}

export default AdminMyNavbar
