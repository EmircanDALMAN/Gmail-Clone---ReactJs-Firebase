import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList";
import SendMail from "./components/SendMail/SendMail";
import {useDispatch, useSelector} from "react-redux";
import {login, selectSendMessageIsOpen, selectUser} from "./features/mailSlice";
import Login from "./components/Auth/Login/Login";
import {auth} from "./firebase";

function App() {
   const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
   const user = useSelector(selectUser)
   const dispatch = useDispatch();

   useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         if (authUser) {
            dispatch(login({
               displayName: user.displayName,
               email: user.email,
               photoUrl: user.photoURL
            }))
         }
      })
   }, [])

   return (
      <Router>
         {!user ? (
            <Login/>
         ) : (
            <div className="app">
               <Header/>
               <div className="app__body">
                  <Sidebar/>
                  <Switch>
                     <Route path={"/mail"}><Mail/></Route>
                     <Route path={"/"}><EmailList/></Route>
                  </Switch>
               </div>
               {sendMessageIsOpen && <SendMail/>}
            </div>
         )}
      </Router>
   );
}

export default App;
