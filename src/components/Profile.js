import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import axios from "axios";

const API_URL = "http://localhost:8000";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            getUserBoard();
        }
    }, [currentUser]);

    const getUserBoard = () => {
        axios.get(API_URL + "/user/", {
            headers: {
                authorization: authHeader().Authorization
            }
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    return (
        <div style={{ textAlign: "center" }} className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser}</strong> Profile
                </h3>
            </header>
            {userData ? (
                <div>
                    <p>
                        <strong>Access Level: </strong>{userData}
                    </p>
                    {/* Display other user data here */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
