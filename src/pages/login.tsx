import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import '../styles/login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailValid, isEmailValid] = useState(false);
    const [pass, setPass] = useState("");
    const [passMessage, setPassMessage] = useState("");
    const [passValid, isPassValid] = useState(false);
    const [valid, isValid] = useState(false);
    const [serverMessage, setServerMessage] = useState("");

    const validate = () => {
        isValid(emailValid && passValid)
    }

    const validateEmail = (input: string) => {
        setEmail(input);
        let message: string[] = [];
        let valid = true;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(input.toLowerCase())) {
            message.push("Not a Valid Email")
            valid = false;
        };
        if (input.length > 50) {
            message.push("Email Should be less than 50 Characters")
            valid = false;
        };
        setEmailMessage(message.join("\r\n"));
        isEmailValid(valid);
    }

    const validatePass = (input: string) => {
        setPass(input);

        let message: string[] = [];
        let valid = true;
        if (input.length < 4 || input.length > 16) {
            message.push("Password should be at least 4 characters and no more than 16 characters")
            valid = false;
        }
        setPassMessage(message.join("\r\n"));
        isPassValid(valid);
    }

    const handelSubmit = (e: any) => {
        e.preventDefault();
        if (!valid) {
            alert("Invalid Login")
            return
        }
        isValid(false);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", pass);

        fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            setServerMessage('The server could not be reached. Please Try again later.');
            validate();
            throw response;
        }).then(data => {
            sessionStorage.user_creation_epoch = data.user_creation_epoch;
            sessionStorage.user_email = data.user_email;
            sessionStorage.user_id = data.user_id;
            sessionStorage.user_is_active = data.user_is_active;
            sessionStorage.user_is_new = data.user_is_new;
            sessionStorage.user_last_active_epoch = data.user_last_active_epoch;
            sessionStorage.user_profile_image = data.user_profile_image;
            sessionStorage.user_token = data.user_token;
            sessionStorage.user_username = data.user_username;
            history.push('/to-do')
        })

    }
    let history = useHistory()
    useEffect(() => {
        validate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailValid, passValid])

    return (
        <div className='login-container' style={{ backgroundImage: "url('./IMG_0235.jpg')" }}>
            <form onSubmit={handelSubmit}>
                <h1>Rapptr Labs</h1>
                <label >
                    Email
                    <input
                        type="text"
                        value={email}
                        placeholder="user@rapptrlabs.com"
                        onChange={e => validateEmail(e.target.value)}
                        style={{ borderColor: emailValid || email === '' ? 'rgba(47, 130, 255, 0.82)' : 'red' }}
                    />
                    <FontAwesomeIcon className='user' icon={faUser} />
                    <p>{emailMessage}</p>
                </label>
                <label >
                    Password
                    <input
                        type="password"
                        value={pass}
                        placeholder="Must be at least 4 characters"
                        onChange={e => validatePass(e.target.value)}
                        style={{ borderColor: passValid || pass === '' ? 'rgba(47, 130, 255, 0.82)' : 'red' }}
                    />
                    <FontAwesomeIcon className='lock' icon={faLock} />
                    <p>{passMessage}</p>
                </label>

                <input className="submit" type="submit" value="Login" disabled={!valid} />
                <p className='server'>{serverMessage}</p>
            </form>
        </div>
    );
};

export default LoginPage;