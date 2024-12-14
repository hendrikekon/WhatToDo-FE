import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './index.css';
import Swal from "sweetalert2";
// import { updateProfile } from "../../app/features/Auth/actions";
import { updateProfileApi } from "../../app/api/auth";

const AccountDetail = () => {
    const user = useSelector((state) => state.auth.user || null);
    const [changePassword, setChangePassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const newPassword = watch("newPassword");

    const handlePasswordChange = async(data) => {
        console.log("Form data:", data); // Log data to check if it's being passed correctly

        if (!data.oldPassword || !data.newPassword) {
            Swal.fire({
                title: "Please fill in all fields",
                icon: "error",
                confirmButtonText: "OK",
            });
            return; // Prevent submission if data is missing
        }
        
        try {
            console.log(data);
            await updateProfileApi(user._id, {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            Swal.fire({
                title: "Password updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
            reset(); // Clear form fields
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error updating password",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    };

    const changePasswordClick = () => {
        setChangePassword((prevState) => !prevState);
    };
    if (!user) {
        return(<div className="account-detail">
            <h2>Please Login</h2>
        </div>)
    }

    return (
        <div className="account-detail">
            <h2>Account Details</h2>
            <div className="user-info">
                <p className="user-text">
                    <strong>Username:</strong> {user.username}
                </p>
                <p className="user-text">
                    <strong>Email:</strong> {user.email}
                </p>
                <p className="user-text">
                    <strong>Password:</strong>
                    <NavLink to="#" onClick={changePasswordClick}>
                        Change Password
                    </NavLink>
                </p>
            </div>

            {changePassword && (
                <div className="password-change">
                    <h3>Change Password</h3>
                    <form onSubmit={handleSubmit(handlePasswordChange)}>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Current Password</label>
                            <input
                                type="password"
                                id="oldPassword"
                                {...register("oldPassword", { required: "Current password is required" })}
                            />
                            {errors.oldPassword && (
                                <p className="error">{errors.oldPassword.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                {...register("newPassword", { required: "New password is required" })}
                            />
                            {errors.newPassword && (
                                <p className="error">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "Please confirm your new password",
                                    validate: (value) => value === newPassword || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="error">{errors.confirmPassword.message}</p>
                            )}
                        </div>


                        <button type="submit" className="btn-changepassword">Change Password</button>
                    </form>
                    {/* {message && <p className="message">{message}</p>} */}
                </div>
            )}
        </div>
    );
};

export default AccountDetail;