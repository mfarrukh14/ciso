import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Users, Key } from 'lucide-react';

const Roles: React.FC = () => {
  const [roles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['users:manage', 'roles:manage', 'system:manage', 'trades:view', 'analytics:view'],
      userCount: 2,
    },
    {
      id: '2',
      name: 'Trader',
      description: 'Standard trading access',
      permissions: ['trades:view', 'trades:create', 'analytics:view', 'ea:manage'],
      userCount: 15,
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['trades:view', 'analytics:view'],
      userCount: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage user roles and permissions</p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                      <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Users className="w-4 h-4 mr-1" />
                    {role.userCount} users
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Key className="w-4 h-4 mr-1" />
                    {role.permissions.length} permissions
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Permissions</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-xs rounded text-gray-700 dark:text-gray-300">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-xs rounded text-gray-700 dark:text-gray-300">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex-1 btn-secondary flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roles;

