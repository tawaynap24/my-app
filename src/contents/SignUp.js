import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'
import firebase from '../config'

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')
    const [number, setNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [emailaddress, setEmailaddress] = useState('')
    const [pass, setPass] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);
        } catch(error)
        {
            alert(error);
        }
    
        firebase
        .firestore()
        .collection('customer')
        .add({
            firstname,
            lastname,
            age,
            number: parseInt(number),
            phone,
            emailaddress,
            pass
        })
        .then(() => {
            setFirstname('')
            setLastname('')
            setAge('')
            setNumber('')
            setPhone('')
            setEmailaddress('')
            setPass('')
        })
    }

    if (currentUser){
        return <Redirect to="/" />
    }

    return(
        <div className="condiv">
            <div className="zone">
                <center><h1>สมัครสมาชิก</h1></center>
                <form onSubmit={handleSubmit}>
                    <div className="sign-up-form">
                        <label className="label-space">ชื่อ</label>
                        <input type="text" value={firstname} onChange={e => setFirstname(e.currentTarget.value)} required maxLength="5"/>
                    
                        <label className="label-space">นามสกุล</label>
                        <input type="text" value={lastname} onChange={e => setLastname(e.currentTarget.value)}/>

                        <label className="label-space">อายุ</label>
                        <input type="text" value={age} onChange={e => setAge(e.currentTarget.value)}/>
                    
                        <label className="label-space">เลขบัตรประชาชน</label>
                        <input type="text" value={number} onChange={e => setNumber(e.currentTarget.value)} required maxLength="13"/>

                        <label className="label-space">เบอร์โทรศัพท์</label>
                        <input type="text" value={phone} onChange={e => setPhone(e.currentTarget.value)}/>
                    
                        <label className="label-space">อีเมล</label>
                        <input type="email" name="email" value={emailaddress} onChange={e => setEmailaddress(e.currentTarget.value)}/>

                        <label className="label-space">รหัสผ่าน</label>
                        <input type="password" name="password" value={pass} onChange={e => setPass(e.currentTarget.value)}/>

                    </div>
                
                    <center><button type="submit" className="btn btn-primary">Submit</button></center>
                </form>
            </div>
        </div>
    )
}

export default SignUp;