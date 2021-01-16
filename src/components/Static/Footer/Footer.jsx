import React from 'react'
import css from './Footer.module.scss'
import Container from "../Utils/Container/Container";
import {Link} from "react-router-dom";

export default class Footer extends React.Component {

   render() {
      return <footer className={css.footer}>
         <div className={css.wrapper}>
            <div className={css.copyright}>
               <span>Copyright © 2020</span>
            </div>
            <div className={css.info}>
               <div className={css.mail}>
                  Почта: example@email.org
               </div>
               <div className={css.phone}>
                  Телефон: 8-800-555-12-34
               </div>
            </div>
         </div>
      </footer>
   }
}