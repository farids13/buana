"use client"
import type { ReactElement } from "react";

export default function LinkGmeetCallback() : ReactElement{

    const handleCallback = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
      
        if (accessToken) {
          localStorage.setItem('googleAccessToken', accessToken);
          window.close();
        }
    };
      
    handleCallback();
  return (
    <div className='text-white'>
      Please Close This Page
    </div>
  )
};
 