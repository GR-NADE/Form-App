import { useRef, useEffect, useState } from 'react';
import { updateContainerWidth } from '../../utils/updateWidth'; // imports function to adjust container width reponsively
import { AlertCircle } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

function Personal()
{
    const containerRef = useRef(null);
    const storedPhone = sessionStorage.getItem("userPhone");
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedPassword = sessionStorage.getItem("userPassword");
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [secondNameError, setSecondNameError] = useState("");
    const [dob, setDob] = useState("");
    const [dobError, setDobError] = useState("");
    const [pob, setPob] = useState("");
    const [pobError, setPobError] = useState("");

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

    // restricts input to only letters for name fields
    const handleNameInput = (e, setName) => {
        const value = e.target.value;
        const lettersOnly = value.replace(/[^A-Za-z]/g, "");
        setName(lettersOnly);
    }

    // checks that the inputted day, month and year form a calid calendar date
    const isValidDate = (d, m, y) => {
        const date = new Date(`${y}-${m}-${d}`);
        return (
            date.getFullYear() == y &&
            date.getMonth() + 1 == Number(m) &&
            date.getDate() == Number(d)
        );
    };

    // handles auto-formatting DOB into dd.mm.yyyy
    const handleDobInput = (e) => {
        const raw = e.target.value.replace(/\D/g, "");
        const trimmed = raw.slice(0, 8);

        let formatted = "";
        if (trimmed.length <= 2)
        {
            formatted = trimmed;
        }
        else if (trimmed.length <= 4)
        {
            formatted = `${trimmed.slice(0, 2)}.${trimmed.slice(2)}`;
        }
        else
        {
            formatted = `${trimmed.slice(0, 2)}.${trimmed.slice(2, 4)}.${trimmed.slice(4)}`;
        }

        setDob(formatted);
    }

    // restricts place of birth input to only letters, commas and spaces
    const handlePobInput = (e) => {
        const value = e.target.value;
        const lettersAndCommasOnly = value.replace(/[^A-Za-z,\s]/g, "");
        setPob(lettersAndCommasOnly);
    };

    // handles all personal info fields and sets corresponding error messages
    const handleFinish = async () => {
        setFirstNameError("");
        setSecondNameError("");
        setDobError("");
        setPobError("");

        const [day, month, year] = dob.split(".")

        if (!storedPhone || !storedEmail || !storedPassword)
        {
            setTimeout(() => {
                alert(`Session expired. Please restart the registration process.`);
                navigate("/");
            }, 2000);
        }
        else if (firstName.trim() === "")
        {
            setFirstNameError("Please enter your first name.");
        }
        else if (secondName.trim() === "")
        {
            setSecondNameError("Please enter your second name.");
        }
        else if (dob.trim() === "")
        {
            setDobError("Date of birth cannot be empty.");
        }
        else if (dob.replace(/\D/g, "").length < 8)
        {
            setDobError("Incomplete date of birth.");
        }
        else if (!isValidDate(day, month, year))
        {
            setDobError("Invalid date.");
        }
        else if (parseInt(year) < 1900)
        {
            setDobError("Please enter your correct year of birth.")
        }
        else
        {
           const inputDate = new Date(`${year}-${month}-${day}`);
           const today = new Date();
           today.setHours(0, 0, 0, 0);

            if (inputDate >= today)
            {
                setDobError("Invalid date of birth.");
            }
            else if (pob.trim() === "")
            {
                setPobError("Place of birth cannot be empty.");
            }
            else
            {
                const phone = sessionStorage.getItem("userPhone");
                const email = sessionStorage.getItem("userEmail");
                const password = sessionStorage.getItem("userPassword");

                try
                {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    await addDoc(collection(db, "users"), {
                        email,
                        password: hashedPassword,
                        phone,
                        firstName,
                        secondName,
                        dob,
                        pob,
                        createdAt: new Date()
                    });

                    sessionStorage.removeItem("userPhone");
                    sessionStorage.removeItem("userEmail");
                    sessionStorage.removeItem("userPassword");
                }
                catch (err)
                {
                    console.error("Error storing personal data:", err);
                    alert("Something went wrong while saving your data.");
                }
            };
        }
    };

    return (
        <div ref = {containerRef} className = "container">
            <div className = "header1">
                <h2>Profile Info</h2>
                <h4>
                    Fill in the data for profile. It will take a couple of minutes. Only basic personal information is needed
                </h4>
            </div>

            <div className = "body">
                <div className = "sub-header">
                    <h2>Personal data</h2>
                    <h4>Specify exactly as in your passport</h4>
                </div>

                <div className = "usr-info">
                    <div className = "name">
                        <h4>First name</h4>
                        <input type = "text" value = {firstName} onChange = {(e) => handleNameInput(e, setFirstName)}/>
                        {firstNameError && (
                            <h4 className = "err-msg">
                                <AlertCircle className = "err"/>
                                {firstNameError}
                            </h4>
                        )}
                    </div>

                    <div className = "name">
                        <h4>Second name</h4>
                        <input type = "text" value = {secondName} onChange = {(e) => handleNameInput(e, setSecondName)}/>
                        {secondNameError && (
                            <h4 className = "err-msg">
                                <AlertCircle className = "err"/>
                                {secondNameError}
                            </h4>
                        )}
                    </div>
                    
                    <div className = "birth-info">
                        <div>
                            <h4>Date of Birth</h4>
                            <input type = "text" placeholder = "dd.mm.yyyy" inputMode = "numeric" maxLength = {10} value = {dob} onChange = {handleDobInput}/>
                            {dobError && (
                                <h4 className = "err-msg">
                                    <AlertCircle className = "err"/>
                                    {dobError}
                                </h4>
                             )}
                        </div>

                        <div>
                            <h4>Place of Birth</h4>
                            <input type = "text" placeholder = "e.g. Lagos, Nigeria" value = {pob} onChange = {handlePobInput}/>
                            {pobError && (
                                <h4 className = "err-msg">
                                    <AlertCircle className = "err"/>
                                    {pobError}
                                </h4>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <p onClick = {handleFinish}>Finish</p>
        </div>
    )
}

export default Personal;