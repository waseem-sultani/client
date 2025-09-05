import React from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { SignupSchema } from "../../utils/yupSchema";

import styles from "./signup.module.css";
import { handleSignUp } from "../../services/user";

const Signup: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      await handleSignUp(values);
      console.log("Form submitted:", values);
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
