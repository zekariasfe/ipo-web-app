// src/app/routes/admin/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminService';
import './UserManagement.css'; // You'll need to create this CSS file

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await adminService.fetchSystemUsers({
        search: filter,
        role: roleFilter || undefined
      });
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = (role) => {
    navigate(`/admin/users/create-${role}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        fetchUsers(); // Refresh the list
      } catch (error) {
        alert('Failed to delete user: ' + error.message);
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await adminService.updateUserStatus(userId, newStatus);
      fetchUsers(); // Refresh the list
    } catch (error) {
      alert('Failed to update user status: ' + error.message);
    }
  };

  const handleResetPassword = async (userId) => {
    try {
      const result = await adminService.resetUserPassword(userId);
      alert(`Password reset successful! Temporary password: ${result.temporaryPassword}`);
    } catch (error) {
      alert('Failed to reset password: ' + error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="header">
        <h1>User Management</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="role-filter"
          >
            <option value="">All Roles</option>
            <option value="client">Client</option>
            <option value="brokerage">Brokerage</option>
            <option value="it_admin">IT Admin</option>
            <option value="viewer">Viewer</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <button onClick={fetchUsers} className="btn btn-secondary">
            Apply Filters
          </button>
        </div>
        <div className="create-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => handleCreateUser('brokerage')}
          >
            Create Brokerage Account
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleCreateUser('it-staff')}
          >
            Create IT Staff Account
          </button>
          <button 
            className="btn btn-info"
            onClick={() => handleCreateUser('viewer')}
          >
            Create Viewer Account
          </button>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Company</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.company || '-'}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button 
                    className="btn btn-sm btn-warning"
                    onClick={() => handleResetPassword(user.id)}
                    title="Reset Password"
                  >
                    🔑
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                    title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                  >
                    {user.status === 'active' ? '⏸️' : '▶️'}
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={user.role === 'super_admin' || user.role === 'it_admin'}
                    title="Delete User"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="no-users">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;