
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please log in to access this page"
      });
      // Store the path they were trying to access
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, loading, navigate, toast, location]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" message="Checking authentication..." />
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
