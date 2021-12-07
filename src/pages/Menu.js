import React, { useEffect, useState, useContext } from 'react'
import { Image, Card, Row, Col, Container, Button } from "react-bootstrap";
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
function Menu() {
    const [playerData, setPlayerData] = useState([]);
    // eslint-disable-line react-hooks/exhaustive-deps
    const {cart, setCart} = useContext(UserContext); 
    // eslint-disable-line react-hooks/exhaustive-deps
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const {cartTotal, setCartTotal} = useContext(UserContext); 
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/getdishes')
            const nbaData = await response.json()
            setPlayerData(nbaData.slice(0, 15))
        }
        fetchData();
        console.log(playerData);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    const cardOnClick = e => {
        e.preventDefault();
        var qtyIncreased = false;
        for (var i = 0; i<cart.length;i++) {
            if (cart[i].dish_id===playerData[e.target.id].dish_id) {
                console.log('hello from multiple items')
                cart[i].qty = cart[i].qty + 1;
                qtyIncreased = true;
            }
        }
        if (!qtyIncreased) {
            var pushData = playerData[e.target.id]; 
            pushData.qty = 1
            cart.push(pushData);
        }
        setCartTotal(cartTotal+playerData[e.target.id].dish_price);
        console.log(cart);
        
    }

    return (
        <>
        <MyNavbar/>
        <Container>
             { isLoggedIn ? false : <Navigate to="/login" /> }
            <h1 className='mt-5'> Menu </h1>
            <Row>
                {playerData.map((playerData, k) => (
                    <Col className='mt-5' key={k} xs={12} md={4} lg={3}>
                        <Card bg='light' border='primary'>
                            <Image src={"../images/" + playerData.dish_id + ".jpeg"} rounded />
                            <Card.Body>
                                <Card.Title>{playerData.dish_name}</Card.Title>
                                <Card.Text>{playerData.dish_desc}</Card.Text>
                                <Card.Text>{"PKR " + playerData.dish_price}</Card.Text>
                                <Button id ={k}  onClick={e => cardOnClick(e)} variant="primary">+</Button>
                            </Card.Body>
                        
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
}

export default Menu
