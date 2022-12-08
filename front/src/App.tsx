import React, {useState} from 'react';
import './App.css';
import Login from "./Component/Login"
import Form, {formDataInterface} from "./Component/Form";
import Posts from './Component/Posts';
import CreatePost from "./Component/CreatePost"

function App() {



    return (
        <div>
            <h1>User</h1>
            <Form/>
            <Login/>
            <CreatePost/>
            <Posts/>
        </div>
    );
}

export default App;
