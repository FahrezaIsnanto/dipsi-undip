import React from 'react'
import './layout.css'

const Layout = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    )
}

export default Layout
