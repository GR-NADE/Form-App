import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, X, AlertCircle } from 'lucide-react';
import { updateContainerWidth } from '../../utils/updateWidth'; // imports function to adjust container width reponsively

// list of valid phone number prefixes
const validPrefixes = [
    "701", "703", "704", "705", "706", "707", "708", "709", "802", "803", "804", "805", "806", "807", "808", "809", "810", "811", "812", "813", "814", "815", "816", "817", "818", "819", "820", "821", "822", "823", "824", "825", "826", "827", "828", "829", "901", "902", "903", "904", "905", "906", "907", "908", "909", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919"
];


function Phone()
{
    const containerRef = useRef(null);
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [showPrivNotice, setShowPrivNotice] = useState(true);
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

    // handles phone input to allow only numeric data, up to 10 digits
    const handleInput = (e) => {
        const value = e.target.value;
        const digitsOnly = value.replace(/\D/g, "");
        
        if (digitsOnly.length <= 10)
        {
            setPhone(digitsOnly);
        }
    };

    // checks phone number prefix and length, sets error messages accordingly, and stores the valid phone number
    const handleSendCode = () => {
        const prefix = phone.slice(0, 3);
        const isValidPrefix = validPrefixes.includes(prefix);

        if (phone.length == 0)
        {
            setError("Please input your phone number.")
        }
        else if (phone.length < 10)
        {
            setError("Phone Number must be exactly 10 digits.");
        }
        else if (!isValidPrefix)
        {
            setError("Invalid phone number.");
        }
        else
        {
            setError("");
            localStorage.setItem("userPhone", phone);
            navigate("/confirm");
        }
    };

    // handles privacy notice
    const handleClosePrivNotice = () =>
    {
        setShowPrivNotice(false);
    };


    return (
        <div ref = {containerRef} className = "container">
            <div className = "header1">
                <h2>Registration</h2>
                <h4>
                    Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
                </h4>
            </div>
            
            {showPrivNotice && (
                <div className = "priv">
                    <Lock className = "lock"/>
                    <h4>
                        We take privacy issues seriously. You can be sure that your personal data is securely protected.
                    </h4>
                    <X className = "cancel" onClick = {handleClosePrivNotice}/>
                </div>
            )}
            
            <div className = "input">
                <div>
                    <h4>
                        Enter your phone number
                    </h4>
                    <div>
                        <input type = "text" value = "+234" style = {{ pointerEvents: 'none' }}/>
                        <input type = "text" placeholder = "XXX-XXX-XXXX" inputMode = "numeric" value = {phone} onChange = {handleInput}/>
                    </div>
                </div>
                {error && 
                    <div>
                        <AlertCircle className = "err"/>
                        <h4 className = "err-msg">{error}</h4>
                    </div>
                }
            </div>
            
            <p onClick = {handleSendCode}>Send Code</p>
        </div>
    )
}

export default Phone;