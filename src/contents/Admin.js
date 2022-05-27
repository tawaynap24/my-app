import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../components/Auth'

const Admin = () => {
    const { currentUser } = useAuth();


    return (
        <div className="condiv">
            <div className="zone">
                {(currentUser.email != "admin@admin.com") ?
                    <center><h1>เฉพาะ Admin เท่านั้น</h1></center>
                    :
                    (<div>
                        <center><h1>Admin Manage</h1></center>
                        <div className="admin-button">
                            <Link to="admin-event" className="admin-slot">เพิ่มงานเทศกาลใหม่</Link>
                            <Link to="admin-check" className="admin-slot">ตรวจสอบสถานะการจอง</Link>
                        </div>)
                    </div>
                    )}

            </div>
        </div>
    )
}

export default Admin;