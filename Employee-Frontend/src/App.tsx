import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewEmployee from "./pages/NewEmployee";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-employee" element={<NewEmployee />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
