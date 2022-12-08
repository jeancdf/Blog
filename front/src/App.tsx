import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Login from "./Component/Login"
import Form from "./Component/Form";
import Posts from './Component/Posts';
import CreatePost from "./Component/CreatePost"
import {setJwt, getJwt, deleteJwt} from "./variables/JWT"

function App() {
    const mounted = useRef<boolean>(false)

    const [jwt, setjwt] = useState(false)

    useEffect(() => {
        if (!mounted.current) {
            if (getJwt()) {
                setjwt(true)
                console.log('your logged');
            }

        }

        mounted.current = true
    }, [])



    return (
        <div className='content'>
            <h1>User</h1>
            <Form/>
            <Login/>
            <button onClick={deleteJwt}>disconnect</button>
            <CreatePost/>
            <Posts/>
        </div>
    );
}

export default App;
