import React from 'react'
import ToastProvider from './context/ToastContext'
import Pract from './components/Pract'
import axios from 'axios';
import { userSignIn } from './service';

const App = () => {

  const handleSubmit = async () => {
    try {
      const userData = { email: "chintu78299@gmail.com", password: "Jay@123" }

      const response = await userSignIn(userData)
      console.log(response.data);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <React.Fragment>
      {/* <ToastProvider>
        <Pract />
      </ToastProvider> */}
      <button onClick={handleSubmit}>clicl</button>
    </React.Fragment>
  )
}

export default App


