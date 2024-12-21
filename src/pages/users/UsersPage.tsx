import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import UsersHeader from './components/UsersHeader';
import UsersList from './components/UsersList';
import UsersStats from './components/UsersStats';
import { useUsersStore } from '../../store/usersStore';

const UsersPage: React.FC = () => {
  const { loadUsers } = useUsersStore();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersStats />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <UsersList />
      </motion.div>
    </div>
  );
};

export default UsersPage;
