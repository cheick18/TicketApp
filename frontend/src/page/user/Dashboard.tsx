import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import UserList from "../../components/users/UserList";
import Navbar from "./Navbar";
import TicketsList from "../../components/tickets/TicketList";

export default function Dashboard() {
   const auth = useContext(AuthContext);

  return (
    <div >
      <Navbar />
      <div className=" pt-32 px-24">

   
  <TicketsList />
  <div className="block pt-16"></div>
<UserList /> 
   </div>
      
    </div>
  )
}
