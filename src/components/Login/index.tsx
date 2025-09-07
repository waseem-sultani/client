import React from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { LoginSchema } from "../../utils/yupSchema";
import { handleLogin } from "../../services/user";

import toast from "react-hot-toast";

import styles from "./login.module.css";

interface ILoginProps {
  setUser: React.Dispatch<any>;
}

const Login: React.FC<ILoginProps> = ({ setUser }) => {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const response = await handleLogin(values.email, values.password);
      console.log("res:", response);
      if (response?.status) {
        toast.success("Login successful");
        setUser(response?.user);
      } else {
        if (response?.reason === "email") {
          toast.error("No user with this email");
        } else {
          toast.error("Incorrect password, please type the valid password");
        }
      }
    },
  });

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          name="email"
          onChange={handleChange}
          value={values?.email}
        />
        {errors.email ? (
          <div className={styles.error}>{errors.email}</div>
        ) : null}
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          name="password"
          value={values?.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <div className={styles.error}>{errors.password}</div>
        ) : null}

        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.signupLink}>
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
