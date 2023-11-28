
export function saveAuthData(token, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }
  

  export function getAuthData() {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      return { token, userId }
    }  catch (error) {
      const token = "";
      const userId = "";
      return {token, userId};
    };
  }
  export function IniciarSesion(password,correo){
    if(password ==="Admin1224"&& correo==="Admin12@Admin.com"){
      window.location = "/Administrador"
  }
  }
 
  export function clearAuthData() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } catch (error) {
      throw new Error("Objetos no encontrados para remover");
    }
  }
  