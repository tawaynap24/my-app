import React, { useState } from "react";
import firebase from '../config'

function AddSlot() {
  const [inputList, setInputList] = useState([{ Slot: "1", Type: "", Size: "", State: "ว่าง" }]);

  const handleSubmit = (e) => {

    // e.preventDefault();
    console.log("click handleImg")

    for (var i = 0; i < inputList.length; i++) {

      console.log(inputList[i])
      let listSlot = inputList[i]

      firebase
        .firestore()
        .collection('event')
        .doc("lEwiMIXZGxAujtbgJY0Z")
        .collection('slot')
        .add({
          listSlot
        })
        .then(() => {
          setInputList([{ Slot: "1", Type: "", Size: "", State: "ว่าง" }])
        })
    }
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
    setInputList([...inputList, { Slot: String(num), Type: "", Size: "", State: "ว่าง" }]);
  };

  return (
    <div>
      <h3>Add slot</h3>
      {inputList.map((x, i) => {
        return (
          <div className="new-slot">
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
  );
}

export default AddSlot;