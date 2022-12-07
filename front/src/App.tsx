import React, {useState} from 'react';
import './App.css';
import Login from "./Component/Login"
import Form, {formDataInterface} from "./Component/Form";

function App() {



    return (
        <div>
            <h1>User</h1>
            <Form/>
            <Login/>
        </div>
    );
}

export default App;
