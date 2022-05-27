import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render(){
        return(
            <footer>
                <ul>
                    <li className="welcome">
                        <h3>ยินดีต้อนรับ</h3>
                        <p>type something type something type something type something type something type something type somethingtype something </p>
                    </li>
                    <li className="content">
                        <h3>เนื้อหา</h3>
                        <p>type something type something type something type something type something type something type somethingtype something </p>
                    </li>
                    <li className="contact">
                        <h3>ติดต่อ</h3>
                        <p>type something type something type something type something type something type something type somethingtype something </p>
                    </li>
                </ul>
            </footer>

            
        )
    }
}

export default Footer;