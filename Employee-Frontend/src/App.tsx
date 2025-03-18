import { Provider } from "react-redux";
import { store } from "./app/store";
import EmployeeList from "./components/EmployeeList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4 bg-white min-h-screen shadow-md rounded">
        <h1 className="text-3xl font-bold mb-8 text-primary text-center underline italic">
          Employee Creator Management System
        </h1>
        <EmployeeList />
      </div>
    </Provider>
  );
};

export default App;
