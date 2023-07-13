import React, { useState } from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import logoImage from '~/images/logo.png';
import { DatePicker, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleDatePickerChange = (date, dateString) => {
        setBirthday(dateString);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        if (password.trim() === '') {
            setPasswordError('Please enter a password');
            return;
        }

        const requestBody = {
            email,
            password,
            name: firstName,
            birthday,
        };

        try {
            const response = await fetch('https://vietnamhistory.azurewebsites.net/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const result = await response.text();

            if (result === 'Register is successfully.') {
                console.log(result);
                navigate('/signIn');
            } else {
                try {
                    const errorData = JSON.parse(result);
                    const errorRender = errorData.errors.Birthday[0];
                    setError(errorRender);
                } catch (error) {
                    console.log('Failed to parse error data:', error);
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="Container">
            <div className="Background-Top">
                <span className="Logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </span>
                <span className="Title">VN's History</span>
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
                            <span>Using VN's History account</span>
                        </div>
                        <form onSubmit={handleSubmit} className="form-login">
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
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
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="XÁC THỰC MẬT KHẨU"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <Space direction="vertical">
                                        <DatePicker className="date-picker" onChange={handleDatePickerChange} />
                                    </Space>
                                </div>
                            </div>
                            <button type="submit" className="btn-submit">
                                <span>Đăng Ký</span>
                            </button>
                            {error && <div className="password-error">{error}</div>}
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
