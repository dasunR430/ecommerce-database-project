'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.css";
import './styles.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
        <div className={styles.container}>

            <div className={styles.card}>
                <h1 className={styles.heading}>Log in</h1>
                <form>
                    <label htmlFor="email">Your e-mail</label>
                    <br /><br />
                    <input type="email" />
                    <br /><br /><br />
                    <label htmlFor="password">Password</label>
                    <br /><br />
                    <div className={styles.inputContainer}>
                        <input type={showPassword ? 'text' : 'password'}/>
                        <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>            
                    </div>
                </form>
                <button type="submit" className={styles.loginButton}>Log in</button>
                <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
                <br/>
                <Link href="/register">Forgot your password?</Link>
            </div>
            <div className={styles.create_account}>
                <p>Don't have an account?</p>
                <button className=  {styles.create_account_button}>Create Account</button>
            </div>
        </div>
        </>

    )
}

export default Login;
