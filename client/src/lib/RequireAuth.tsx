import { Navigate, useLocation } from 'react-router-dom';
import useUser from './Hooks';

export default function RequireAuth({ children }: { children: any }) {
  const { user, isFetching } = useUser();
  const location = useLocation();

  if (!isFetching && !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
