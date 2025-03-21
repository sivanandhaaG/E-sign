import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  let token = localStorage.getItem("user");

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
