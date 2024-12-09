import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './index.css';
import { registerUser } from "../../app/api/auth";

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [successMessage, setSuccesMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const confirmError = () => setErrorMessage(false);

    const navLogin = () => {
        navigate('/login');
    }

    const onSubmit = async(data) => {
        try {
            const response = await registerUser(data);
            console.log('Registration Successful', response);
            setSuccesMessage(true);
        } catch (error) {
            setErrorMessage(true);
            console.error('Registration Failed', error);
        }
    };

    const password = watch("password");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }} className="register-form">
            <h2 className="Register">Register</h2>
            {successMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi berhasil. Silahkan login</p>
                        <button onClick={navLogin} className="confirm-button" type="button">Login</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi gagal atau email sudah terdaftar. silahkan coba lagi</p>
                        <button onClick={confirmError} className="cancel-button" type="button">Coba Lagi</button>
                    </div>
                </div>
            )}
            <div className="form-group">
                <label htmlFor="username">Name:</label>
                <input
                    type="text"
                    id="username"
                    {...register("username", { required: "Name is required" })}
                />
                {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                    },
                    })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                    },
                    })}
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                    type="passowrd"
                    id="confirm_password"
                    {...register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                />
                {errors.confirm_password && <p className="error-message">{errors.confirm_password.message}</p>}
            </div>

            <button className="register-button" type="submit">Register</button>

            <div className="form-group">
                <div className="link-container">
                    <NavLink to="/login" className="linkLogin">Already have an account? Login</NavLink>
                </div>
            </div>
        </form>
    );
};

export default RegistrationForm;
