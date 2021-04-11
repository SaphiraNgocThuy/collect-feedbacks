import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { validateEmail } from "../../utils";

const Form = ({ onSubmit, onClose, questions }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const noRequiredNeed = questions.every(({ id, isRequired }) =>
      isRequired ? responses[id] && !!responses[id].value : true
    );

    const responseValues = Object.values(responses);
    const noError = responseValues.every(({ error }) => !error);
    const isEmpty =
      !responseValues.length || responseValues.every(({ value }) => !value);

    setDisableButton(!noRequiredNeed || !noError || isEmpty);
  }, [responses]);

  const onChange = ({ target: { value, name: id } }) => {
    setResponses({ ...responses, [id]: { value } });
  };

  const onFocus = (id) => {
    setResponses({
      ...responses,
      [id]: { ...responses[id], error: "" },
    });
  };

  const onBlur = (id, isRequired, isEmail) => {
    const { value } = responses[id];
    setResponses({
      ...responses,
      [id]: {
        ...responses[id],
        error:
          isRequired && !value
            ? "Required field!"
            : isEmail && !!value && !validateEmail(value)
            ? "Wrong email format!"
            : "",
      },
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    onSubmit(
      Object.entries(responses).flatMap(
        ([questionId, { value }]) =>
          (!!value && [
            {
              questionId: questionId,
              feedback: value,
            },
          ]) ||
          []
      )
    );
  };

  return (
    <div id="form-container">
      <div id="top">Tell us more</div>
      <form onSubmit={onSubmitForm}>
        {questions.map(
          ({ id, isRequired, questionType, question, placeholder }) => {
            const isEmail = questionType === "email";
            const hasError = responses[id] && !!responses[id].error;
            return (
              <div key={id}>
                <p>
                  {question}
                  {isRequired && <span> *</span>}
                </p>
                <textarea
                  className={hasError ? "text_error" : undefined}
                  name={id}
                  placeholder={placeholder + (!isRequired ? " (optional)" : "")}
                  rows={isEmail ? 1 : 3}
                  maxLength={255}
                  onFocus={() => onFocus(id, isEmail)}
                  onBlur={
                    isRequired || isEmail
                      ? () => onBlur(id, isRequired, isEmail)
                      : undefined
                  }
                  {...{ onChange }}
                />
                {hasError && <div className="error">{responses[id].error}</div>}
              </div>
            );
          }
        )}
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
  questions: PropTypes.any,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Form;
