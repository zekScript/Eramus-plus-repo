import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

export function getCurrentUser() {
      const token = Cookies.get('authToken');
      if (!token) return null;
    
      try {
        const decoded = jwt.decode(token) as {
          id: number;
          email: string;
          role: string;
          name: string;
        };
    
        return decoded; // Contains id, email, role, name
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }