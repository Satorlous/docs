import React from 'react'

export default function Test() {

   fetch(window.HOST + "/users", {
      method: 'POST',
   })
      .then(response => response.json())
      .then(data => {
         console.log(data)
      });


   return <div>1</div>
}