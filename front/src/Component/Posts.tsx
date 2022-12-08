import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";

export default function Posts() {
    const mounted = useRef<boolean>(false)
    const [posts, setPosts] = useState<Array<Array<string>>>([]);

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
                .then(data => setPosts(data))
        }

        mounted.current = true
    }, [])

    return(
        <div>
            {
                posts.map(element => {
                        return (
                            <div className="post">
                                <span>Content</span>:
                                <br />
                                {element[0]}
                                <br />
                                <span>Date</span>:
                                <br />
                                {element[1]}
                            </div>
                            )
                        })
            }
        </div>
    )
}