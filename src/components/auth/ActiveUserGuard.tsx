import React from 'react';
import { useUserStatus } from '../../hooks/useUserStatus';

interface ActiveUserGuardProps {
  children: React.ReactNode;
}

/**
 * Guard component to protect routes from inactive users
 */
const ActiveUserGuard: React.FC<ActiveUserGuardProps> = ({ children }) => {
  const isActive = useUserStatus();
  return isActive ? <>{children}</> : null;
};

export default ActiveUserGuard;