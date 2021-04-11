import React, { useEffect, useState } from "react";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import smile from "./assets/smile-face.png";
import Form from "./components/Form";
import RatingBox from "./components/RatingBox";
import Axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const App = () => {
  const [step, setStep] = useState(0);
  const [reviewId, setReviewId] = useState(null);

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

  const onRating = (rate) => {
    Axios.post(`${SERVER_URL}/ratings`, { rating: rate }).then(
      ({ data: { id } }) => {
        setReviewId(id);
        setStep(3);
      }
    );
  };

  const onSubmit = (likeMost, likeLeast, email) => {
    Axios.put(`${SERVER_URL}/responses/${reviewId}`, {
      likeMost,
      likeLeast,
      email,
    }).then(() => setStep(5));
  };

  const renderContent = () => {
    switch (step) {
      case 0:
      case 1:
        return (
          <div
            className="box"
            onMouseEnter={step === 0 ? () => setStep(1) : undefined}
            onMouseLeave={step === 1 ? () => setStep(0) : undefined}
            onClick={() => setStep(2)}
          >
            {step ? (
              <strong>Help us improve</strong>
            ) : (
              <img src={smile} alt="face" />
            )}
          </div>
        );
      case 2:
      case 3:
      case 5:
        return <RatingBox {...{ step, onRating, onClose }} />;
      case 4:
        return <Form {...{ onSubmit, onClose }} />;
      case 6:
      default:
        return null;
    }
  };

  return (
    <div id="app">
      <div id="big-container">{renderContent()}</div>
    </div>
  );
};

export default App;
