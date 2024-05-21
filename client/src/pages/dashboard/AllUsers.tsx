import { useDispatch, useSelector } from "react-redux";
import { allUsers, selectUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import { RoleAPI } from "../../service/roleService/RoleAPI";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserType } from "../../types/user.type.";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

export const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(selectUser);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(allUsers() as unknown as UnknownAction);
  }, [dispatch]);

  if (isLoading) {
    return <div className="min-h-screen w-full h-full">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: UserType) => {
    // Lógica para editar el usuario
    console.log("Editar usuario:", user);
  };

  const handleDelete = (user: UserType) => {
    // Lógica para eliminar el usuario
    console.log("Eliminar usuario:", user);
  };

  const handleCreateUser = () => {
    // Lógica para crear un nuevo usuario
    console.log("Crear nuevo usuario");
  };

  return (
    <div className="max-w-5xl mx-auto h-full min-h-screen py-8">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="w-1/2 flex items-center justify-between bg-white rounded-lg h-12">
          <input
            type="text"
            placeholder="Search users by username, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none border-gray-300 rounded-md px-4 py-2 w-full outline-none"
          />
          {
            searchTerm.length > 0 
            ? (
              <button className="w-auto pr-5" onClick={() => setSearchTerm('')}>
                <IoIosCloseCircleOutline className="w-7 h-7" />
              </button>
            )
            : null
          }
        </div>
        <div className="w-1/2 h-12 flex justify-end">
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-max ml-10"
          >
            <IoAdd className="w-7 h-7" />
            <span className="text-base">Create User</span>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto shadow-md rounded-lg"
      >
        <table className="w-full bg-white divide-y divide-gray-200 overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers?.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles.map((role) => (
                    <span key={role} className="capitalize">
                      {RoleAPI.getRoleById(role.toString())?.name}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-gray-500 w-full flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-x-2"
                  >
                    <FaEdit className="inline-block" />
                    <span className="text-white font-medium text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-x-2"
                  >
                    <FaTrash className="inline-block" />
                    <span className="text-white font-medium text-sm">
                      Delete
                    </span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
