import React from 'react'
import css from "./MainPage.module.scss"
import {Link} from "react-router-dom";


class MainPage extends React.Component {
   render() {
      return (
         <div className={css.row}>
            <Link to="/users">
               <div className={css.bigbutton}>
                  Пользователи
               </div>
            </Link>
            <Link to="/hotels">
               <div className={css.bigbutton}>
                  Отели
               </div>
            </Link>
         </div>
      )
   }
}

export default MainPage;