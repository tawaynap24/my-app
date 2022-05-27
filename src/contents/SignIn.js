import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../components/Auth'
import firebaseConfig from '../config'

const SignIn = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        try {

            firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
        
        } catch(error) {
            alert(error);
        }
    }

        const { currentUser } = useContext(AuthContext);
        if (currentUser ) {
            return <Redirect to="/"/>;
        }

        
    return (
        <div className="condiv">
            <div className="zone ">
                <div className="sign-in-form">
                    <center><h1>เข้าสู่ระบบ</h1></center>
                    <form onSubmit={handleSubmit}>
                        <div classname="form-space">
                            <label className="form-label">อีเมล</label>
                            <input type="email" name="email" className="form-control"/>
                        </div>
                        <div classname="form-space">
                            <label className="sign-in-label">รหัสผ่าน</label>
                            <input type="password" name="password" className="form-control"/>
                        </div>
                        <button type="submit" classname="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;