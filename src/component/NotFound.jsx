import React from 'react'

function NotFound() {
    const style = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        margin: '20px',
        height: '100vh'
    }
    return (
        <div style={style}>
            <h1>404 Page Not Found</h1>
        </div>
    )
}

export default NotFound