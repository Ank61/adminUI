import '../Pages/mainPage/mainPage.css'
import { Button } from 'react-bootstrap';
import Image from '../../Images/logo.jpeg';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebar.css';



export default function Sidebar(){

    const [admin,setAdmin] = useState({})

    const navigate =useNavigate()

    function handleLogo(){
        navigate("/")
    }
    function handleDashboard(){
        navigate("/")
    }
    function handleUser(){
        navigate("/user")
    }
    function handleDailyTask(){
        navigate("/dailyTask")
    }

useEffect(()=>{
axios.get('http://localhost:3001/user').then((response)=>setAdmin(response.data)).catch((err)=>console.log(err))
},[])


    return (
        <>
         <img src={Image} alt="Company Logo" style={{width:180,height: 110,paddingLeft:60}} onClick={()=>handleLogo()}></img>
           <div>
            <div className='profilePic'>

            </div>
         {admin.length>0?<h6 className='admin'>{admin[5].name}</h6>:""}
         {admin.length>0?<h6 className='designation'>{admin[5].designation}</h6>:""}
         </div>
                <br></br>
                <Button  variant="light" size="md" className='buttons' onClick={()=>handleDashboard()}><i class="fa-solid fa-chart-line"></i> &nbsp; Dashboard</Button>
                <br></br>
                <Button  variant="light" size="md" className='button2'  onClick={()=>handleUser()}><i class="fa-solid fa-user"></i> &nbsp; User</Button>
                <br></br>
                <Button  variant="light" size="md" className='button3'  onClick={()=>handleDailyTask()}><i class="fa-solid fa-list-check"></i> &nbsp; Daily Task</Button>
        </>
    )
}