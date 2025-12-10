import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCog,
  Settings as SettingsIcon,
  User,
  ChevronDown,
  LogOut
} from 'lucide-react';
import api from '../Services/axios';
import { useNavigate } from "react-router-dom";


const AdminDashboardLayout = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState("")
  const navigate = useNavigate();


  const fetchUser = async () => {
      try {
        const res = await api.get("/me"); // interceptor me token attach hoga
        setUser(res.data);
        // localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Fetch user error:", err.response?.data?.detail || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    // Load user on app start
    useEffect(() => {
      fetchUser();
    }, []);

  const navigation = [
    // {
    //   name: 'Dashboard',
    //   href: '/admin-dashboard',
    //   icon: LayoutDashboard,
    //   exact: true
    // },
   
    
  ];

  const handleLogout = () => {
  // ---- Remove all cookies ----
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  // Optional: localStorage or sessionStorage clear
  localStorage.clear();
  sessionStorage.clear();

  // Close dropdown
  setProfileDropdown(false);

  // Redirect to login
  navigate("/admin-login");
};


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* ---------- Top Navigation Bar ---------- */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
          <div className="flex items-center space-x-3">
  <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center">
    <span className="text-white font-bold text-lg">PDF</span>
  </div>

  <h1 className="text-xl font-bold text-gray-900/90">PDFMaster</h1>
</div>

        

            {/* Center: Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right: Profile Dropdown */}
            <div className="flex items-center space-x-4">
              
           
             

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                     <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.username || 'Loading...'}</p>
                      <p className="text-xs text-gray-500">{user?.role || 'Role'}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                     <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                   
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

       
        </div>
      </header>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;