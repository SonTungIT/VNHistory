import React, { useState } from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import logoImage from '~/images/logo.png';

function Register() {
    return (
        <div className="Container">
            <div className="Background-Top">
                <span className="Logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </span>
                <span className="Title">Money Money</span>
            </div>
            <div className="wrap-form">
                <div className="form-title-text">
                    <span>Đăng Ký</span>
                </div>
                <div className="wrap-form-body">
                    <div className="social">
                        <div className="social-description">
                            <span>Using social networking accounts</span>
                        </div>
                    </div>
                    <div className="network">
                        <div className="account-text">
                            <span>Using Money Lover account</span>
                        </div>
                        <form action="" className="form-login">
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input type="text" placeholder="Tên" id="firstName" name="firstName" />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input type="text" placeholder="Họ" id="lastName" name="lastName" />
                                </div>
                            </div>
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
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input name="confirmPassword" type="password" placeholder="XÁC THỰC MẬT KHẨU" />
                                </div>
                            </div>
                            <button type="submit" className="btn-submit">
                                <span>Đăng Ký</span>
                            </button>
                        </form>
                        <div className="suggestion">
                            Have an account?{' '}
                            <Link className="suggestion-action" to={config.routes.signIn}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Background-Bot"></div>
        </div>
    );
}

export default Register;
