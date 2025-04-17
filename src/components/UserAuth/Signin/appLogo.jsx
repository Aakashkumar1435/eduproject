import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

export default function AppLogo() {
    return (
        <div className="flex flex-col items-center h-48 pt-10"> {/* Adjust height here */}
            <Avatar className="w-32 h-32">
                <AvatarImage alt="App Logo" src="/images/MyPhoto.jpg" />
                <AvatarFallback className="text-2xl">Logo</AvatarFallback>
            </Avatar>
        </div>
    );
}
