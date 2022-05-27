import React, { useState, useEffect } from 'react'
import firebase from '../config'
import { useAuth } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'

const AdminCheck = () => { 
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [where, setWhere] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')

    function handleSubmit(e){
        e.preventDefault();
    
        firebase
        .firestore()
        .collection('customer')
        .add({
            firstname,
            lastname,
        })
        .then(() => {
            setFirstname('')
            setLastname('')
        })
    }

        return(
                <div className="condiv">
                    <div className="zone">
                        <div>
                            <h1 className="subtopic">ตรวจสอบสถานะการจอง</h1>
                            <div>
                                <table>
                                    <tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                    </tr>
                                    <tr>
                                        <td>Peter</td>
                                        <td>Griffin</td>
                                    </tr>
                                    <tr>
                                        <td>Lois</td>
                                        <td>Griffin</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
        )
    
}



export default AdminCheck;