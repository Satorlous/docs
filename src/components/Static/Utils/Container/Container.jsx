import React from 'react'
import css from './Container.module.scss'

function Container(props) {
   return <div className={css.container}>
      {props.children}
   </div>
}

export default Container;