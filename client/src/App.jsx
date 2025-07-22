import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import { API_ENDPOINTS } from './config/api.config';
import { useAuth, AuthProvider } from './Login/auth/AuthProvider';
import ProtectedRoute from './Login/ProtectedRoute';
import Profile_Info from './Login/Profile_Info';
import Dashboard from './Login/Dashboard';
import GetImageUrl from './utils/GetImageUrl.jsx'


// Pages
import Homepage from './Home_page/Homepage';
import ViewRestaurant from './Restaurant/ViewRestaurantDetails';
import CartPage from './cartPage/CartPage';
import FavoritesPage from './favoritePage/FavoritesPage';
import OrdersPage from './Orders/OrdersPage';
import ReviewPage from './ReviewPage/ReviewPage';
import AboutPage from './app-About-contact/AboutPage';
import ContactPage from './app-About-contact/ContactPage';
import PrivacyPolicy from './legalPages/PolicyPage';
import TermsOfService from './legalPages/TermsPage';
import AllRestaurants from './Home_page/ViewAllRestaurants';
import AboutContactPage from './Res-About-ContactPage/AboutContactPage';
import AuthPage from './Login/auth/AuthPage';
import Profile from './Profile.jsx';


import AdminDashboard from './ADMIN/AdminDashboard';
import AddRestaurant from './Restaurant/AddRestaurant';
import ViewAllRestaurant from './Restaurant/ViewAllRestaurant.jsx';
import ViewUsers from './User/ViewUsers';
import AddUser from './User/AddUser';
import RestaurantAdminDashboard from './Res-Admin/RestaurantAdminDashboard'
import AddFoodItem from './FoodItems/AddFoodItem';
import ViewAllFoodItems from './FoodItems/ViewAllFoodItems';

function AppContent() {
  const { currentUser: user } = useAuth();

  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders')) || []);
  const [popularItems, setPopularItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsRes, restaurantsRes] = await Promise.all([
          fetch(API_ENDPOINTS.FOOD_ITEMS),
          fetch(API_ENDPOINTS.RESTAURANTS),
        ]);
        const [itemsData, restaurantsData] = await Promise.all([
          itemsRes.json(),
          restaurantsRes.json(),
        ]);
        setPopularItems(itemsData);
        setRestaurants(restaurantsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);


  useEffect(() => {
    const fetchUserType = async () => {
      console.log(user);
      if (user?.email) {
        try {
          const res = await fetch(`${API_ENDPOINTS.USERS}/get-user-type?email=${user.email}`);
          const data = await res.json();
          setUserType(data.userRole);
          setUserName(data.name);
          console.log(data.userRole);
        } catch (err) {
          console.error('Failed to fetch user type', err);
        }
      }
    };

    fetchUserType();
  }, [user]);





  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const handleIncrement = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const handleDecrement = (id) => {
    if (cart[id] > 1) {
      setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    }
  };

  return (
    <>
      <ScrollToTop />
      <Navbar
        cartCount={Object.values(cart).reduce((sum, c) => sum + c, 0)}
        favCount={favorites.length}
        userType={userType} userName={userName}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              popularItems={popularItems}
              restaurants={restaurants}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/cart"
          element={

            <CartPage
              cart={cart}
              setCart={setCart}
              popularItems={popularItems}
              setOrders={setOrders}
            />

          }
        />
        <Route
          path="/favorites"
          element={

            <FavoritesPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              popularItems={popularItems}
              restaurants={restaurants}
              cart={cart}
              setCart={setCart}
            />

          }
        />
        <Route
          path="/orders"
          element={<OrdersPage orders={orders} />}
        />
        <Route path="/review/:orderId" element={<ReviewPage />} />

        <Route
          path="/view-restaurant/:id"
          element={
            <ViewRestaurant
              cart={cart}
              setCart={setCart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          }
        />
        <Route
          path="/all-restaurants"
          element={
            <AllRestaurants
              restaurants={restaurants}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about-restaurant" element={<AboutContactPage />} />
        <Route path="*" element={<Navigate to="/" />} />


        <Route path="/login" element={<AuthPage mode={"login"} userType={userType} />} />
        <Route path="/signup" element={<AuthPage mode={"signup"} userType={userType} />} />
        <Route path="/reset-password" element={<AuthPage mode={"reset"} userType={userType} />} />

        <Route path="/profile-info" element={
          <Profile_Info />
        } />

        <Route path="/Dashboard" element={
          <Dashboard />
        } />

        <Route
          path="/Profile"
          element={<Profile userType={userType} userName={userName} />}
        />



        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/view-restaurants" element={<ViewAllRestaurant />} />
        <Route path="/add-users" element={<AddUser />} />
        <Route path="/view-users" element={<ViewUsers />} />

        <Route path="/restaurant-admin" element={<RestaurantAdminDashboard />} />
        <Route path="/add-food-item" element={<AddFoodItem />} />
        <Route path="/food-items" element={<ViewAllFoodItems />} />



      </Routes>


    </>
  );
}




export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

