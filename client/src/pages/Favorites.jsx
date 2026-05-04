import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Heart, FolderHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/favorites');
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (e, templateId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(`http://localhost:5000/api/favorites/${templateId}`);
      setFavorites(prev => prev.filter(t => (t.id || t._id) !== templateId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-50 p-3 rounded-xl">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
          <p className="text-gray-500 mt-1">Saved templates for quick access</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <FolderHeart className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">You haven't saved any templates. Browse our collection and click the heart icon to save your favorites.</p>
          <Link to="/templates" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
            Browse Templates
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map(t => {
            const tId = t.id || t._id;
            return (
              <div key={tId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
                <div className="relative overflow-hidden h-56 flex-shrink-0 bg-gray-100">
                  <img 
                    src={t.thumbnail_url} 
                    alt={t.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={(e) => removeFavorite(e, tId)}
                      className="p-2.5 rounded-full shadow-md backdrop-blur-sm transition-colors bg-white text-red-500 hover:scale-110"
                    >
                      <Heart className="w-5 h-5 fill-current text-red-500" />
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
        </div>
      )}
    </div>
  );
};
export default Favorites;
