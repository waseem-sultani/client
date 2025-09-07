import React from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";

import { SignupSchema } from "../../utils/yupSchema";
import { handleSignUp } from "../../services/user";

import styles from "./signup.module.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const response = await handleSignUp(values);
      if (response?.status) {
        toast.success("Sign up successful");
        navigate("/");
      } else {
        toast.error(
          "User already exist with this email. please try with another email."
        );
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={styles.inputField}
          value={values?.name}
          onChange={handleChange}
        />
        {errors.name ? <div className={styles.error}>{errors.name}</div> : null}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.inputField}
          value={values?.email}
          onChange={handleChange}
        />
        {errors.email ? (
          <div className={styles.error}>{errors.email}</div>
        ) : null}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.inputField}
          value={values?.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <div className={styles.error}>{errors.password}</div>
        ) : null}

        <button type="submit" className={styles.button}>
          Signup
        </button>

        <p className={styles.signupLink}>
          Have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
