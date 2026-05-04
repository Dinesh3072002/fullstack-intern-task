import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutTemplate, Heart, User, LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  const updateSearch = (val) => {
    if (val) {
      searchParams.set('search', val);
    } else {
      searchParams.delete('search');
    }
    navigate(`/templates?${searchParams.toString()}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/templates" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <LayoutTemplate className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">TemplateStore</span>
            </Link>
          </div>

          <div className="flex-grow max-w-2xl px-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-gray-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                value={currentSearch}
                onChange={(e) => updateSearch(e.target.value)}
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white pl-10 pr-4 py-2.5 border border-gray-200 focus:border-blue-500 rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 text-gray-700"
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <Link to="/favorites" className="text-gray-600 hover:text-red-500 font-medium px-3 flex items-center transition-colors">
                  <Heart className="w-5 h-5 mr-1" /> <span className="hidden lg:block">Favorites</span>
                </Link>
                <div className="flex items-center gap-2 ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-gray-200">
                  <span className="text-sm font-medium text-gray-700 hidden md:flex items-center">
                    <User className="w-4 h-4 mr-1" /> {user.username}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-gray-200">
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-3 whitespace-nowrap">
                  Log in
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
