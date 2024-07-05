import React,{useState,useContext} from 'react';
import './Footer.css';
import home from '../../assets/white_home.png';
import user_logo from '../../assets/white_user.png';
import plus from '../../assets/plus.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {BASE_URL} from '../../Utils/config.js';
import useFetch from '../../hooks/useFetch.js';
import {AuthContext} from "../../context/AuthContext";


const Footer = ()=>{

    const navigate = useNavigate();

    const { user,dispatch } = useContext(AuthContext);//to get user id
    const { data: userData } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null);//call us api. It has all user data
    
    const [togglePopup,setTogglePopup] = useState(false);

    //Logout
    const logout =()=>{
     
      dispatch({type:'LOGOUT'})
      setTogglePopup(false)
      navigate('/')
      alert("Successfully Logged out!!")
    }

    
return (
<footer className="footer relative">
   
   

<div className="footer__main flex justify-center items-center gap-1 px-4 py-3 rounded-t-xl">
   
   {user?
    <div style={{backgroundColor:'#f5c518'}} onClick={() => { navigate('/add-cast'); setTogglePopup(false)}} className="add absolute p-3">
        <div className="add__img relative h-8 w-8"><img src={plus} /></div>
    </div>
    :
    <div style={{backgroundColor:'black'}} className="add absolute p-3" disabled>
       <div className="add__img relative h-8 w-8"><img src={plus} /></div>
    </div>
   }
  

   <div onClick={()=>{navigate('/'); setTogglePopup(false)}} className="footer__ flex flex-col justify-center items-center gap-1">
       <div className="relative w-6 h-6"><img className="home__logo absolute" src={home}/></div>
       <h5 className="text-white">Home</h5>     
   </div>

   <div onClick={()=>{setTogglePopup(!togglePopup)}} className="footer__ flex flex-col justify-center items-center gap-1">
       <div className="relative w-6 h-6"><img className="console__logo absolute" src={user_logo}/></div> 
       <h5 className="text-white">Profile</h5>
   </div>

</div>

{
    togglePopup?
    <div className="mobile__menu">
{
    user?
    <>
    <div className="mobile__menu__name">
        <h5>Hi {userData.username}!</h5>
    </div>
    <div className="mobile__menu__btn">
        <button onClick={logout} style={{backgroundColor: 'black'}} className="flex items-center justify-center"><h5>Logout</h5></button>
    </div>
    </>
    :
    <div className="mobile__menu__btn">
        <button onClick={()=>{navigate('/login'); setTogglePopup(false)}} style={{backgroundColor: '#5F69C7'}} className="flex items-center justify-center"><h5>Login</h5></button>
    </div>
          
}
</div>
:
<></>
}


</footer>
)
};




export default Footer;
