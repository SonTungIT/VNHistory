import React, { useState, useEffect } from 'react';
import './SignIn.scss';
import { useNavigate, Link } from 'react-router-dom';
import config from '~/config';
import logoImage from '~/images/logo.png';

function SignIn() {
    return (
        <div className="Container">
            <div className="Background-Top">
                <span className="Logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </span>
                <span className="Title">VietNam's History</span>
            </div>
            <div className="wrap-form">
                <div className="form-title-text">
                    <span>Đăng nhập</span>
                </div>
                <div className="wrap-form-body">
                    <div className="social">
                        <div className="social-description">
                            <span>Using social networking accounts</span>
                        </div>
                    </div>
                    <div className="network">
                        <div className="account-text">
                            <span>Using VietNam's History account</span>
                        </div>
                        <form action="" className="form-login">
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input type="email" id="email" name="email" required placeholder="Email" />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="forgot-password">
                                <span className="forgot-password-text">Forgot Password</span>
                            </div>
                            <button type="submit" className="btn-submit">
                                <span>Login</span>
                            </button>
                        </form>
                        <div className="suggestion">
                            {' '}
                            Don’t have an account?{' '}
                            <Link className="suggestion-action" to={config.routes.register}>
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Background-Bot"></div>
        </div>
    );
}

export default SignIn;
