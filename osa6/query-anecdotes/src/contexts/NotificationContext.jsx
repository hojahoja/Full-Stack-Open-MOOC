/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0];
};

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1];
};

export default NotificationContext;
