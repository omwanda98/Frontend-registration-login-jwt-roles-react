export default function generateAuthHeader() {
    const jwtToken = localStorage.getItem('jwt');
  
    if (jwtToken) {
      return { Authorization: 'Bearer ' + jwtToken };
    } else {
      console.warn("JWT token not found in local storage.");
      return {};
    }
  }
  