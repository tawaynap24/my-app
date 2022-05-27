import React, { Component } from 'react'
import map from '../img/map.jpg'
class Contact extends Component {
    render(){
        return(
            <div className="condiv">
                <div className="zone">
                    <h1 className="subtopic">ข้อมูลติดต่อ</h1>
                    <h3>ที่อยู่: นครนายก</h3>
                    <h3>เบอร์โทร: something</h3>
                    <h3>Email : something@gmail.com</h3>
                    <h3>Instagram : @something</h3>
                    <center><img src={map} width="40%" /></center>
                </div>
            </div>
        );
    }
}

export default Contact;