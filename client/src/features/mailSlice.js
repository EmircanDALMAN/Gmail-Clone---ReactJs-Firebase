import {createSlice} from "@reduxjs/toolkit";

export const mailSlice = createSlice({
   name: "mail",
   initialState: {
      selectedMail: null,
      sendMessageIsOpen: false,
      user: null
   },
   reducers: {
      login: (state, action) => {
         state.user = action.payload
      },
      logout: (state) => {
         state.user = null
      },
      selectMail: (state, action) => {
         state.selectedMail = action.payload
      },
      changeSendMessage: (state) => void (state.sendMessageIsOpen = !state.sendMessageIsOpen),
   }
})

export const {changeSendMessage, selectMail, login, logout} = mailSlice.actions;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectUser = (state) => state.mail.user;
export default mailSlice.reducer;
