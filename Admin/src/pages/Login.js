import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/admin";
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="py-5 d-flex justify-content-center align-items-center" style={{ background: "#f7f7f7", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 p-4 shadow-lg">
        <h3 className="text-center mb-3">Login</h3>
        <p className="text-center mb-4">Login to your account to continue.</p>
        <div className="error text-center mb-3">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2 text-danger">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2 text-danger">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 fs-5"
            style={{ background: "#ffd333", borderRadius: "5px" }}
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-decoration-none fw-bold">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
