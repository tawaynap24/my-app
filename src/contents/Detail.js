import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../config'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/Auth'

const Detail = () => {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [slot, setSlot] = useState([]);

    const classdetail = (e) => {
        if (e != 'ว่าง') {
            if (e != 'จองแล้ว') {

                return "yellow"
            }
            else{
                return "red"
            }
        }
        else {
            return "green"
        }
    }

    function ChangeState(e) {

        var Size = e.Size
        var Slot = e.Slot
        var State = "รอตรวจสอบ"
        var Type = e.Type
        var Price = e.Price

        console.log('click');

        // firebase
        //     .firestore()
        //     .collection('event')
        //     .doc(id)
        //     .collection("slot")
        //     .doc(e.Slot)
        //     .set({
        //         Size,
        //         Slot,
        //         State,
        //         Type,
        //         Price
        //     })
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

    }, [])

    if (event.length == 0) return null;
    var showEvent = event.filter((e) => e.id == id)[0];


    return (
        <div className="condiv">
            <div className="zone">
                <h1 className="subtopic">{showEvent.name}</h1>
                <div>
                    <img className="img-detail" src={showEvent.urlImg} />
                    <p>สถานที: {showEvent.where} </p>
                    <p>วันที: {showEvent.date} </p>
                    <p>ระยะเวลา: {showEvent.timestart} - {showEvent.timeend} </p>
                    <p>รายละเอียด: {showEvent.desc}</p>
                </div>
                <div className="container-event">
                    <center><img className="state-img center" src={showEvent.urlArea} /></center>
                    {/* <Slot/> */}
                </div>
                <div className="zone">
                    <div>
                        <div>
                            <p>ขั้นตอนการชำระเงิน</p>
                            <p>&nbsp;&nbsp;&nbsp;ชำระเงินผ่านการโอนเงิน และทำการแนบสลิปการโอนเงินเพื่อยืนยันการจอง สามารถชำระเงินผ่านทางบัญชีดังนี้</p>
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
                            <p>คำอธิบายสถานะ</p>
                            <p><div className="state green" />ว่าง : พื้นที่ขายสินค้ายังไม่มีการจอง สามารถทำการจองได้</p>
                            <p><div className="state yellow" />รอตรวจสอบ : มีผู้ใช้อื่นกำลังทำการจอง ไม่สามารถทำการจองได้</p>
                            <p><div className="state red" />จองแล้ว : พื้นที่นี้มีผู้ใช้อื่นทำการจองแล้ว ไม่สามารถทำการจองได้</p>
                        </div>
                        <center>
                            <table className="event-table center">
                                <tr>
                                    <td>ล็อตที่</td>
                                    <td>ประเภทสินค้า</td>
                                    <td>ขนาดพื้นที่ (ตารางเมตร)</td>
                                    <td>ราคา (บาท)</td>
                                    <td>สถานะ</td>
                                    <td>จองพื้นที่</td>
                                </tr>
                                {slot.map((data) =>
                                    <tr key={data.Slot}>
                                        <td>{data.Slot}</td>
                                        <td>{data.Type}</td>
                                        <td>{data.Size}</td>
                                        <td>{data.Price}</td>
                                        <td className={classdetail(data.State)}>{data.State}</td>
                                        {(data.State == 'ว่าง') ?
                                            (<td><Link to={"/reserve/" + id + "/" + data.Slot} onClick={() => { ChangeState(data) }}>จองพื้นที่</Link></td>)
                                            : (<td>ไม่สามารถทำการจองได้</td>)
                                        }

                                    </tr>
                                )}
                            </table>

                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail;