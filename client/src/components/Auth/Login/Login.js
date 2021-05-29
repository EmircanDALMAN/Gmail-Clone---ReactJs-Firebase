import React from 'react';
import "./Login.css"
import {Button} from "@material-ui/core";
import {auth, provider} from "../../../firebase";
import {login} from "../../../features/mailSlice";
import {useDispatch} from "react-redux";

const Login = () => {
   const dispatch = useDispatch();

   const signIn = () => {
      auth
         .signInWithPopup(provider)
         .then(({user}) => {
            dispatch(login({
               displayName: user.displayName,
               email: user.email,
               photoUrl: user.photoURL
            }))
         })
         .catch(e => alert(e.message))
   }

   return (
      <div className={"login"}>
         <div className="login__container">
            <img src="/images/login-logo.png" alt=""/>
            <Button style={{marginTop: "35px"}} variant={"contained"} onClick={signIn}
                    color={"primary"}> Giriş Yap</Button>
         </div>
      </div>
   )
}

export default Login;
