import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './index.css';
import { registerUser } from "../../app/api/auth";
import Swal from 'sweetalert2';

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const response = await registerUser(data);
            Swal.fire({
                title: 'Success!',
                text: `Registeration Successfull.`,
                icon: 'success',
            });
            console.log('Registration Successful', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration Failed', error);
            Swal.fire({
                title: 'Failed!',
                text: `Registeration failed or email already registered. Please try again.`,
                icon: 'error',
            });
        }
    };

    const password = watch("password");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }} className="register-form">
            <h2 className="Register">Register</h2>
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
                    type="password"
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
