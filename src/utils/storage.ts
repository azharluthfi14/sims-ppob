export const tokenStorage = {
  get: (): string | null => {
    try {
      const token = localStorage.getItem('token');

      if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (token: string): void => {
    try {
      if (token && token.trim() !== '') {
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};
