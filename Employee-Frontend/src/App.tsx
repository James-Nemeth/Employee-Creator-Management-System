import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewEmployee from "./pages/NewEmployee";
import EditEmployee from "./pages/EditEmployee";
import Details from "./pages/Details";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-employee" element={<NewEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/employee/:id" element={<Details />} />
        </Routes>
        <footer>&copy; {new Date().getFullYear()} | James Nemeth</footer>
      </Router>
    </Provider>
  );
};

export default App;
