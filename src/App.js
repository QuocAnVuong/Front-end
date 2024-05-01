import "./App.css";
import ContextProvider from "./context/ContextProvider";
import SearchResult from "./pages/SearchResult/SearchResult";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchResult />,
    errorElement: <h1>404 Not Found</h1>,
  },
  {
    path: "/search-result",
    element: <SearchResultPage />,
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
