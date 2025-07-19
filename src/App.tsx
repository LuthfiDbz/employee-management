import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import EmployeeList from './Pages/Employee/EmployeeList';
import SidebarLayout from './Component/Sidebar/SidebarLayout';

function App() {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmployeeList />} />
      </Routes>
    </SidebarLayout>
  );
}

export default App;
