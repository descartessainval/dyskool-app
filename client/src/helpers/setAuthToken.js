import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log('token receptionné', token);
  } else {
    // delete axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;

//  creuser cette façon également
// // import cookie from 'js-cookie';
// //set in from cookie such as stored token
// export const setLocalStorage = (key, value) => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// export const authentificate = (res, next) => {
//   console.log('AUTHENTIFICATE HELPER ON SIGN RES');
//   // setCookie('token', response.data.token)
//   setLocalStorage('token', res.token);
//   // setLocalStorage('user', res.data.user);
//   next();
// };

// if (token) {
//   axios.defaults.headers.common['x-auth-token'] = token;
// } else {
//   delete axios.defaults.headers.common['x-auth-token'];
// }
