import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Blog from "./components/Blog.jsx";
import BlogStory from "./components/BlogStory.jsx";
import SitePage from "./components/SitePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<SitePage pageId="about" />} />
        <Route path="/programmes" element={<SitePage pageId="programmes" />} />
        <Route path="/impact" element={<SitePage pageId="impact" />} />
        <Route path="/leadership" element={<SitePage pageId="leadership" />} />
        <Route path="/partners" element={<SitePage pageId="partners" />} />
        <Route path="/opportunities" element={<SitePage pageId="opportunities" />} />
        <Route path="/events" element={<SitePage pageId="events" />} />
        <Route path="/membership" element={<SitePage pageId="membership" />} />
        <Route path="/contact" element={<SitePage pageId="contact" />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogStory />} />
      </Routes>
    </>
  );
}

export default App;
