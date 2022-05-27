import React, {Component} from 'react'
import Navitems from './Navitems'
import LoginZone from './LoginZone'
import logo from '../img/logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props) ;
        this.state = {
            'NavItemActive': ''
        }
    }

    activeitem = (item) => {
        if (this.state.NavItemActive.length > 0) {
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({ 'NavItemActive': item}, () => {
            document.getElementById(this.state.NavItemActive).classList.add('active');
        })


    }

    render() {
        return (
            <nav>
                <div className="brand">
                    <li><img className="logo" src={logo}></img></li>
                    <li><p className="name-size">Plan D Organization</p></li>
                </div>
                <div className="navbar-links">
                    <ul>
                        <li className="login-zone"><LoginZone /></li>
                        <Navitems item="หน้าหลัก" tolink="/" activenav={this.activeitem}/>
                        <Navitems item="เกี่ยวกับเรา" tolink="/about" activenav={this.activeitem}/>
                        <Navitems item="งานเทศกาล" tolink="/event" activenav={this.activeitem}/>
                        <Navitems item="ติดต่อ" tolink="/contact" activenav={this.activeitem}/>
                        
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;