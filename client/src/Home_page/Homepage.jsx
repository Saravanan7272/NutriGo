import React, { useState, useEffect } from 'react';
import '../assets/style/Homepage.css';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import ItemDetailsModal from './ItemDetailsModal';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { performSearch, getSuggestions } from '../utils/searchHelper';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const Homepage = ({
  favorites,
  setFavorites,
  cart,
  setCart,
  popularItems,
  restaurants,
  loading,
  error,
  toggleFavorite,
  handleIncrement,
  handleDecrement
}) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isHoveringCategories, setIsHoveringCategories] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const categories = ['Desserts', 'Indian', 'South_Indian', 'North_Indian', 'American', 'Vegetarian', 'Chinese', 'Italian'];
  const searchResultsRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ items: [], restaurants: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestedTags = ['veg only', 'dessert', 'under 250', 'pizza', 'Anna Nagar'];


  const handleCuisineCategoryClick = (category) => {

    const matchedRestaurants = restaurants.filter((rest) =>
      rest.cuisine.some(c => c.toLowerCase() === category.toLowerCase())
    );

    const matchedRestaurantIds = matchedRestaurants.map(r => r._id);

    const matchedItems = popularItems.filter(item =>
      matchedRestaurantIds.includes(item.restaurantId)
    );

    setSearchQuery(category);
    setSearchResults({
      items: matchedItems,
      restaurants: matchedRestaurants
    });
    setIsSearching(true);

    setTimeout(() => {
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };



  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      const newSuggestions = getSuggestions(value, popularItems, restaurants);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);

      const matches = suggestedTags.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
    } else {
      setSuggestions([]);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleSearch = (customQuery = null) => {
    const query = customQuery || searchQuery;
    const results = performSearch(query, popularItems, restaurants);
    setSearchResults(results);
    setIsSearching(true);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const triggerSearch = (query) => {
    const results = performSearch(query, popularItems, restaurants);
    setSearchResults(results);
    setIsSearching(true);
  };

  const viewItemDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };


  useEffect(() => {
    const scroller = document.querySelector('.items-scroller');
    if (!scroller) return;


    if (isHovering) return;

    const interval = setInterval(() => {
      scroller.scrollBy({ left: 250, behavior: 'smooth' });

      if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 10) {
        setTimeout(() => {
          scroller.scrollTo({ left: 0, behavior: 'smooth' });
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering, popularItems]);


  useEffect(() => {
    const scroller = document.querySelector('.items-scroller');
    if (!scroller) return;

    if (isHovering) return;

    const interval = setInterval(() => {
      if (isHovering) return;

      scroller.scrollBy({ left: 250, behavior: 'smooth' });

      if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 10) {
        setTimeout(() => {
          scroller.scrollTo({ left: 0, behavior: 'smooth' });
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering, popularItems]);


  useEffect(() => {
    const scroller = document.querySelector('.categories-carousel');
    if (!scroller) return;

    if (isHoveringCategories) return;
    const interval = setInterval(() => {
      if (isHoveringCategories) return;

      scroller.scrollBy({ left: 250, behavior: 'smooth' });

      if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 10) {
        setTimeout(() => {
          scroller.scrollTo({ left: 0, behavior: 'smooth' });
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHoveringCategories, categories]);

  const filteredItems = activeCategory === 'All'
    ? popularItems
    : popularItems.filter(item => item.category === activeCategory);

  return (
    <div className="food-delivery-app">
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-message">Could not load data. Showing fallback UI.</p>}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Gourmet Meals Delivered to Your Door</h1>
          <p>Discover culinary delights from the best restaurants in town</p>
          <div className="search-bar-container">
            <div className="search">
              <input
                type="text"
                placeholder="Search by food, restaurant, area, veg, category…"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="search-suggestions">
                  {suggestions.map((tag, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(tag)}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <button onClick={() => handleSearch()}>Search</button>
            </div>
          </div>

          <div className="suggested-tags">
            <span onClick={() => setSearchQuery('veg only')}>#veg only</span>
            <span onClick={() => setSearchQuery('dessert')}>#dessert</span>
            <span onClick={() => setSearchQuery('under 250')}>#under 200</span>
            <span onClick={() => setSearchQuery('pizza')}>#pizza</span>
            <span onClick={() => setSearchQuery('Anna Nagar')}>#Anna Nagar</span>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {isSearching && (
        <section className="search-results" ref={searchResultsRef}>
          <h2 className="section-title-search">Search Results for "{searchQuery}"</h2>

          {/* Matching Restaurants */}
          <h3 className="results-subheading">Restaurants</h3>
          <div className="restaurants-grid">
            {searchResults.restaurants.length === 0 ? (
              <p className="no-data-message">No matching restaurants.</p>
            ) : (
              searchResults.restaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  isFavorite={favorites.includes(restaurant._id)}
                  toggleFavorite={toggleFavorite}
                  onQuickView={() => navigate(`/view-restaurant/${restaurant._id}`)}
                  highlightedName={highlightText(restaurant.name, searchQuery)}
                  highlightedAddress={highlightText(restaurant.address, searchQuery)}
                />
              ))
            )}
          </div>

          {/* Matching Food Items */}
          <h3 className="results-subheading">Food Items</h3>
          <div className="items-scroller">
            {searchResults.items.length === 0 ? (
              <p className="no-data-message">No matching food items.</p>
            ) :

              (
                searchResults.items.map(item => (
                  <div key={item._id} className="food-card">
                    <button
                      className={`like-btn ${favorites.includes(item._id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(item._id)}
                    >
                      {favorites.includes(item._id) ? '❤️' : '🤍'}
                    </button>
                    <div
                      className="food-image"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      role="img"
                      aria-label={item.name}
                    />
                    <div className="food-info">
                      <h3>{highlightText(item.name, searchQuery)}</h3>
                      <p>{highlightText(item.category, searchQuery)}</p>
                      <div className="price">₹{item.price.toFixed(2)}</div>
                      <div className="actions">
                        <button className="view-btn" onClick={() => viewItemDetails(item)}>
                          View Details
                        </button>
                        <div className="cart-controls">
                          {cart[item._id] ? (
                            <>
                              <button onClick={() => handleDecrement(item._id)}>−</button>
                              <span>{cart[item._id]}</span>
                              <button onClick={() => handleIncrement(item._id)}>＋</button>
                            </>
                          ) : (
                            <button className="add-btn" onClick={() => handleIncrement(item._id)}>
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            }
          </div>

          {/* Clear Search */}
          <div className="clear-search-wrapper">
            <button className="clear-search" onClick={() => {
              setIsSearching(false);
              setSearchQuery('');
              setSearchResults({ items: [], restaurants: [] });
              setFilteredCuisine(null);
            }}>
              Clear Search
            </button>
          </div>
        </section>
      )}

      {/* Cuisine Filter Section */}
      <section className="featured-categories">
        <h2 className="section-heading">What's Your Craving?</h2>
        <div className="categories-carousel"
          onMouseEnter={() => setIsHoveringCategories(true)}
          onMouseLeave={() => setIsHoveringCategories(false)}
        >
          {categories.map(category => (
            <div
              key={category}
              className={`category-card ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCuisineCategoryClick(category)}
            >
              <div className="category-image-wrapper">
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${getCategoryImage(category)})` }}
                  aria-label={category}
                >
                  <div className="category-image-back" style={{ backgroundImage: `url(${getChefImage(category)})` }}>
                  </div>
                </div>
              </div>
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="popular-items" id="popular">
        <div className="section-header">
          <h2>{activeCategory === 'All' ? 'Popular Food Items' : activeCategory}</h2>
        </div>
        <div className="items-scroller" onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {!filteredItems || filteredItems.length === 0 ? (
            <p className="no-data-message">No food items found...😕</p>
          ) : (
            filteredItems.map(item => (
              <div key={item._id} className="food-card">
                <button
                  className={`like-btn ${favorites.includes(item._id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(item._id)}
                  aria-label={favorites.includes(item._id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(item._id) ? '❤️' : '🤍'}
                </button>
                <div
                  className="food-image"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                  role="img"
                  aria-label={item.name}
                />
                <div className="food-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div className="price">₹{item.price.toFixed(2)}</div>
                  <div className="actions">
                    <button className="view-btn" onClick={() => viewItemDetails(item)}>
                      View Details
                    </button>
                    <div className="cart-controls">
                      {cart[item._id] ? (
                        <>
                          <button onClick={() => handleDecrement(item._id)} aria-label="Decrease quantity">−</button>
                          <span>{cart[item._id]}</span>
                          <button onClick={() => handleIncrement(item._id)} aria-label="Increase quantity">＋</button>
                        </>
                      ) : (
                        <button className="add-btn" onClick={() => handleIncrement(item._id)}>
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="restaurant-section" id="restaurants">
        <div className="section-header">
          <h2>Top Rated Restaurants</h2>
          <button className="view-all" onClick={() => navigate('/all-restaurants')}>
            View All
          </button>
        </div>
        <div className="restaurants-grid">
          {!restaurants || restaurants.length === 0 ? (
            <p className="no-data-message">No restaurants available at the moment...😕</p>
          ) : (
            restaurants.filter(r => r.rating >= 4.5).map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant._id)}
                toggleFavorite={toggleFavorite}
                onQuickView={() => navigate(`/view-restaurant/${restaurant._id}`)}
              />
            ))
          )}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Item Details Modal */}
      {showModal && selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          cart={cart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">NutriGo</div>
          <p className="footer-tagline">Delivering happiness to your doorstep</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/favorites">Your Favorites</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><span>📞</span> +1 (123) 456-7890</li>
            <li><span>✉️</span> hello@nutrigo.com</li>
            <li><span>🏢</span> 123 Food Street, Foodville</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
          <p>Get updates on special offers</p>
        </div>
      </div>
      <div className="social-links">
        <a href="#" className="social-link" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {new Date().getFullYear()} NutriGo. All rights reserved.
        </p>
        <div className="legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};


const getCategoryImage = (category) => {
  const urls = {
    Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992287/skgzhlikvqzalh0xdnjx.jpg',
    South_Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992322/tkynidnay3nl799ntpjo.jpg',
    North_Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992349/lrlzdvx3pfqjgbrgluld.jpg',
    Chinese: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992368/dwexyaffewbdfcawopwt.jpg',
    Italian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992438/vn5rgn5irg1e74gf5n8o.jpg',
    American: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992457/pkuxbnypgo1lwbn971tp.jpg',
    Desserts: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992475/jeeaaem6somdhrklbixi.jpg',
    Vegetarian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992492/qvvbvgjgy5wf5kesadmx.jpg'
  };
  return urls[category];
};


const getChefImage = (category) => {
  const chefUrls = {
    Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752992923/b5evx3dsgz19bf72oboi.jpg',
    South_Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993000/beh60eytmrmmvh6rekmp.jpg',
    North_Indian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993017/nfo9pdkkzqjbs5k8jocs.jpg',
    Chinese: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993030/edvuek5ygktfhkosxrtw.png',
    Italian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993046/y0xa66xjr3mrciabyujl.jpg',
    American: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993061/vrmaurqrvyhqfrco6c1u.jpg',
    Desserts: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993075/jibqms2n5ak8nsrmxa5w.png',
    Vegetarian: 'https://res.cloudinary.com/dyd2gm5m6/image/upload/v1752993090/nfappkehtpdyhuhwfqu4.jpg'

  };
  return chefUrls[category];
};

export default Homepage;