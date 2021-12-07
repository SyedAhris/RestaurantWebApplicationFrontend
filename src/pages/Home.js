import React,{ useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import {UserContext} from '../UserContext'
function Home() {
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext); 
    const {user, setUser} = useContext(UserContext);
    return (
        <>
           { isLoggedIn ? <h1>{user.cust_name}</h1> : <Navigate to="/login" /> }
        </>
    )
}

export default Home
