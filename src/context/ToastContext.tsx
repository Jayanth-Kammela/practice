import React, { createContext, useContext, ReactNode } from 'react';
import { Toaster, ToastOptions, toast } from 'react-hot-toast';


type ToastContextType = (message: string, options?: ToastOptions) => void;

const ToastContext = createContext<ToastContextType | any>(null);


export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    //   if (!context) {
    //     throw new Error('useToast must be used within a ToastProvider');
    //   }
    return context;
};

// ToastProvider
interface ToastProviderProps {
    children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const showToast: ToastContextType = (message, options) => toast(message, options);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </ToastContext.Provider>
    );
};

export default ToastProvider;
