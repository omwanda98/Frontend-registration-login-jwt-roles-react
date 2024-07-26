import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserBoard();
        setContent(response);
        console.log(response)
        setLoading(false);
      } catch (error) {
        if (error.response) {
          // Server responded with an error
          const errorMessage =
            (error.response.data && error.response.data.message) ||
            error.response.statusText ||
            "Unknown error occurred";
          setContent(errorMessage);
          if (error.response.status === 401) {
            // Unauthorized, trigger logout
            EventBus.dispatch("logout");
          }
        } else if (error.request) {
          // The request was made but no response was received
          setContent("Network error occurred");
        } else {
          // Something happened in setting up the request that triggered an error
          setContent("Error occurred while processing the request");
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {

    };
  }, []);

  return (
    <div style={{ textAlign: "center" }} className="container">
      <header className="jumbotron">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <h3>{content}</h3>
        )}
      </header>
    </div>
  );
};

export default BoardUser;
