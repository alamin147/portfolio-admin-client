import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div
        className={`antialiased bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* start of sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <form
              action="#"
              method="GET"
              className="md:hidden mb-2 flex justify-between items-center"
            >
              <div className="relative flex-grow">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  name="search"
                  id="sidebar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
              <button
                type="button"
                className="ml-2 p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
                onClick={closeSidebar}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>
            <ul className="space-y-2">
              <li>
                <a
                  href="/home"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ml-3">Home</span>
                </a>
              </li>
              <li></li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="/home/create-project"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Create Project</span>
                </a>
              </li>
              <li>
                <a
                  href="/home/delete-project"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Delete Project</span>
                </a>
              </li>
              <li>
                <a
                  href="/home/create-blog"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Create Blog</span>
                </a>
              </li>
              <li>
                <a
                  href="/home/delete-blog"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Delete Blog</span>
                </a>
              </li>
              <li>
                <a
                  href="/home/create-skill"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Create Skill</span>
                </a>
              </li>

              <li>
                <a
                  href="/home/delete-skill"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Delete Skill</span>
                </a>
              </li>

              <li>
                <a
                  href="/home/create-cp"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Create CP Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="/home/manage-cp"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Manage CP Profiles</span>
                </a>
              </li>


            </ul>
          </div>
        </aside>
        {/* end of sidebar */}

        <main className="p-4 md:ml-64 h-auto pt-10">
          <button
            className="md:hidden p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
            onClick={toggleSidebar}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="mt-16  container mx-auto">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
