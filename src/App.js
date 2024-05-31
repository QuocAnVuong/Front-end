import "./App.css";
import ContextProvider from "./context/ContextProvider";
import EditArticle from "./pages/Account/EditArticle";
import EditMail from "./pages/Account/EditMail";
import EditName from "./pages/Account/EditName";
import EditProfileImg from "./pages/Account/EditProfileImg";
import EditWallet from "./pages/Account/EditWallet";
import LikedArticle from "./pages/Account/LikedArticle";
import SeeArticle from "./pages/Account/SeeArticle";
import UserMainPage from "./pages/Account/UserMainPage";
import UserProfile from "./pages/Account/UserProfile";
import Wallet from "./pages/Account/Wallet";
import WriteArticle from "./pages/Account/WriteArticle";
import WriterSignup from "./pages/Account/WriterSignup";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import PasswordRecovery from "./pages/Login/PasswordRecovery";
import Register from "./pages/Login/Register";
import Recipe from "./pages/Recipe/Recipe";
import SearchResult from "./pages/SearchResult/SearchResult";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <h1>404 Not Found</h1>,
  },
  {
    path: "/search",
    element: <SearchResult />,
  },
  {
    path: "/search-result",
    element: <SearchResultPage />,
  },
  {
    path: "/search-result/:articleID",
    element: <Recipe />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password-recovery",
    element: <PasswordRecovery />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: <UserMainPage />,
    children: [
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
      {
        path: "/user/edit-name",
        element: <EditName />,
      },
      {
        path: "/user/edit-mail",
        element: <EditMail />,
      },
      {
        path: "/user/writer",
        element: <WriterSignup />,
      },
      {
        path: "/user/edit-image",
        element: <EditProfileImg />,
      },
      {
        path: "/user/wallet",
        element: <Wallet />,
      },
      {
        path: "/user/edit-wallet",
        element: <EditWallet />,
      },
      {
        path: "/user/article",
        element: <SeeArticle />,
      },
      {
        path: "/user/liked",
        element: <LikedArticle />,
      },
      {
        path: "/user/write-article",
        element: <WriteArticle />,
      },
      {
        path: "/user/edit-article/:articleID",
        element: <EditArticle />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
