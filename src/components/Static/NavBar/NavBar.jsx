import React from 'react'
import css from './NavBar.module.scss'
import Container from "../Utils/Container/Container";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {USER_AUTHORIZED} from "../../../constants";


class NavBar extends React.Component {


   render() {
      let links =
         this.context.authorized ?
         <Link to={"/logout"}>Выйти</Link> :
         <>
            <Link to={"/login"}>Войти</Link>
            <Link to={"/signup"}>Зерегистрироваться</Link>
         </>




      return (
         <nav>
            <Container>
               <div className={css.wrapper}>
                  <div className={css.caption}><Link to={'/'}>Управление отелями</Link></div>
                  <div className={css.links}>
                     {links}
                     <Link to={"/login"}>SECURED</Link>
                     <Button onClick={() => this.onTestClick()}>Test</Button>
                  </div>
               </div>
            </Container>
         </nav>
      )
   }

   onTestClick() {
      console.log(this.context)
   }
}

NavBar.contextType = USER_AUTHORIZED

export default NavBar