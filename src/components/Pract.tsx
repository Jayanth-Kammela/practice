import React from 'react'
import { useToast } from '../context/ToastContext';

const Pract = () => {
    const showToast = useToast();
    const msg='This is a success message!'

    const handleClick = () => {
        showToast(msg, { type: 'success' } as object);

        // showToast('This is an error message!', { type: 'error' } as object);
    };

    return (
        <React.Fragment>
            <button onClick={handleClick}>Show Toast</button>
        </React.Fragment>
    );
}

export default Pract
