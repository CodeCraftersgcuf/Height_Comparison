"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import weblogo from '../../public/images/logo.svg'
import Image from "next/image";

const page = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Must be at least 6 characters").max(15,"Must be at max 15 characters").required("Password is required"),
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96 ">
                {/* Logo */}
                <div className="mb-8 w-full">
                    <Image
                        src={weblogo}
                        alt="logo"
                        width={200}
                        className="mx-auto block"
                    />
                </div>

                {/* Sign-in Buttons */}
                <h1 className="text-xl font-bold tracking-widest mb-4 block">Login</h1>
                <button className="border border-gray-300 w-full flex items-center justify-center py-2 rounded-md mb-2 hover:bg-gray-100">
                    <i className="bi bi-google mr-2"></i> Sign in with Google
                </button>
                <button className="border border-gray-300 w-full flex items-center justify-center py-2 rounded-md hover:bg-gray-100">
                    <i className="bi bi-apple mr-2"></i> Sign in with Apple
                </button>

                <div className="flex items-center gap-2 my-3 text-gray-500">
                    <hr className="w-full block" />
                    OR
                    <hr className="w-full block" />
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("Login Data", values);
                        alert("Login successful!");
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                    placeholder="name@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="font-medium flex justify-between">
                                    Password
                                    <a href="#" className="text-blue-500 text-sm">Forgot password?</a>
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Remember Me */}
                            <div className="mb-4 flex items-center">
                                <Field type="checkbox" name="rememberMe" className="mr-2" id="rememberMe" />
                                <label htmlFor="rememberMe">Keep me logged in</label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
                                disabled={isSubmitting}
                            >
                                Log in
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Sign Up Link */}
                <div className="mt-4">
                    <span className="text-gray-500">Not a member? <a href="#" className="text-blue-500">Sign up now</a></span>
                </div>
                {/* Terms & Privacy */}
                <div className="text-xs text-gray-400 mt-4">
                    This site is protected by reCAPTCHA and the Google <a href="#" className="text-blue-500">Privacy Policy</a> and <a href="#" className="text-blue-500">Terms of Service</a> apply.
                </div>
            </div>
        </div>
    );
};

export default page;
