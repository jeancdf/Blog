import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {btoa} from "buffer";
import {setJwt, getJwt, deleteJwt} from "../variables/JWT"
export interface formDataInterface {
    username: string,
    password: string
}

export default function CreatePost() {

    const mounted = useRef<boolean>(false)

    const [formData, setFormData] = useState({content: ""});
    const [jwt,setJwt] = useState("");

    useEffect(() => {
        if (!mounted.current) {
            const availablejwt = getJwt()
            if (availablejwt) {
                setJwt(availablejwt)
                console.log('your logged');
            }
        }

        mounted.current = true
    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:5656/createPost', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData,
                token: `${jwt}`
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : `Bearer ${jwt}`,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.text())
            .then(json => {
                console.log(jwt)
                console.log(json);
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
            <form onSubmit={handleSubmit}>
                <input type="text" name="content" onChange={handleChange}/>
                <br/>
                <button type="submit">login</button>
            </form>
        </>
    )
}
