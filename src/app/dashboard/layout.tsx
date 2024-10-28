import Header from '@/components/Header'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default DashboardLayout;

