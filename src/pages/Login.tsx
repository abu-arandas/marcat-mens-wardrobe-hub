
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

interface LocationState {
  from?: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from || '/';
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to Marcat!"
      });
      // Navigate to the page they were trying to access
      navigate(from);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Try the demo credentials below."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-marcat-navy">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
            {from !== '/' && (
              <p className="mt-2 text-center text-sm text-blue-600">
                Sign in to continue to your requested page
              </p>
            )}
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {authError && (
              <div className="text-red-500 text-sm text-center">{authError}</div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" message="" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : 'Sign in'}
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 mb-1">
                Demo credentials:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-sm">Regular User:</p>
                  <p className="text-xs text-gray-500">demo@marcat.com / password</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-sm">Admin User:</p>
                  <p className="text-xs text-gray-500">admin@marcat.com / adminpass</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
