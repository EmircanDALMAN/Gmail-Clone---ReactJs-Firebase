import React from 'react';
import {Close} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import "./SendMail.css"
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {changeSendMessage} from "../../features/mailSlice";
import {db} from "../../firebase";
import firebase from "firebase";

const SendMail = () => {
   const {register, handleSubmit, watch, errors} = useForm();
   const dispatch = useDispatch();

   const onSubmit = (formData) => {
      db
         .collection("emails")
         .add({
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
      dispatch(changeSendMessage())
   }

   return (
      <div className={"sendMail"}>
         <div className="sendMail__header">
            <h3>New Message</h3>
            <Close onClick={() => dispatch(changeSendMessage())} className={"sendMail__close"}/>
         </div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input name={"to"} placeholder={"Alıcı"}
                   type="email" {...register("to", {required: true})}/>

            <input name={"subject"} placeholder={"Konu"}
                   type="text" {...register("subject", {required: true})}/>

            <input name={"message"} placeholder={"Message"} className={"sendMail__message"}
                   type="text" {...register("message", {required: true})}/>

            <div className="sendMail__options">
               <Button className={"sendMail__send"} variant={"contained"}
                       type={"submit"} color={"primary"}>Gönder</Button>
            </div>
         </form>
      </div>
   )
}

export default SendMail;
