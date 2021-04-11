import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import smile from "../../assets/smile-face.png";

const RatingBox = ({ onRating, onClose, step }) => (
  <div id="container">
    {step === 2 && (
      <>
        <div className="bold">Rate your experience</div>
        <div>
          <div id="rating-box">
            {[...Array(6)].map((item, index) => (
              <div
                className={`rating-item ${index === 0 && "first"}`}
                key={index}
                onClick={() => onRating(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div id="rowSpace">
            <div className="satisfy">Not satisfied</div>
            <div className="satisfy">Very satisfied</div>
          </div>
        </div>
        <i className="fa fa-times" id="close" onClick={onClose} />
      </>
    )}
    {step === 3 && (
      <div id="row">
        <div className="face-bg">
          <img id="face" src={smile} alt="face" />
        </div>
        <div className="bold">Thank you! Tell us more</div>
      </div>
    )}
    {step === 5 && (
      <div id="column">
        <div className="bold">Thank you!</div>
        <div>Your feedback is valuable to us.</div>
      </div>
    )}
  </div>
);

RatingBox.propTypes = {
  onRating: PropTypes.func,
  onClose: PropTypes.func,
  step: PropTypes.number,
};

export default RatingBox;
