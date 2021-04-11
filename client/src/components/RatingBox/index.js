import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import smile from "../../assets/smile-face.png";

const RatingBox = ({ onRating, onClose, showThankYou }) => (
  <div id="container">
    {showThankYou ? (
      <div id="row">
        <img src={smile} alt="face" />
        <div>Thank you! Tell us more</div>
      </div>
    ) : (
      <div>
        <h4>Rate your experience</h4>
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
        <i className="fa fa-times" id="close" onClick={onClose} />
      </div>
    )}
  </div>
);

RatingBox.propTypes = {
  onRating: PropTypes.func,
  onClose: PropTypes.func,
  showThankYou: PropTypes.bool,
};

export default RatingBox;
