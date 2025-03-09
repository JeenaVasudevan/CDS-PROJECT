import React from 'react';
import { Outlet } from 'react-router-dom';

function UserLayout(props) {
    return (
        <div>
            <div className='min-h-96'>
            <Outlet />
            </div>
        </div>
    );
}

export default UserLayout;