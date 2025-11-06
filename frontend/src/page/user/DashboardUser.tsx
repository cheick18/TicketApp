import React from 'react'
import TicketsList from '../../components/tickets/TicketList'
import Navbar from './Navbar'

export default function DashboardUser() {
  return (
    <div>
        <Navbar />
        
        <TicketsList />
    </div>
  )
}
