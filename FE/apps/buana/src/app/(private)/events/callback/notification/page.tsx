"use client"
import type { ReactElement } from "react";

export default function NotificationCallback() : ReactElement {

    const keyStorage = 'accessTokenNotification';

    const handleCallback = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
      
        if (accessToken) {
          localStorage.setItem(keyStorage, accessToken);
          window.close();
        }
      };
      
      handleCallback();
  return (
    <div className='text-white'>
        Close This Page
    </div>
  )
};
