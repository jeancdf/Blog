import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Login from "./Component/Login"
import Form from "./Component/Form";
import Posts from './Component/Posts';
import CreatePost from "./Component/CreatePost"
import {setJwt, getJwt, deleteJwt} from "./variables/JWT"
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <h1>React Blog</h1>
            {
                jwt ?
                <>
                    <button onClick={deleteJwt} className="btn btn-primary">disconnect</button>
                    <CreatePost/>
                </>
                :     
                <>
                    <Form/>
                    <Login/>
                </>
            }

            <Posts/>
        </div>
    );
}

export default App;
