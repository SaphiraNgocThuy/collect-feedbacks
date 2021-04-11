import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

const fields = {
  likeMost: {
    question: "What did you like most?",
    placeholder: "Tell us your experience (optional)",
  },
  likeLeast: {
    question: "What did you like least?",
    placeholder: "Let us know how we can improve (optional)",
  },
  email: {
    question: "You email",
    placeholder: "Your email address (optional)",
  },
};
// eslint-disable-next-line no-unused-vars
const Form = ({ onSubmit, onClose }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [likeMost, setLikeMost] = useState(null);
  const [likeLeast, setLikeLeast] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setDisableButton(!likeMost && !likeLeast && !email);
  }, [!likeMost, !likeLeast, !email]);

  const onChange = ({ target: { value, name } }) => {
    switch (name) {
      case "likeMost":
        setLikeMost(value);
        break;
      case "likeLeast":
        setLikeLeast(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    onSubmit(likeMost, likeLeast, email);
  };

  return (
    <div id="form-container">
      <div id="top">Tell us more</div>
      <form onSubmit={onSubmitForm}>
        {Object.keys(fields).map((item) => (
          <div key={item}>
            <p>{fields[item].question}</p>
            <textarea
              name={item}
              placeholder={fields[item].placeholder}
              rows={item === "email" ? 1 : 3}
              maxLength={255}
              {...{ onChange }}
            />
          </div>
        ))}
        <input
          type="submit"
          value="Submit"
          className={disableButton ? "disabled-button" : "submit-button"}
          disabled={disableButton}
        />
      </form>
      <i className="fa fa-times" id="close" onClick={onClose} />
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Form;
