import React, { useState } from "react";
import {Menu,Bell,User,LayoutDashboard,Users,Briefcase,ShoppingCart,ClipboardCheck,CalendarCheck,BookOpen,Package,GraduationCap,UsersRound,FileCheck2,Ticket,CreditCard,UserX,FileMinus,PhoneCall,AlertTriangle,} from "lucide-react";

const Header = ({ setDropdownOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setDropdownOpen && setDropdownOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center w-full h-16 px-4 md:px-8 shadow-md bg-gradient-to-r from-pink-500 to-purple-600 text-white relative">
      <button className="text-2xl md:text-3xl focus:outline-none" onClick={toggleDropdown}>
        <Menu />
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-purple-950 text-blue-300 w-64 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}
      >
      <div className="flex justify-center items-center border-b h-16">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJZ1in1nXRHn2V1w1now-nbNnjbmcsc51NA&s"alt="Logo"/>
      </div>


       
      <div className="h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          <ul className="p-2 space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: Users, label: "Admins" },
              { icon: Briefcase, label: "Departments" },
              { icon: ShoppingCart, label: "Customers" },
              { icon: ClipboardCheck, label: "Courses & Streams" },
              { icon: CalendarCheck, label: "Batches" },
              { icon: BookOpen, label: "Batches (cc)" },
              { icon: Package, label: "Products" },
              { icon: GraduationCap, label: "Enrolled Batches" },
              { icon: UsersRound, label: "Enrolled Batches (Sales)" },
              { icon: FileCheck2, label: "Enrolled Products" },
              { icon: Ticket, label: "Tickets" },
              { icon: CreditCard, label: "Payments" },
              { icon: UserX, label: "Not Logged Students" },
              { icon: FileMinus, label: "No Gdrive Students" },
              { icon: PhoneCall, label: "Call Reminders" },
              { icon: AlertTriangle, label: "Pending Approvals" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer text-sm"
              >
                <item.icon className="w-5 h-5 text-pink-400" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        <User className="w-6 h-6 cursor-pointer hover:text-gray-200" />
      </nav>
    </div>
  );
};

export default Header;
