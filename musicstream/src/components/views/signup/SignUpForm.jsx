import { useState } from "react";
import { register } from "../../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        isArtist: false
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.type === "checkbox") {
            setFormData({ ...formData, isArtist: !formData.isArtist });
        }
    }

    const submit = () => {
        if (formData.password === formData.confirmPassword) {
            dispatch(register(formData, navigate));
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title">sign up</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">email</label>
                    <input className="form-input" id="email" name="email" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">full name</label>
                    <input className="form-input" id="name" name="name" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">password</label>
                    <input className="form-input" id="password" name="password" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">confirm password</label>
                    <input className="form-input" id="confirmPassword" name="confirmPassword" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group-checkbox">
                    <div className="checkbox-wrapper-2">
                        <input className="sc-gJwTLC ikxBAC" id="isArtist" name="isArtist" type="checkbox" onChange={(e) => handleInputChange(e)} checked={formData.isArtist}></input>
                    </div>
                    <label className="form-label" htmlFor="isArtist" style={{ marginLeft: ".5rem" }}>Are you an arist?</label>
                </div>
                <div className="form-group">
                    <button className="btn-submit" onClick={submit}>Sign Up</button>
                </div>
            </div>
            <div className="signup-shadow"></div>
        </div>
    )
}

export default SignUpForm;