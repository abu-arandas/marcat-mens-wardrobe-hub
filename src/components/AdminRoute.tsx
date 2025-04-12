
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "Please log in to access this page"
        });
        navigate('/login');
      } else if (!isAdmin) {
        toast({
          variant: "destructive",
          title: "Admin access required",
          description: "You do not have permission to access this page"
        });
        navigate('/');
      }
    }
  }, [user, loading, isAdmin, navigate, toast]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
