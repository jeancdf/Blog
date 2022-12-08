import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";

export default function Posts() {
    const mounted = useRef<boolean>(false)
    const [posts, setPosts] = useState('');

    useEffect(() => {
        if (!mounted.current) {
            fetch("http://localhost:5656/posts",{
                method: "Get",
                mode: "cors",
                headers: new Headers({
                    "Content-type":  "application/x-www-form-urlencoded"
                })
            })
                .then(data => data.json())
                .then(data => console.log(data))
        }

        mounted.current = true
    }, [])
    return(
        <div>
            {/* {posts.forEach(element => {
                console.log(element)
            });} */}
        </div>
    )
}