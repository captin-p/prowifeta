import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Blog from "./components/Blog.jsx";
import BlogStory from "./components/BlogStory.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogStory />} />
      </Routes>
    </>
  );
}

export default App;
