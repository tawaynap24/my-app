import React, { Component, useState, useEffect } from 'react'
import ReactTypingEffect from 'react-typing-effect'
import ImageSlider from '../components/ImageSlider'
import { SliderData } from '../components/SliderData'
import logo from '../img/logo.png'
import firebase from '../config'

const Home = () => {
    const [slidedata,setSlidedata] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('image')
        .onSnapshot((snapshot) => {
            const newSlide = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))
            setSlidedata(newSlide)
        })
    },[])

        return (
            <div className="condiv home">
                <div className="zone"><ImageSlider slides={slidedata}/></div>
                <div className="zone sub">
                    <div>
                        <img className="sub-img" src={logo}/>
                    </div>
                    <div className="sub-content">
                        <h2>รายละเอียด</h2>
                        <p>content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content</p>
                    </div>
                </div>
                {/* <div className="zone">
                    <ReactTypingEffect text={['Plan-D Organization','A Reservation Online']} speed={80} eraseDelay={100} className="typingeffect" />
                </div> */}
            </div>
        )
}

export default Home;