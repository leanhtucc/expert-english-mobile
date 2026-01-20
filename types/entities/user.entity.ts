/**
 * User Entity Types
 */

/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: 'student' | 'teacher' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User profile update data
 */
export interface UserProfileUpdate {
  name?: string;
  avatar?: string;
}
