
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Info, BookText, BarChart, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      'min-h-screen flex flex-col w-full bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-black',
      className
    )}>
      <header className="w-full py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-white"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">DevSalary</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/') && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/about') && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/about">
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/methodology') && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/methodology">
                      <BookText className="mr-2 h-4 w-4" />
                      Methodology
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {isAuthenticated && (
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive('/analytics') && "bg-accent text-accent-foreground"
                      )}
                      asChild
                    >
                      <Link to="/analytics">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Hello, {user?.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      signOut();
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} BAI. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-smooth">
                About
              </Link>
              <Link to="/methodology" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-smooth">
                Methodology
              </Link>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-smooth">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-smooth">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
