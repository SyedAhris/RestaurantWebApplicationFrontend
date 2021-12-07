import React, {useEffect} from 'react'
import {Button, Navbar, Container, Nav, Offcanvas, Col  } from 'react-bootstrap';
import './MyNavbar.css'
import {useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import {NavLink} from 'react-router-dom'
import {BoxArrowLeft} from 'react-bootstrap-icons';
function MyNavbar() {
    // eslint-disable-next-line
    const {cart, setCart} = useContext(UserContext); 
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext); 
    const {user, setUser} = useContext(UserContext);
    const [click, setClick] = useState(false); // eslint-disable-next-line
    const cardOnClick = e => {
        e.preventDefault();
        console.log(e.target.id);
        console.log(cart);
        cart.splice(e.target.id,1)
        console.log(cart);
        
    }
    useEffect(()=> {
        setCart(cart);
    })
    if (isLoggedIn===false) {
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <NavLink to= "/signup"> 
                        <Button className='button' size='sm' variant="primary" >Sign Up</Button>{' '}
                        </NavLink>
                        <NavLink to= "/login"> 
                        <Button className='button' size='sm' variant="outline-primary">Log In</Button>{' '}
                        </NavLink>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    } else {
        console.log(isLoggedIn)
        return (
            <>
                <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">RSTRNT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/menu">Menu</NavLink>
                            <NavLink className="nav-link" to="/orderhistory">Order History</NavLink>
                            <NavLink className="nav-link" to="/cart">Cart</NavLink>
                        </Nav>
                        <Navbar.Text>
                            <h7>{user.cust_name}</h7>
                            
                        </Navbar.Text>
                        <Navbar.Text>
                            <h5><BoxArrowLeft onClick={event =>  window.location.href='/login'}  className='m-1 mt-3 logout' /></h5>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}
    

export default MyNavbar
