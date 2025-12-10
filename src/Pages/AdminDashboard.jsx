import React, { useState, useEffect } from "react";
import { User, Settings, Edit, Trash2, Search } from "lucide-react";
import api from "../Services/axios";
import toast from "react-hot-toast";

const SkeletonRow = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded-md w-full" />
      </td>
    ))}
  </tr>
);

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, admins: 0 });
  const [statsLoading, setStatsLoading] = useState(true);


  // DELETE STATES
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // EDIT STATES
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);


  const fetchStats = async () => {
  setStatsLoading(true);
  try {
    const res = await api.get("admin/users/stats");
    setStats(res.data);
  } catch (err) {
    console.error("Failed to fetch stats:", err);
  } finally {
    setStatsLoading(false);
  }
};


  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", {
        params: { skip: (page - 1) * limit, limit },
      });

      setUsers(res.data?.users || []);
      setTotalPages(Math.ceil(res.data.total / limit));
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [page]);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete API Call
  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/admin/users/${deleteId}`);
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchUsers(); // Refresh
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setEditUser({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setShowEditModal(true);
  };

  // Save Edited User
  const saveEdit = async () => {
    setEditLoading(true);
    try {
      await api.put(`/admin/users/${editUser.id}`, {
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
      });

      setShowEditModal(false);
      toast.success("User Updated");
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update user")
    } finally {
      setEditLoading(false);
    }
  };

  
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Stats Cards */}
    <div className="flex flex-row gap-4 mb-8">
  {[ 
    {
      title: "Users",
      count: stats.total_users,
      icon: <User className="w-6 h-6 text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "Admins",
      count: stats.total_admins,
      icon: <Settings className="w-6 h-6 text-white" />,
      bg: "bg-blue-600",
    },
  ].map((card) => (
    <div
      key={card.title}
      className={`flex items-center justify-between p-5 w-72 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${card.bg}`}
    >
      <div className="text-white">
        <p className="text-sm font-medium">{card.title}</p>

        <p className="mt-1 text-2xl font-bold">
          {statsLoading ? (
            <div className="h-6 w-10 bg-white bg-opacity-50 rounded animate-pulse" />
          ) : (
            card.count
          )}
        </p>
      </div>

      <div className="p-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
        {card.icon}
      </div>
    </div>
  ))}
</div>


      {/* Users Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Role</th>
              <th className="px-6 py-3 text-center text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: limit }).map((_, i) => <SkeletonRow key={i} />)
              : filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openDeleteModal(user.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded-lg"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded-lg ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded-lg"
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this user?</p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-lg"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  deleteLoading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[450px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            {/* Username */}
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Email */}
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Role */}
            <label className="block text-sm mb-1">Role</label>
            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-lg"
                onClick={() => setShowEditModal(false)}
                disabled={editLoading}
              >
                Cancel
              </button>

              <button
                className={`px-4 py-2 text-white rounded-lg ${
                  editLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={saveEdit}
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
