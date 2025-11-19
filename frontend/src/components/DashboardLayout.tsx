import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Settings,
  User,
  Users,
  Key,
  Activity,
  LogOut,
  Menu,
  X,
  Shield,
  FileText,
  Bell,
  Zap,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, permission: 'dashboard:view' },
    { name: 'Trades', href: '/dashboard/trades', icon: TrendingUp, permission: 'trades:view' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, permission: 'analytics:view' },
    { name: 'EA Connector', href: '/dashboard/ea-connector', icon: Zap, permission: 'ea:manage' },
    { name: 'License Keys', href: '/dashboard/licenses', icon: Key, permission: 'license:view' },
    { name: 'Activity Log', href: '/dashboard/activity', icon: Activity, permission: 'activity:view' },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell, permission: 'notifications:view' },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText, permission: 'documents:view' },
  ];

  const adminNavigation = [
    { name: 'User Management', href: '/dashboard/users', icon: Users, permission: 'users:manage' },
    { name: 'Role Management', href: '/dashboard/roles', icon: Shield, permission: 'roles:manage' },
    { name: 'System Settings', href: '/dashboard/system-settings', icon: Settings, permission: 'system:manage' },
  ];

  const userNavigation = [
    { name: 'Profile', href: '/dashboard/profile', icon: User, permission: 'profile:view' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, permission: 'settings:view' },
  ];

  // Check if user has permission (simplified - in production, use proper permission checking)
  const hasPermission = (_permission: string) => {
    if (isAdmin) return true; // Admins have all permissions
    // Add your permission logic here
    return true; // For now, allow all
  };

  const filteredNavigation = navigation.filter(item => hasPermission(item.permission));
  const filteredAdminNav = isAdmin ? adminNavigation.filter(item => hasPermission(item.permission)) : [];
  const filteredUserNav = userNavigation.filter(item => hasPermission(item.permission));

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">NextGen Dashboard</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-72 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 shadow-lg
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-dark-700 bg-gradient-to-r from-primary-50 to-white dark:from-primary-900/10 dark:to-dark-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white block">NextGen Forex</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Trading Dashboard</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

         

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
                Main Menu
              </p>
              <div className="space-y-1">
                {filteredNavigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                        ${active
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'} transition-colors`} />
                      <span className="ml-3">{item.name}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {filteredAdminNav.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Administration
                </p>
                <div className="space-y-1">
                  {filteredAdminNav.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                          ${active
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'} transition-colors`} />
                        <span className="ml-3">{item.name}</span>
                        {active && (
                          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
                Account
              </p>
              <div className="space-y-1">
                {filteredUserNav.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                        ${active
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'} transition-colors`} />
                      <span className="ml-3">{item.name}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

           {/* User Info */}
           <div className="px-6 py-5 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-white dark:ring-dark-800">
                  <span className="text-white font-semibold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-dark-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                {isAdmin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm mt-1.5">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/50">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`
        lg:pl-72 transition-all duration-300 ease-in-out
        ${sidebarOpen ? '' : 'lg:pl-0'}
      `}>
        <div className="pt-16 lg:pt-0 min-h-screen">
          {children}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

