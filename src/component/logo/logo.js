import React from 'react';
import logImg from '../../piggg.jpg'
import './logo.css';
export default class Logo extends React.Component{
    render(){
        return(
            <div className="logo-container">
                <img src={logImg} alt="头像"/>
            </div>
        )
    }
}