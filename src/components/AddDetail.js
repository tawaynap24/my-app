import React, { useState, useEffect } from 'react'
import firebase from '../config'
import { storage } from '../config'

let setId = 1;
let setSlotId = 1;
var Id = { num: 0, unique: 0 };
var num = 0;
var unique = 0;

const AddDetail = () => {

    const [name, setName] = useState('')
    const [timeend, setTimeend] = useState('')
    const [timestart, setTimestart] = useState('')
    const [where, setWhere] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')

    const [urlImg, setUrlImg] = useState("");
    const [urlArea, setUrlArea] = useState("");
    const [progress, setProgress] = useState(0);

    const [map1, setMap1] = useState([])
    const [map2, setMap2] = useState([])

    const [inputList, setInputList] = useState([{ Slot: "1", Type: "", Size: "",Price: "", State: "ว่าง" }]);

    const [object, setObject] = useState([{ num: 0, unique: 0 }])

    useEffect(() => {

        firebase
            .firestore()
            .collection('setID')
            .onSnapshot((snapshot) => {
                const newId = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setObject(newId)
            })

        Id = object.filter((e) => e.unique == "0")[0]

        num = Id.num

    }, [])

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
                        console.log(urlImg);
                    });
            }
        )

    }

    const AreaPre = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setMap2({ image: e.target.result });
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
                    .then(areaa => {
                        setUrlArea(areaa)
                        console.log(urlArea);
                    });
            }
        )
    }

    function handleSubmit(e) {
        // e.preventDefault();
        console.log("click submit")

        firebase
            .firestore()
            .collection('setID')
            .onSnapshot((snapshot) => {
                const newId = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setObject(newId)
            })
        
        Id = object.filter((e) => e.unique == "0")[0]

        num = Id.num;

        num++;

        firebase
            .firestore()
            .collection('setID')
            .doc('setID')
            .set({
                num,
                unique
            })

        console.log(num);

        firebase
            .firestore()
            .collection('event')
            .doc(String(num))
            .set({
                name,
                timestart,
                timeend,
                where,
                date,
                desc,
                urlImg,
                urlArea,
            })
            .then(() => {
                setName('')
                setTimestart('')
                setTimeend('')
                setWhere('')
                setDate('')
                setDesc('')
                setUrlImg('')
                setUrlArea('')
                setMap1([])
                setMap2([])
                setId = setId + 1;
            })

        for (var i = 0; i < inputList.length; i++) {

            let Size = inputList[i].Size
            let Slot = inputList[i].Slot
            let Type = inputList[i].Type
            let State = inputList[i].State

            firebase
                .firestore()
                .collection('event')
                .doc(String(num))
                .collection('slot')
                .doc(String(setSlotId))
                .set({
                    Size,
                    Slot,
                    Type,
                    State
                })
                .then(() => {
                    setInputList([{ Slot: "1", Type: "", Size: "", Price: "", State: "ว่าง" }])
                })
            setSlotId = setSlotId + 1;
        }

        firebase
            .firestore()
            .collection('image')
            .add({
                urlImg
            })

        setSlotId = 1;
    }

    const handleInputChange = (e, index) => {  // handle input change
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {  // handle click event of the Remove button
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = num => {  // handle click event of the Add button
        setInputList([...inputList, { Slot: String(num), Type: "", Size: "", Price: "", State: "ว่าง" }]);
    };

    return (
        <div>
            <h1 className="subtopic">เพิ่มงานเทศกาลใหม่</h1>
            <form className="event-add-form" >
                <div className="event-add">
                    <h3 className="center">รายละเอียดเทศกาล</h3>
                    <li className="list-group-item">
                        <label className="label-space">ปกงานเทศกาล</label>
                        <input type="file" onChange={ImgPre} required/>
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">พื้นที่ขายสินค้า</label>
                        <input type="file" onChange={AreaPre} required/>
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">ชื่อ</label>
                        <input type="text" value={name} onChange={e => setName(e.currentTarget.value)} required />
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">สถานที่</label>
                        <input type="text" value={where} onChange={e => setWhere(e.currentTarget.value)} required />
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">วันที่</label>
                        <input type="text" value={date} onChange={e => setDate(e.currentTarget.value)} required />
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">ช่วงเวลา</label>
                        <input type="text" value={timestart} onChange={e => setTimestart(e.currentTarget.value)} required />
                        <label className="label-space">ถึง</label>
                        <input type="text" value={timeend} onChange={e => setTimeend(e.currentTarget.value)} required />
                    </li>
                    <li className="list-group-item">
                        <label className="label-space">รายละเอียด</label><br />
                        <textarea rows="8" cols="60" type="text" value={desc} onChange={e => setDesc(e.currentTarget.value)} required maxLength="1000" placeholder="Enter text here..." />
                    </li>
                </div>
                <div className="event-pic-show">
                    <h3 className="center">ปกงานเทศกาล</h3>
                    <img className="create-img" id="target" src={map1.image || "http://via.placeholder.com/500x300"} alt="firebase-image" />
                    <h3 className="center">พื้นที่ขายสินค้า</h3>
                    <img className="create-area" id="targett" src={map2.image || "http://via.placeholder.com/500x300"} alt="firebase-image" />
                </div>
            </form>
            <div>
                <h3>Add slot</h3>
                {inputList.map((x, i) => {
                    return (
                        <div key={i} className="new-slot">
                            <a name="Type" value={i + 1} onChange={e => handleInputChange(e, i)} >ล็อตที่ {i + 1}</a>
                            <a>&nbsp; ประเภทสินค้า &nbsp;</a>
                            <select name="Type" value={x.Type} onChange={e => handleInputChange(e, i)}>
                                <option value=""></option>
                                <option value="อาหารสด">อาหารสด</option>
                                <option value="อาหารแห้ง">อาหารแห้ง</option>
                                <option value="เสื้อผ้า">เสื้อผ้า</option>
                                <option value="ของหวาน">ของหวาน</option>
                                <option value="ของชำ">ของชำ</option>
                                <option value="ของเล่น">ของเล่น</option>
                                <option value="เครื่องสำอาง">เครื่องสำอาง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                            <a>&nbsp; ขนาดพื้นที่ &nbsp;</a>
                            <input name="Size" placeholder="ex. 1*1 ตารางเมตร" value={x.Size} onChange={e => handleInputChange(e, i)} />
                            <a>&nbsp;  &nbsp;</a>
                            <input name="Price" placeholder="xxx บาท" value={x.Price} onChange={e => handleInputChange(e, i)} />
                            <a>&nbsp; สถานะ &nbsp;</a>
                            <select name="State" value={x.State} onChange={e => handleInputChange(e, i)}>
                                <option value="ว่าง">ว่าง</option>
                                <option value="จองแล้ว">จองแล้ว</option>
                            </select>
                            &nbsp;&nbsp;
                            {inputList.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                            &nbsp;&nbsp;
                            {inputList.length - 1 === i && <button onClick={() => handleAddClick(i + 2)}>Add</button>}

                        </div>
                    );
                })}
            </div>
            <center><button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button></center>
        </div>
    )
}

export default AddDetail;