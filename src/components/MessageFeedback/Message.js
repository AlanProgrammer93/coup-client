import React, { useEffect } from 'react'
import './Message.css'

const Message = ({msg, setError}) => {
    useEffect(() => {
        setTimeout(() => 
            setError('')
        , 3000)
        // eslint-disable-next-line
    }, []) 

    return (
        <div className="message">
            {msg}
        </div>
    )
}

export default Message
