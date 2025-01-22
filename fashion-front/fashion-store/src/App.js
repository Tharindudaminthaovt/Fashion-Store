import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./screens/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Search from "./components/search";
import SearchResults from "./components/product/searchresults";
import Dash from "./screens/dash";
import CollectionsList from "./components/collectionlist";
import ProductForm from "./components/product/productfrom";
import Cartscreen from "./screens/cartscreen";
import Payment from "./screens/paymentform";
import { NotFound } from "./screens/404";
import Wishlist from "./screens/wishlist/wishlist";
import UpdateItem from "./components/product/updateitem";
import TailorForm from "./screens/Tailors/Tailorsubmit";
import UserTailorShowcase from "./screens/Tailors/Tailoruser";
import AdminTailorShowcase from "./screens/Tailors/Tailoradmin";
import TailorShowcase from "./screens/Tailors/Tailoruser";
import SingleTailorPage from "./screens/Tailors/TailorbyID";
import ProductUpdateForm from "./components/product/changeitem";
import CreateAboutUs from "./screens/AboutUs/createaboutus";
import UpdateAboutUs from "./screens/AboutUs/updateaboutus";
import AboutUsList from "./screens/AboutUs/displayabus";
import CurrentAboutUs from "./screens/AboutUs/displaycurabus";
import { AllWishlists } from "./screens/wishlist/allWishlists";
import { AddWishlist } from "./screens/wishlist/addWishlists";
import Outfits from "./screens/outfits/outfits";
import OutfitsAdd from "./screens/outfits/outfitsAdd";
import { PlaceOrder } from "./screens/PlaceOrder/placeOrder";
import { PlaceOrderList } from "./screens/PlaceOrder/placeOrderList";
import { PlaceEditOrder } from "./screens/PlaceOrder/placeEditOrder";
import BlogsChart from "./screens/admin/dashboard/BlogsChart";
import Dashboard from "./screens/admin/dashboard/Dashboard";
import AddPost from "./screens/admin/post/AddPost";
import ManagePosts from "./screens/admin/post/ManagePosts";
import UpdatePosts from "./screens/admin/post/UpdatePosts";
import ManageUser from "./screens/admin/user/ManageUser";
import UpdateUserModel from "./screens/admin/user/UpdateUser";
import AdminLayout from "./screens/admin/AdminLayout";
import AdminNAvigation from "./screens/admin/AdminNavigation";
import BlogsHero from "./screens/blogs/blogs-home/Hero";
import BlogsHome from "./screens/blogs/blogs-home/BlogsHome";
import CommentCard from "./screens/blogs/comments/CommentCard";
import PostAComment from "./screens/blogs/comments/PostAComment";
import RelatedBlogs from "./screens/blogs/singleBlog/RelatedBlogs";
import SingleBlog from "./screens/blogs/singleBlog/SingleBlog";
import SingleBLogCard from "./screens/blogs/singleBlog/SingleBlogCard";
import Blogs from "./screens/blogs/Blogs";
import SearchBlog from "./screens/blogs/SearchBlog";
import ContactUs from "./screens/miniPage/ContactUs";
import Disclaimer from "./screens/miniPage/Disclaimer";
import PrivacyPolicy from "./screens/miniPage/PrivacyPolicy";
import Login from "./screens/user/Login";
import RegisterForm from "./screens/user/Register"; //use it below okk
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/search-results/:category" element={<SearchResults />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/additem" element={<ProductForm />} />
          <Route path="/collection" element={<CollectionsList />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wishlist" element={<AllWishlists />} />
          <Route path="/wishlist-add/:itemId" element={<AllWishlists />} />
          <Route path="/addwishlist" element={<AddWishlist />} />
          <Route path="/wishlist/:wishlistId" element={<Wishlist />} />
          <Route path="/test" element={<Wishlist />} />
          <Route path="/updateitem" element={<UpdateItem />} />
          <Route
            path="/updateitem/:productId"
            element={<ProductUpdateForm />}
          />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/outfits/add" element={<OutfitsAdd />} />
          <Route path="/outfits/edit/:id" element={<OutfitsAdd />} />
          <Route path="/tailor" element={<TailorForm />} />
          <Route path="/tailorserferfaewtf" element={<UserTailorShowcase />} />
          <Route path="/tailoraesdfswefsr" element={<AdminTailorShowcase />} />
          <Route path="/show-tailors" element={<TailorShowcase />} />
          <Route path="/admin-tailors" element={<AdminTailorShowcase />} />
          <Route path="/tailorupdate/:id" element={<SingleTailorPage />} />
          <Route path="/createaboutus" element={<CreateAboutUs />} />
          <Route path="/update/:id" element={<UpdateAboutUs />} />
          <Route path="/displayabus" element={<AboutUsList />} />
          <Route path="/displaycurabus" element={<CurrentAboutUs />} />
          <Route path="/place-order/:tailorId" element={<PlaceOrder />} />
          <Route path="/place-orders" element={<PlaceOrderList />} />
          <Route path="/edit-orders/:orderId" element={<PlaceEditOrder />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/blogs" element={<BlogsHome />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/blogs" element={<BlogsChart />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
          <Route path="/admin/add-post" element={<AddPost />} />
          <Route path="/admin/update-post/:id" element={<UpdatePosts />} />
          <Route path="/admin/users" element={<ManageUser />} />
          <Route path="/admin/update-user/:id" element={<UpdateUserModel />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/Disclaimer" element={<Disclaimer />} />
          <Route path="/Privacy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
