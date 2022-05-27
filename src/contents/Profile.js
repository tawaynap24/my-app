import React, { useState, useEffect } from 'react'
import firebase from '../config'
import { useAuth } from '../components/Auth'
var i=0;
const Profile = () => { 
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState([]);
    const [slot, setSlot] = useState([{Slot: "11"}]);

    var showProfile = {id: "A"}
    var idcustomer = "AA";

    const classdetail = (e) => {
        if (e != 'รอตรวจสอบ') {
            if (e != 'อนุมัติ') {

                return "green"
            }
            else{
                return "red"
            }
        }
        else {
            return "yellow"
        }
    }

    async function fireget(){
        
        await firebase
        .firestore()
        .collection('customer')
        .onSnapshot((snapshot) => {
            const newProfile = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setProfile(newProfile)
        })
    }

    async function firegett(e){
        
        await firebase
            .firestore()
            .collection('customer')
            .doc(e)
            .collection('history')
            .onSnapshot((snapshot) => {
            const newSlot = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setSlot(newSlot)
        })
    }

    useEffect(() => {
        try{
            fireget()}
        catch(error){
            console.log(error);
        }
        
    }, [])

    
    if(profile.length == 0) return null;

    showProfile = profile.filter((e) => e.emailaddress == `${currentUser.email}`)[0];

    idcustomer = showProfile.id

    for(i;i<1;i++){

    fireget()
    firegett(idcustomer)

    }

    // console.log("Hello");
    // console.log(profile);
    // console.log(idcustomer);
    // console.log(slot);
    // console.log(showProfile);

        return(
                <div className="condiv">
                    <div className="zone">
                    {currentUser ? 
                        <div>
                        <h1 className="subtopic">ข้อมูลผู้ใช้</h1>
                        <div>
                            <div>
                                <p>ชื่อ: {showProfile.firstname} </p>
                                <p>นามสกุล: {showProfile.lastname}</p>
                                <p>อายุ: {showProfile.age}</p>
                                <p>เลขบัตรประชาชน: {showProfile.number}</p>
                                <p>เบอร์โทรศัพท์: {showProfile.phone}</p>
                                <p>อีเมล: {showProfile.emailaddress}</p>
                            </div>
                        </div>
                        <h1 className="subtopic">ประวัติการจอง</h1>
                        <center>
                            <table className="event-table center">
                                    <tr>
                                        <td>ชื่องานเทศกาล</td>
                                        <td>สถานที่จัดงาน</td>
                                        <td>วันที่จัดงาน</td>
                                        <td>ล็อตที่</td>
                                        <td>ประเภทสินค้า</td>
                                        <td>ขนาดพื้นที่ (ตารางเมตร)</td>
                                        <td>ราคา (บาท)</td>
                                        <td>สถานะ</td>
                                    </tr>
                            {slot.map((data) =>
                                    <tr key={data.Slot}>
                                        <td>{data.name}</td>
                                        <td>{data.where}</td>
                                        <td>{data.date}</td>
                                        <td>{data.Slot}</td>
                                        <td>{data.Type}</td>
                                        <td>{data.Size}</td>
                                        <td>{data.Price}</td>
                                        <td className={classdetail(data.State)}>{data.State}</td>
                                    </tr>
                                )}
                            </table>
                        </center>
                        </div>
                        :<div>
                        <center>
                            <h1>คุณยังไม่ได้ทำการล็อกอิน<br/>กรุณาทำการล็อกอิน</h1>
                        </center>
                        </div>}
                    </div>
                </div>
                
        )
    
}



export default Profile;