
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "Please log in to access this page"
        });
        navigate('/login', { state: { from: location.pathname } });
      } else if (!isAdmin) {
        toast({
          variant: "destructive",
          title: "Admin access required",
          description: "You do not have permission to access this page"
        });
        navigate('/');
      }
    }
  }, [user, loading, isAdmin, navigate, toast, location]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" message="Verifying admin access..." />
      </div>
    );
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
