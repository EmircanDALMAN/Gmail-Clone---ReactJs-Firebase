import React, {useEffect, useState} from 'react';
import "./EmailList.css"
import {
   ArrowDropDown,
   CheckBox,
   ChevronLeft,
   ChevronRight,
   Inbox,
   KeyboardHide,
   LocalOffer,
   MoreVert,
   People,
   Redo,
   Settings
} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import Section from "./Section/Section";
import EmailRow from "./EmailRow/EmailRow";
import {db} from "../../firebase";

const EmailList = () => {
   const [emails, setEmails] = useState([])

   useEffect(() => {
      db
         .collection("emails")
         .orderBy("timestamp", "desc")
         .onSnapshot((snapshot) => {
            setEmails(snapshot.docs.map(doc => ({
               id: doc.id,
               data: doc.data()
            })))
         })
   }, [])

   return (
      <div className={"emailList"}>
         <div className="emailList__settings">
            <div className="emailList__settingsLeft">
               <CheckBox/>
               <IconButton><ArrowDropDown/></IconButton>
               <IconButton><Redo/></IconButton>
               <IconButton><MoreVert/></IconButton>
            </div>
            <div className="emailList__settingsRight">
               <IconButton><ChevronLeft/></IconButton>
               <IconButton><ChevronRight/></IconButton>
               <IconButton><KeyboardHide/></IconButton>
               <IconButton><Settings/></IconButton>
            </div>
         </div>
         <div className="emailList__sections">
            <Section Icon={Inbox} title={"Primary"} color={"red"} selected/>
            <Section Icon={People} title={"Social"} color={"#1A73E8"}/>
            <Section Icon={LocalOffer} title={"Promotions"} color={"green"}/>
         </div>
         <div className="emailList__list">
            {emails.map(({id, data: {title, to, description, subject, message, timestamp}}) => (
               <EmailRow
                  key={id}
                  id={id}
                  title={to}
                  subject={subject}
                  description={description}
                  time={new Date(timestamp?.seconds * 1000).toUTCString()}
               />
            ))}
         </div>
      </div>
   )
}

export default EmailList;
