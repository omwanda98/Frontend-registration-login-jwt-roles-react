import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response);
            },
            (error) => {
                console.log(error);
                setContent("Login");
            }
        );
    }, []);

    return (
        <div style={{ textAlign: "center" }} className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;
