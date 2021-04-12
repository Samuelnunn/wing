import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './Footer.css';



const Footer = () => {


    return (
        <div className='footer-component'>
            <div className='format-container'>
                <a href='https://github.com/Samuelnunn' >
                    <GitHubIcon className='icon-size'/>
                </a >
                <a href='https://www.linkedin.com/in/samuelnunn90/' >
                    <LinkedInIcon className='icon-size'/>
                </a >
                <a href='https://www.samuel-nunn.com' >
                    <PersonOutlineIcon className='icon-size'/>
                </a >
                <a href='mailto:samuelnunn90@gmail.com' >
                    <EmailIcon className='icon-size'/>
                </a >
                <div className='footer-text'>
                    <h2>Created by Samuel Nunn © 2021</h2>
                </div>
            </div>
        </div>
    );

};

export default Footer;