import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import IncidentReports from './pages/IncidentReports';
import Counseling from './pages/Counseling';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incident-reports" element={<IncidentReports />} />
          <Route path="/counseling" element={<Counseling />}/>
          <Route path="/user-management" element={<UserManagement />}/>
      </Routes>
    </BrowserRouter>
  )

}