import React, { Component } from 'react'
import logo from '../img/logo.png'

class About extends Component {


    render() {
        return (
            <div className="condiv">
                <div className="zone">
                    <h1 className="subtopic">ประวัติบริษัท</h1>
                    <center><img src={logo} /></center>
                    <h3>การให้บริการ</h3>
                    <p>บริษัทสำหรับจองพื้นที่ขายสินค้า เปิดให้บริการจองพื้นที่ขายสินค้าแล้ววันนี้</p>
                </div>
            </div>
        )
    }
}

export default About;