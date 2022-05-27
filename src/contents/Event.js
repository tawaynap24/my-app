import React, { useState, useEffect, components} from 'react'
import { Link } from 'react-router-dom'
import firebase, { storage } from '../config'

const Event = () => {

    const [event, setEvent] = useState([])
    
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

    }, [])

    return(
        <div className="condiv">
            <div className="zone">
                <h1 className="subtopic">งานเทศกาล</h1>
                    {event.map((data) =>
                    <div key={data.id}>
                        
                        <Link to={"/detail/"+data.id} className="new-event">
                            <img className="event-img" src={data.urlImg} alt=""></img>
                            <div className="event-content">
                                <div>ชื่อ: {data.name}</div>
                                <div>สถานที่: {data.where}</div>
                                <div>วันที่: {data.date}</div>
                                <div>เวลา: {data.timestart} - {data.timeend}</div>
                                <div>รายละเอียด: {data.desc}</div>
                            </div>
                        </Link>
                    </div>
                    )}
                
                </div>
            </div>
        )
}
export default Event;