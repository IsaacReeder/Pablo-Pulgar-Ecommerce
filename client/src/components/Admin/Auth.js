import React, { useState, useContext } from "react";

import { useForm } from "../Hooks/form-hook";
import { useHttpClient } from "../Hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../UiElements/ErrorModal";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import Button from "../FormElements/Button";
import Card from "../UiElements/Card";
import { css } from "@emotion/core";
import { Redirect } from "react-router-dom";
import { useAuth } from "../Hooks/auth-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import LoadingSpinner from "../UiElements/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        console.log(formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
      setLoading(false);
    }
  };
  // const override = css`
  //   display: block;
  //   margin: 0 auto;
  //   border-color: red;
  //   position: absolute;
  //   top-margin: 50%;
  //   left-margin: 50%;
  // `;

  return token ? (
    <Redirect to="/admin" />
  ) : (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <ErrorModal error={error} onClear={clearError} />
        <Card
          className="authentication"
          style={{
            width: "50%",
          }}
        >
          {isLoading && <LoadingSpinner asOverlay />}

          <h2>Welcome back, Pablo.</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                center
                id="image"
                onInput={inputHandler}
                errorText="Please provide an image."
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              placeholder="E-Mail"
              autoComplete="on"
              // label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              placeholder="Password"
              // label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
