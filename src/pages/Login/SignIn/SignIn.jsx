import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import config from '~/config';
import logoImage from '~/images/logo.png';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://vietnam-history.azurewebsites.net/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('result', result);
                // Lưu accessToken và refreshToken vào localStorage
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);

                if (result.message === 'Login successfully') {
                    var myHeaders = new Headers();
                    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow',
                    };

                    fetch('https://vietnam-history.azurewebsites.net/api/Auth/info', requestOptions)
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error(response.status);
                        })
                        .then((result) => {
                            console.log('result', result);
                            localStorage.setItem('role', result.role);
                            localStorage.setItem('userName', result.name);
                            localStorage.setItem('infoUser', JSON.stringify(result));
                            console.log('localStorage ', localStorage.getItem('role'));
                            if (localStorage.getItem('role') === 'Admin') {
                                navigate('/UserManage');
                            } else if (localStorage.getItem('role') === 'Member') {
                                navigate('/');
                            } else {
                                navigate('/BaidangMange');
                            }
                        })
                        .catch((error) => console.log('error', error));
                }
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.log('error', error);
            setError('Login failed');
        }
    };

    return (
        <div className="Container">
            <div className="Background-Top">
                <Button to={config.routes.Login} className="Logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </Button>
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
                        <form onSubmit={handleLogin} className="form-login">
                            <div className="v-input v-application">
                                <div className="v-input__control">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="v-input v-application">
                                <div className="v-input__control password">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
