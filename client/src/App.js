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
    setStep === 5 &&
      setTimeout(() => {
        setStep(6);
        setTimeout(() => {
          setStep(0);
        }, 2000);
      }, 2000);
  }, [step]);

  const onClose = () => {
    console.log("close");
    setStep(0);
  };

  const onRating = (rate) => {
    Axios.post(`${SERVER_URL}/ratings`, { rating: rate }).then(
      ({ data: { id } }) => {
        setReviewId(id);
        setStep(3);
      }
    );
  };

  const onSubmit = (likeMost, likeLeast, email) => {
    console.log("submiting");
    Axios.put(`${SERVER_URL}/responses/${reviewId}`, {
      likeMost,
      likeLeast,
      email,
    }).then((res) => {
      console.log("abc");
      console.log({ res });
    });
  };

  // const onSubmit = () => {
  //   console.log("submiting", reviewId);
  //   // Axios.put(`http://localhost:3001/responses/${reviewId}`, {
  //   //   likeMost,
  //   //   likeLeast,
  //   //   email,
  //   // }).then((res) => {
  //   //   console.log("abc");
  //   //   console.log({ res });
  //   // });
  // };

  const renderContent = () => {
    switch (step) {
      case 0:
        return <img src={smile} alt="face" />;
      case 1:
        return <strong>Help us improve</strong>;
      case 2:
      case 3:
      case 5:
        return (
          <RatingBox showThankYou={step === 3} {...{ onRating, onClose }} />
        );
      case 4:
        return <Form {...{ onSubmit, onClose }} />;
      case 6:
      default:
        return null;
    }
  };

  return (
    <div id="app">
      <div
        className={`box ${step > 1 && " box-clicked"}`}
        onMouseEnter={step === 0 ? () => setStep(1) : undefined}
        onMouseLeave={step === 1 ? () => setStep(0) : undefined}
        onClick={
          step <= 1
            ? () => {
                console.log("pressed");
                setStep(2);
              }
            : undefined
        }
      >
        {renderContent()}
        {/* <SwitchTransition>
          {showForm ? (
            <Form {...{ onSubmit }} />
          ) : showRating ? (
            <CSSTransition
              key="rate"
              timeout={400}
              classNames="rate"
              unmountOnExit
            >
              <RatingBox showThankYou={isRated} {...{ onRating, onClose }} />
            </CSSTransition>
          ) : showBadge ? (
            <CSSTransition
              key="badge"
              timeout={400}
              classNames="badge"
              unmountOnExit
            >
              <strong>Help us improve</strong>
            </CSSTransition>
          ) : (
            <CSSTransition
              key="face"
              timeout={400}
              classNames="face"
              unmountOnExit
            >
              <img src={smile} alt="face" />
            </CSSTransition>
          )}
        </SwitchTransition> */}
      </div>
    </div>
  );
};

export default App;
