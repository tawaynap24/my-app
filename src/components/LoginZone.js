import React,  {useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../components/Auth'
import firebaseConfig from '../config'

const LoginZone = () => {
    const { currentUser } = useContext(AuthContext);
    // {`${currentUser.email}` == 'admin@admin.com'}
    return(
        <>
            <div>
                {currentUser? (
                    <div>
                        {(currentUser.email == 'admin@admin.com')?(
                                <Link className="profile" to="/admin">{ currentUser.email}</Link>
                        ):(
                            <div>
                                <Link className="profile" to="/profile">{ currentUser.email}</Link>
                            </div>
                        )
                        }
                            <button onClick={() => firebaseConfig.auth().signOut()} class="sign-out"><Link to="/">Sign Out</Link></button>
                    </div>
                ) : (
                    <p><Link className="sign-in" to="/sign-in">เข้าสู่ระบบ</Link><Link className="sign-up" to="/sign-up">สมัครสมาชิก</Link></p>
                )}
            </div>
        </>
    )
}

export default LoginZone;