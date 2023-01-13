import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {btoa} from "buffer";
import {setJwt, getJwt} from "../variables/JWT"
import {BrowserRouter, Routes ,Route, Link} from "react-router-dom";
export interface formDataInterface {
    username: string,
    password: string
}

export default function Form(props:any) {

    const mounted = useRef<boolean>(false)

    const [formData, setFormData] = useState<formDataInterface>({password: "", username: ""})

    useEffect(() => {
        if (!mounted.current) {
            if (getJwt()) {
                console.log('your logged');
            }
            // fetch("http://localhost:5656")
            //     .then(data => data.json())
            //     .then(json => console.log(json))
        }

        mounted.current = true
    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:5656/login', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.text())
            .then(json => {
                setJwt(json);
                window.location.reload();
            })
    }

    const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=" text-center">
                <input type="text" name="username" onChange={handleChange} className=" m-1"/>
                <br/>
                <input type="password" name="password" onChange={handleChange} className=" m-1"/>
                <br/>
                <button type="submit" className=" btn btn-primary m-2">login</button>
                <Link to='form' ><button type="submit" className=" btn btn-warning m-2">Register Instead</button></Link>
            </form>
        </>
    )
}
