import React, { useEffect, useState } from "react";
import "./App.css";
import smile from "./assets/smile-face.png";
import Form from "./components/Form";
import RatingBox from "./components/RatingBox";
import Axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const App = () => {
  const [step, setStep] = useState(0);
  const [responseId, setResponseId] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    Axios.get(`${SERVER_URL}/questions`).then(({ data }) => {
      setQuestions(data);
    });
  }, []);

  useEffect(() => {
    step === 3 &&
      setTimeout(() => {
        setStep(4);
      }, 2000);
    step === 5 &&
      setTimeout(() => {
        setStep(6);
        setTimeout(() => {
          setStep(0);
        }, 2000);
      }, 2000);
  }, [step]);

  const onClose = () => setStep(0);

  const onRating = (rating) => {
    Axios.post(`${SERVER_URL}/ratings`, { rating }).then(({ data: { id } }) => {
      setResponseId(id);
      setStep(3);
    });
  };

  const onSubmit = (responses) => {
    Axios.put(`${SERVER_URL}/responses/${responseId}`, responses).then(() =>
      setStep(5)
    );
  };

  const renderContent = () => {
    switch (step) {
      case 2:
      case 3:
      case 5:
        return <RatingBox {...{ step, onRating, onClose }} />;
      case 4:
        return <Form {...{ onSubmit, onClose, questions }} />;
      case 6:
      default:
        return null;
    }
  };

  return (
    <div id="app">
      <div id="big-container">
        {step <= 1 ? (
          <div
            className="box"
            onMouseEnter={() => setTimeout(() => setStep(1), 200)}
            onMouseLeave={() => setTimeout(() => setStep(0), 200)}
            onClick={() => setStep(2)}
          >
            {step ? (
              <strong>Help us improve</strong>
            ) : (
              <img src={smile} alt="face" />
            )}
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default App;
