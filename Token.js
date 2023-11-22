
export function saveAuthData(token, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }
  

  export function getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return { token, userId };
  }
  
 
  export function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  