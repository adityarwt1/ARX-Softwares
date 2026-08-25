"use client"

import React, { createContext, useContext } from "react"

interface AdminPageContextsProps {
    value:number
}

const  AdminPageContext = createContext<AdminPageContextsProps | null>(null)

export function AdminaPageWrapper({
    children, 
    value
}:{
    children:React.ReactNode,
    value:number
}){
    return <AdminPageContext.Provider value={{ value }}>
        {children}
    </AdminPageContext.Provider>
}

export function useAdminPage() {
    const context = useContext(AdminPageContext)

    if (!context) {
        throw new Error("useAdminPage must be used inside AdminaPageWrapper")
    }

    return context
}


