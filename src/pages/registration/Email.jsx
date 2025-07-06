import { useRef, useEffect, useState } from 'react';
import { updateContainerWidth } from '../../utils/updateWidth'; // imports function to adjust container width reponsively
import { Check, Eye, EyeOff, AlertCircle } from "lucide-react";

function Email()
{
    const containerRef = useRef(null);
    const storedPhone = localStorage.getItem("userPhone");
    
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        // handler definition to update container width dynamically
        function handleResize()
        {
            if (containerRef.current)
            {
                updateContainerWidth(containerRef.current);
            }
        }
        handleResize(); // initial call to set width correctly on mount
        window.addEventListener('resize', handleResize); // event listener to update width on viewport changes
        return () => window.removeEventListener('resize', handleResize); // cleanup listener on unmount
    }, []);

    // validates user input and stores email and password if all conditions are met.
    const handleRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailError("");
        setPasswordError("");

        if (email.trim() === "")
        {
            setEmailError("Please enter your email address.");
        }
        else if (!emailRegex.test(email))
        {
            setEmailError("Please enter a valid email address.");
        }
        else if (password.trim() === "")
        {
            setPasswordError("Password field cannot be empty.");
        }
        else if (password.length < 6)
        {
            setPasswordError("Password must be at least 6 characters.");
        }
        else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
        {
            setPasswordError("Password must include uppercase, lowercase, and a number.");
        }
        else
        {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
        }
    }

    return (
        <div ref = {containerRef} className = "container">
            <div className = "header1">
                <h2>Registration</h2>
                <h4>
                    Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
                </h4>
            </div>

            <div className = "cnfrmd-num">
                <h4>+234 {storedPhone}</h4>
                <div>
                    <Check className = "check"/>
                    <h4>Number confirmed</h4>
                </div>
            </div>

            <div className = "usr-inpt">
                <div className = "mail">
                    <h4>Enter your email</h4>
                    <input type = "email" placeholder = "you@example.com" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    {emailError && (
                        <h4 className = "err-msg">
                            <AlertCircle className = "err"/>
                            {emailError}
                        </h4>
                    )}
                </div>

                <div className = "passw">
                    <h4>Set a password</h4>
                    <div>
                        <input type = {showPassword ? "text" : "password"} placeholder = "••••••" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                        <div onClick = {() => setShowPassword(prev => !prev)} >
                            {showPassword ? <EyeOff className = "eye"/> : <Eye className = "eye"/>}
                        </div>
                    </div>
                    {passwordError && (
                        <h4 className = "err-msg">
                            <AlertCircle className = "err"/>
                            {passwordError}
                        </h4>
                    )}
                </div>
            </div>

            <p onClick = {handleRegister} className = "reg-btn">Register Now</p>
        </div>
    )
}

export default Email;