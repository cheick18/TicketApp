import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCheck } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

export default function Navbar() {
     const auth = useContext(AuthContext);

  return (
      <nav className="w-full bg-white px-4 py-2 flex items-center justify-between shadow-sm">
    
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-8 object-cover"
        />
        <span className="text-lg font-semibold">TicketApp</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex gap-1">
                <FaUserCheck/><span className="text-md text-gray-700 font-medium">{auth?.user?.email}</span>

            </div>
       
         
        </div>

         <button className="flex items-center gap-2 text-sm  cursor-pointer" onClick={auth?.logout}> < IoLogOutSharp/><span className="material-icons">logout</span> </button>
      </div>
    </nav>

  )
}
