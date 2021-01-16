import {API_BASE_URL, ACCESS_TOKEN} from '../constants';

export default class Auth {
   
   static request = (options) => {
      const headers = new Headers({
         'Content-Type': 'application/json',
      })

      if (localStorage.getItem(ACCESS_TOKEN)) {
         headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
      }

      const defaults = {headers: headers};
      options = Object.assign({}, defaults, options);

      return fetch(options.url, options)
         .then(response =>
            response.json().then(json => {
               if (!response.ok) {
                  return Promise.reject(json);
               }
               return json;
            })
         );
   };

   static getCurrentUser() {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
         return Promise.reject("Токен авторизации не установлен.");
      }

      return this.request({
         url: API_BASE_URL + "/user/me",
         method: 'GET'
      });
   }



   static login(loginRequest) {
      return this.request({
         url: API_BASE_URL + "/auth/login",
         method: 'POST',
         body: JSON.stringify(loginRequest)
      });
   }

   static signup(signupRequest) {
      return this.request({
         url: API_BASE_URL + "/auth/signup",
         method: 'POST',
         body: JSON.stringify(signupRequest)
      });
   }

   static getUrlParameter(name, props) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

      let results = regex.exec(props.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
   };
}
