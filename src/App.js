import React, {Component} from "react";
import './App.scss';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Alert from 'react-s-alert';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainPage from "./components/Static/MainPage/MainPage";
import UsersPage from "./components/Dynamic/UsersPage/UsersPage";
import NavBar from "./components/Static/NavBar/NavBar";
import Container from "./components/Static/Utils/Container/Container";
import Footer from "./components/Static/Footer/Footer";
import HotelsPage from "./components/Dynamic/HotelsPage/HotelsPage";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import Auth from "./services/Auth";
import {ACCESS_TOKEN, ROLE_LEVEL, USER_AUTHORIZED} from "./constants"
import {Button} from "antd";
import SecuredRoute from "./components/SecuredRoute";
import SignupPage from "./components/Auth/SignupPage/SignupPage";

class App extends Component {

   constructor(props) {
      super(props);

      this.changeState = (state) => {
         if (state) {
            this.getUser();
         } else {
            this.setState({
               authorized: false,
               user: {}
            })
         }
      }

      this.state = {
         authorized: false,
         loading: true,
         user: {},
         changeState: this.changeState,
      }
   }

   componentDidMount() {
      this.getUser();
   }

   getUser() {
      Auth.getCurrentUser()
         .then(data => {
            this.setState({
               user: data,
               authorized: true,
               loading: false
            });
         }).catch(error => {
         this.setState({
            loading: false,
            authorized: false,
            user: {}
         });
      });
   }

   handleLogout() {
      localStorage.removeItem(ACCESS_TOKEN);
      this.setState({
         authorized: false,
         user: {}
      });
      Alert.success("Вы вышли из аккаунта!");
   }

   render() {

      return (
         <USER_AUTHORIZED.Provider value={this.state}>
            <Router>
               <div className="wrapper">
                  <Alert stack={{limit: 4}} effect={'slide'}/>
                  <NavBar/>
                  <main>
                     <Container>
                        <Switch>
                           <SecuredRoute exact path={"/sec"} user={this.state.user} permitLevel={ROLE_LEVEL.User} component={() => {
                              return "YOU ARE PERMITTED"
                           }}/>
                           <Route exact path="/" component={MainPage}/>
                           <Route exact path="/users" component={UsersPage}/>
                           <Route exact path="/hotels" component={HotelsPage}/>
                           <Route exact path={"/login"} component={() => {
                              if(!this.state.authorized) return <LoginPage/>
                              else return <Redirect to={"/"}/>
                           }}/>
                           <Route exact path={"/signup"} component={() => {
                              if(!this.state.authorized) return <SignupPage/>
                              else return <Redirect to={"/"}/>
                           }}/>
                           <Route path={"/logout"} component={() => {
                              this.handleLogout();
                              return <Redirect to={'/'}/>
                           }}/>
                        </Switch>
                     </Container>
                  </main>
                  <Footer/>
               </div>
            </Router>
         </USER_AUTHORIZED.Provider>
      )
   }

}

export default App;
