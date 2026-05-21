import { Route, Routes } from "react-router-dom"; // Use Routes directly
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import Page from "./Components/Pages/Page";
import AuthorDetail from "./Components/Author/AuthorDetail";
import AddPost from "./Admin/AddPost";
import MyPofile from "./Admin/MyPofile";
import DeletePost from "./Admin/DeletePost";
import Login from "./Components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogContextProvider } from "./Context/BlogContext";
import Footer from "./Components/Footer/Footer";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Helmet>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:id"
          element={
            <>
              <Header />
              <Page />
            </>
          }
        />
        <Route
          path="/author/:userid"
          element={
            <>
              <Header />
              <AuthorDetail />
            </>
          }
        />
        <Route path="/myprofile" element={<MyPofile />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/deletepost" element={<DeletePost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer></Footer>
      </>
  );
}

export default App;
