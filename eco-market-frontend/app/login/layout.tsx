import { title } from "process";
import React, { Children } from "react";

export const metadana = {
    title: 'Login | Eco Market',
    description: 'CAPSTONE DICODING ACEDEMY',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({children}: PropsLayout) => {
    return (
        <div> {children}</div>
    )
}


export default RootLayout