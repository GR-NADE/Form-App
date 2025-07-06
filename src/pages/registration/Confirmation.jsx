import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateContainerWidth } from '../../utils/updateWidth'; // imports function to adjust container width reponsively
import { RefreshCcw, Phone, AlertCircle } from 'lucide-react';

function Confirmation()
{
    const containerRef = useRef(null);
    const storedPhone = localStorage.getItem("userPhone");
    const [code, setCode] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    const generateCode = () => {
        const newCode = Math.floor(10000 + Math.random() * 90000).toString();
        setConfirmationCode(newCode);
        alert(`Your confirmation code is : ${newCode}`);

        setCode("");
        setError("");
    };

    useEffect(() => {
        // generate random 5-digit confirmation code and alert it on mount
        generateCode();
    }, []);

    // handles code input to allow only numeric data, up to 5 digits
    const handleInput = (e) => {
        const value = e.target.value;
        const digitsOnly = value.replace(/\D/g, "");
        
        if (digitsOnly.length <= 5)
        {
            setCode(digitsOnly);
        }
    };

    // checks that the inputted code is correct, and sets error messages accordingly if not
    const handleConfirm = () => {
        if (code.length == 0)
        {
            setError("Please input confirmation code.");
        }
        else if (code === confirmationCode)
        {
            setError("");
            navigate("/email");
        }
        else
        {
            setError("Incorrect code. Please try again.");
        }
    };

    return (
        <div ref = {containerRef} className = "container">
            <div className = "header1">
                <h2>Registration</h2>
                <h4>
                    Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
                </h4>
            </div>

            <div className = "number">
                <div>
                    <h4>+234 {storedPhone}</h4>
                    <h4>Number not confirmed yet</h4>
                </div>
                <Phone className = "phone"/>
            </div>

            <div className = "confirm">
                <h4>Confirmation code</h4>
                <div className = "func">
                    <div>
                        <input
                            type = "text"
                            placeholder = "—————"
                            inputMode = "numeric"
                            value = {code}
                            onChange = {handleInput}
                            onFocus = {() => setIsInputFocused(true)}
                            onBlur = {() => setIsInputFocused(false)}
                        />
                        {(isInputFocused || error) && (
                            <h4 className = {error ? "err-msg" : "def-msg"}>
                                {error ? (
                                    <>
                                        <AlertCircle className = "err"/>
                                        {error}
                                    </>
                                ) : (
                                    isInputFocused && "Confirm phone number with received code from sms message"
                                )}
                            </h4>
                        )}
                    </div>
                    
                    <div onClick = {generateCode}>
                        <RefreshCcw className = "refresh"/>
                        <h4>Send again</h4>
                    </div>
                </div>
            </div>

            <p onClick = {handleConfirm}>Confirm</p>
        </div>
    )
}

export default Confirmation;