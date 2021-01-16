import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const SecuredRoute = ({component: Component, user, permitLevel, ...rest}) => {

   const isAuthorized = () => user.hasOwnProperty("role");

   const isPermitted = () => {
      if (isAuthorized())
         return user.role.level >= permitLevel
      return false;
   }

   return <Route {...rest} render={
      props =>
         isPermitted()
         ? <Component {...props} />
         : isAuthorized()
         ? <Redirect to="/"/>
         : <Redirect to="/login"/>
   }/>
};


export default SecuredRoute;