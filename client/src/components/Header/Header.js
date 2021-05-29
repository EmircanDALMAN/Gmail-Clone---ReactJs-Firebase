import React from 'react';
import "./Header.css"
import {Avatar, IconButton} from "@material-ui/core";
import {Apps, ArrowDropDown, Menu, Notifications, Search} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../features/mailSlice";
import {auth} from "../../firebase";

const Header = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const user = useSelector(selectUser);

   const signOut = () => {
      auth.signOut().then(() => {
         dispatch(logout())
      })
   };

   return (
      <div className={"header"}>
         <div className="header__left">
            <IconButton><Menu/></IconButton>
            <img style={{cursor: "pointer"}} src="/images/logo.png" alt="Logo"
                 onClick={() => history.push("/")}/>
         </div>
         <div className="header__middle">
            <Search/>
            <input type="text" placeholder={"Mail Ara"}/>
            <ArrowDropDown className={"header__inputCaret"}/>
         </div>
         <div className="header__right">
            <IconButton><Apps/></IconButton>
            <IconButton><Notifications/></IconButton>
            <Avatar style={{cursor: "pointer"}} onClick={signOut} src={user?.photoUrl}/>
         </div>
      </div>
   )
}

export default Header;
