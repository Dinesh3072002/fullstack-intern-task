import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(new Set()); 

  useEffect(() => {
    fetchTemplates();
    if (user) {
      fetchFavorites();
    }
  }, [search, user]);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get('/api/templates', {
        params: { search }
      });
      setTemplates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/favorites');
      const favSet = new Set(res.data.map(t => t.id || t._id));
      setFavorites(favSet);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async (e, templateId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return alert('Please log in to favorite templates');
    try {
      const res = await axios.post(`/api/favorites/${templateId}`);
      setFavorites(prev => {
        const next = new Set(prev);
        if (res.data.favorited) next.add(templateId);
        else next.delete(templateId);
        return next;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Templates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map(t => {
          const tId = t.id || t._id;
          const isFaved = favorites.has(tId);
          return (
            <div key={tId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col relative">
              <div className="relative overflow-hidden h-64 flex-shrink-0 bg-gray-100">
                <img 
                  src={t.thumbnail_url} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => toggleFavorite(e, tId)}
                    className={`p-2.5 rounded-full shadow-md backdrop-blur-sm transition-colors ${
                      isFaved ? 'bg-white text-red-500 hover:text-red-600' : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFaved ? 'fill-current text-red-500' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm font-semibold text-blue-600 mb-2">{t.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.name}</h3>
                <p className="text-gray-600 line-clamp-2 text-sm">{t.description}</p>
              </div>
            </div>
          );
        })}
        {templates.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No templates found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
