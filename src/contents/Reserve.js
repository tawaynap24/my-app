import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase, { storage } from '../config'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/Auth'


const Reserve = () => {
    const { id, slotnum } = useParams();
    const [event, setEvent] = useState([]);
    const [slot, setSlot] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [admin, setAdmin] = useState([]);
    const { currentUser } = useAuth();

    const [urlImg, setUrlImg] = useState("");
    const [progress, setProgress] = useState(0);
    const [map1, setMap1] = useState([])

    const ImgPre = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setMap1({ image: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }

        const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(e.target.files[0].name)
                    .getDownloadURL()
                    .then(url => {
                        setUrlImg(url)
                    });
                    console.log(e.target.files[0].name);
            }
        )

    }

    function AcceptEvent() {
        var date = showEvent.date
        var name = showEvent.name
        var where = showEvent.where

        var Size = showSlot.Size
        var Slot = slotnum
        var Price = showSlot.Price
        var State = "รอตรวจสอบ"
        var Type = showSlot.Type

        var email = currentUser.email

        console.log('click');

        

        firebase
            .firestore()
            .collection('event')
            .doc(id)
            .collection("slot")
            .doc(slotnum)
            .set({
                Size,
                Slot,
                State,
                Price,
                Type,
            })
        firebase
            .firestore()
            .collection('customer')
            .doc(showCustomer.id)
            .collection("history")
            .doc((id+"E"+slotnum))
            .set({
                date,
                name,
                email,
                where,
                Slot,
                Size,
                State,
                Price,
                Type,
                urlImg
            })

        firebase
            .firestore()
            .collection('admin')
            .doc((id+"E"+slotnum))
            .set({
                date,
                name,
                email,
                where,
                Slot,
                Size,
                State,
                Price,
                Type,
                urlImg
            })
    }

    function CancleEvent() {

        var Size = showSlot.Size
        var Slot = slotnum
        var State = "ว่าง"
        var Price = showSlot.Price
        var Type = showSlot.Type

        console.log('click');

        firebase
            .firestore()
            .collection('event')
            .doc(id)
            .collection("slot")
            .doc(slotnum)
            .set({
                Size,
                Slot,
                Price,
                State,
                Type
            })
    }

    useEffect(() => {

        firebase
            .firestore()
            .collection('event')
            .onSnapshot((snapshot) => {
                const newEvent = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setEvent(newEvent)

            })

        firebase
            .firestore()
            .collection('event')
            .doc(id)
            .collection('slot')
            .onSnapshot((snapshot) => {
                const newSlot = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setSlot(newSlot)
            })

        firebase
            .firestore()
            .collection('customer')
            .onSnapshot((snapshot) => {
                const newCustomer = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setCustomer(newCustomer)
            })
        
    }, [])

    if (event.length == 0 || slot.length == 0) return null;
    var showEvent = event.filter((e) => e.id == id)[0];
    var showSlot = slot.filter((e) => e.id == slotnum)[0];
    var showCustomer = customer.filter((e) => e.emailaddress == currentUser.email)[0];

    return (
        <div className="condiv">
            <div className="zone">
                {(showSlot.State == 'ว่าง')?(
                <div>
                    <center><h1>ยืนยันการจอง</h1></center>
                    <div>
                        <center><img className="create-img" src={showEvent.urlImg}/></center>
                        <p>ชื่องานเทศกาล: {showEvent.name}</p>
                        <p>สถานที่: {showEvent.where}</p>
                        <p>วันที่จัดงาน: {showEvent.date} เวลาที่จัดงาน: {showEvent.timestart} - {showEvent.timeend}</p>
                        <p>ตำแหน่งที่ต้องการจอง: {showSlot.Slot} </p>
                        <p>ขนาดพื้นที่: {showSlot.Size} ตารางเมตร </p>
                        <p>ราคา: {showSlot.Slot} บาท </p>
                        <center><h3>ช่องทางการชำระ</h3></center>
                        <div className="reserve-img">
                            <div>
                                <img className="logo-bank" src="https://giftcard.scb.co.th/assets/images/scb-logo.png"/>
                                <p>เลขบัญชี: 60109010509</p>
                                <p>ชื่อบัญชี: นาย ปกป้อง ลีประโคน</p>
                            </div>                            <div>
                                <img className="logo-bank" src="https://i.pinimg.com/originals/a0/3c/f5/a03cf5e37b4b1d0b376ad04a6b39e0b3.png"/>
                                <p>เลขบัญชี: 60109010511</p>
                                <p>ชื่อบัญชี: นาย ปัญญวัชร์ แสงจันทร์</p>
                            </div>
                            <div>
                                <img className="logo-bank" src="https://community.dtac.co.th/t5/image/serverpage/image-id/19929i9E43D6B7FE70B4B6?v=v2"/>
                                <p>เลขบัญชี: 60109010512</p>
                                <p>ชื่อบัญชี: นาย ปาณัสม์ กิจวรรณี</p>
                            </div>
                        </div>
                        <div className="reserve-img">
                            <div>
                                <p>โปรดแนบสลิปยืนยันการโอนเงิน</p>
                                <input type="file" onChange={ImgPre} required></input>
                                <p>{progress}</p>
                            </div>
                            <div>
                                <img className="create-img" src={map1.image || "http://via.placeholder.com/500x300"}/>
                            </div>
                        </div>

                    </div>
                    <center className="reservee">
                    <button onClick={() => { AcceptEvent() }}><Link to={"/detail/" + id}>ยืนยัน</Link></button>
                    <button onClick={() => { CancleEvent() }}><Link to={"/detail/" + id}>ยกเลิก</Link></button>

                    </center>
                </div>
                ):(
                <div>
                    <center><h1>พื้นที่นี้ถูกจองแล้ว</h1></center>
                </div>)
                }
            </div>
        </div>
    )
}
export default Reserve;