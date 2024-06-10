import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ProfilePic from "../../assets/pfp.png";
import Logo from "../../assets/maskable-icon.png";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import StudentTable from "../StudentTable";
import LogoutButton from "../../components/sidebar/LogoutButton";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState("light"); // theme toggle
  const [userSelected, setUserSelected] = useState(false); // state to manage user selection
  const { authUser } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSidebarItemClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  // theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Set initial theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle user selection
  const handleUserSelection = () => {
    setUserSelected(true);
  };

  // Handle back action
  const handleBack = () => {
    setUserSelected(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* First Navbar */}
      <header
        className="fixed top-0 left-0 w-full shadow-md z-50"
        style={{ height: "10%" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button className="md:hidden text-2xl" onClick={toggleSidebar}>
            {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          <h1 className="text-2xl font-bold">{activePage}</h1>
          {/* theme toggle */}
          <button
            className="ml-4 bg-gray-800 text-white p-2 rounded"
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
        </div>
      </header>

      {/* Second Navbar */}
      <nav
        className="fixed top-8 left-0 w-full bg-gray-200 shadow-md z-40"
        style={{ height: "6%", top: "10%" }}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              className={`text-gray-800 hover:text-gray-600 ${
                activePage === "Dashboard" ? "font-bold" : ""
              }`}
              onClick={() => setActivePage("Dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`text-gray-800 hover:text-gray-600 ${
                activePage === "Conversation" ? "font-bold" : ""
              }`}
              onClick={() => setActivePage("Conversation")}
            >
              Conversation
            </button>
          </div>
          <LogoutButton className="text-gray-800 hover:text-gray-600">
            Logout
          </LogoutButton>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow pt-24">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-50 bg-gray-100 md:bg-transparent md:flex md:w-1/4 lg:w-1/5 h-full transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar onUserSelect={handleUserSelection} />
        </div>

        {/* Content */}
        <div
          className={`flex-1 ${
            userSelected ? "w-full" : "md:w-3/4 lg:w-4/5"
          } transition-all`}
        >
          {activePage === "Conversation" && (
            <div className="relative h-full">
              {userSelected && (
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded z-50"
                >
                  Back
                </button>
              )}
              <MessageContainer />
            </div>
          )}

          {activePage === "Dashboard" && (
            <div className="p-4">
              <div className="card card-side bg-base-100 shadow-xl flex-2">
                <figure>
                  <img
                    src={`https://avatar.iran.liara.run/username?username=${authUser.username}`}
                    alt="pfp"
                    className="rounded-full h-14"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{authUser.username}</h2>
                  <p>Student</p>
                  <p className="card-title">{authUser.email}</p>
                  <p className="card-title">{authUser.semester}</p>
                  <p className="card-title">{authUser.gpa}</p>
                </div>
              </div>
            </div>
          )}

          {/* Other content */}
          {activePage !== "Conversation" && (
            <div className="p-4">
              {/* Additional content can be added here */}
            </div>
          )}
        </div>
      </div>

      {/* Overlay for Sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import ProfilePic from "../../assets/pfp.png";
// import Logo from "../../assets/maskable-icon.png";
// import MessageContainer from "../../components/messages/MessageContainer";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { useAuthContext } from "../../context/AuthContext";
// import StudentTable from "../StudentTable";
// import LogoutButton from "../../components/sidebar/LogoutButton";

// const Home = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activePage, setActivePage] = useState("Dashboard");
//   const [theme, setTheme] = useState("light"); //theme toggle
//   const { authUser } = useAuthContext();

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const handleSidebarItemClick = (page) => {
//     setActivePage(page);
//     setSidebarOpen(false);
//   };

//   //theme toggle
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   // Set initial theme on component mount
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, []);

//   return (
//     <div className="h-screen w-screen flex flex-col overflow-hidden">
//       {/* First Navbar */}
//       <header
//         className="fixed top-0 left-0 w-full shadow-md z-50"
//         style={{ height: "10%" }}
//       >
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <button className="md:hidden text-2xl" onClick={toggleSidebar}>
//             {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//           <h1 className="text-2xl font-bold ">{activePage}</h1>
//           {/* theme toggle */}
//           <button
//             className="ml-4 bg-gray-800 text-white p-2 rounded"
//             onClick={toggleTheme}
//           >
//             Toggle Theme
//           </button>
//         </div>
//       </header>

//       {/* Second Navbar */}
//       <nav
//         className="fixed top-8 left-0 w-full bg-gray-200 shadow-md z-40"
//         style={{ height: "6%", top: "10%" }}
//       >
//         <div className="container mx-auto px-4 py-2 flex items-center justify-between">
//           <div className="flex space-x-4">
//             <button
//               className={`text-gray-800 hover:text-gray-600 ${
//                 activePage === "Dashboard" ? "font-bold" : ""
//               }`}
//               onClick={() => setActivePage("Dashboard")}
//             >
//               {/* <img src="../assests/dashboard.png" /> */}
//               Dashboard
//             </button>
//             <button
//               className={`text-gray-800 hover:text-gray-600 ${
//                 activePage === "Conversation" ? "font-bold" : ""
//               }`}
//               onClick={() => setActivePage("Conversation")}
//             >
//               {/* <img src="../assests/conversation.png" /> */}
//               Conversation
//             </button>
//             {/* <button
//               className={`text-gray-800 hover:text-gray-600 ${
//                 activePage === "Search" ? "font-bold" : ""
//               }`}
//               onClick={() => setActivePage("Search")}
//             >
//               <img src="/search.png"/>
//               Search
//             </button> */}
//           </div>
//           <LogoutButton className={`text-gray-800 hover:text-gray-600`}>
//             Logout
//           </LogoutButton>
//           {/* <button
//             className={`text-gray-800 hover:text-gray-600 ${
//               activePage === "Logout" ? "font-bold" : ""
//             }`}
//             onClick={() => setActivePage("Logout")}
//           >
//             Logout
//           </button> */}
//         </div>
//       </nav>

//       {/* Real-time Chat App */}
//       <div
//         className=" flex-col flex relative "
//         style={{ paddingTop: "12%", overflowY: "auto" }}
//       >
//         {/* Main Content */}
//         <main
//           className="flex-grow container mx-auto px-4 py-6 flex overflow-y-auto relative"
//           style={{ paddingBottom: "10%" }}
//         >
//           {/* Profile card */}
//           {activePage === "Dashboard" && (
//             <div className="card card-side bg-base-100 shadow-xl flex-2">
//               <figure>
//                 <img
//                   src={`https://avatar.iran.liara.run/username?username=${authUser.username}`}
//                   alt="pfp"
//                   className="rounded-full h-14"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{authUser.username}</h2>
//                 <p>Student</p>
//                 <p className="card-title">{authUser.email}</p>
//                 <p className="card-title">{authUser.semester}</p>
//                 <p className="card-title">{authUser.gpa}</p>

//                 {/* <div className="card-actions justify-end">
//                   <button className="btn btn-primary">Update profile</button>
//                 </div> */}
//               </div>
//             </div>
//           )}

//           {/* Real-time Chat Sidebar */}
//           {activePage === "Conversation" && (
//             <div
//               className={`w-auto max-w-70 overflow-y-auto `}
//               style={{ overflowY: "auto" }}
//             >
//               <Sidebar />
//             </div>
//           )}

//           {/* Real-time Chat Message Container */}
//           {activePage === "Conversation" && (
//             <div
//               className="flex-1 overflow-y-auto relative"
//               style={{ overflowY: "auto" }}
//             >
//               <MessageContainer />
//             </div>
//           )}

//           {/* search page
//           {activePage === "Search" && (
//             <div className="flex-1">
//               {/* Render  Search content here <StudentTable />{" "}
//             </div>
//           )}*/}

//           {/* Render Dashboard or Search content here */}
//           {activePage !== "Conversation" && (
//             <div className="flex-1">
//               {/* Render Dashboard or Search content here */}
//             </div>
//           )}
//         </main>

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
//             // className="absolute bottom-0 left-0 w-full z-50"
//             onClick={closeSidebar}
//           ></div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
