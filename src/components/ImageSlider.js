import React, { useState, useEffect } from 'react';
import {SliderData} from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import firebase from '../config'

function ImageSlider({ slides }) {
const [current, setCurrent] = useState(0);
const length = slides.length;
const [data,setData] = useState([]);

useEffect(() => {
    firebase
    .firestore()
    .collection('image')
    .onSnapshot((snapshot) => {
        const newImage = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        setData(newImage)
    })
    
},[])

const nextSlide = () => {
    setCurrent(current === length -1 ? 0 : current + 1)
}

const prevSlide = () => {
    setCurrent(current === 0 ? length -1 : current - 1)
}

if(!Array.isArray(slides) || slides.length <= 0) {
    return (null)
}
console.log(SliderData);
console.log(data);
console.log(slides);
    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}  />
            {/* <Dots/> */}
            {data.map((slide, index) => {
            return (
                <div className={index === current ? 'slide active' : 'slide active'} key={index}>
                    {index ===current && (
                    <img src={slide.urlImg} className="image"/>)}
                </div>
                )
                
        })}
        </section>
    )
}

export default ImageSlider;