import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from '../utlis/APIRoutes'; 
import {Buffer} from 'buffer';


export default function SetAvatar() {
  const api ="https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const[avatars, setAvatars] = useState([]);
  const[isLoading,setIsLoading] = useState(true);
  const[selectedAvatar,setSelectedAvatar]=useState("");

  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
};

useEffect(()=>{
  if(!localStorage.getItem('chat-app-user')){
    navigate('/login');
  }
},[navigate]);

const setProfilePicture = async () => {
  if (selectedAvatar === "") {
    toast.error("Please Select an Avatar", toastOptions);
  } else {
    const userData = localStorage.getItem('chat-app-user');
    if (userData) {
      const user = JSON.parse(userData);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      // Handle response data if necessary
      if(data.isSet){
        user.isAvatarImageSet =true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user));
        navigate("/");
      }else{
        toast.error("Error Setting Avatar.Please Try Again",toastOptions);
      }
    } else {
      // Handle case where user data doesn't exist in localStorage
      console.error("User data not found in localStorage");
      // You might want to redirect the user to a login page or handle this case differently
    }
  }
};



useEffect(() => {
  const fetchData = async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Retry the request after an increasing delay (exponential backoff)
        const delay = Math.pow(1, error.config.retryCount || 0) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        // Retry the request
        fetchData();
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
        // You might want to set isLoading to false here if necessary
      }
    }
  };

  fetchData(); // Call the async function inside useEffect
}, []);

  return (
    <>
    {
     isLoading ?  <Container>
      <img src={loader} alt="Loader" className='loader' />
    </Container> :
        <Container>
            <div className="title-container">
              <h1>Select Avatar as your Profile Picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar,index)=>{
                return(
                  <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                  </div>
                );
              })}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Choose Avatar</button>
        </Container>
}
        <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader{
    max-inline-size: 100%;
  }

  .title-container{
    h1 {
      color: white;
    }
  }

  .avatars{
    display: flex;
    gap: 2rem;
    .avatar{
       border: 0.4rem solid transparent;
       padding: 0.4rem;
       border-radius: 5rem;
       display:flex;
       justify-content:center;
       align-items:center;
       transition: 0.5s ease-in-out;
       img{
        height:6rem;
      }
    }
    .selected{
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn{
    background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out; 
            &:hover{
                background-color:#4e0eff;
            }
  }


`;

