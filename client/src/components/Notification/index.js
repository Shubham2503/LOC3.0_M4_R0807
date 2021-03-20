import React from 'react'
import addNotification from 'react-push-notification';

const Notification = (props) => {

    const popNotification = () => {
        addNotification({
            title: props.title || 'Notification',
            message: props.msg || 'This is a very long message',
            theme: 'darkblue',
            native: true
        });
    };


    if(props.visible === false)
        return null

    return (
        <div>
            {popNotification()}
        </div>
    )
}

export default Notification