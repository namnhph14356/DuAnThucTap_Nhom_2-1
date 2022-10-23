import React, { createContext } from 'react'

const NotificationConext = createContext()

export default function NotificationProvider({ children }) {
    const updateNotification = () => {

    }


    return <NotificationConext value={{ updateNotification }}>
        {children}
        <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
            <div className="shadow-md shadow-gray-400 bg-red-400 rounded bounce-custom">
                <p className="text-white px-4 py-4 font-semibold">Something went wrong</p>
            </div>
        </div>
    </NotificationConext>
}
