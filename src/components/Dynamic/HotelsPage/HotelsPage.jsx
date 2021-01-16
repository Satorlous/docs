import React from 'react'

import { Table } from "antd";

const { Column } = Table;

export default class HotelsPage extends React.Component {

   constructor(props, context) {
      super(props, context);
      this.state = {
         loading: true,
         error: false,
         hotels: []
      }
   };

   componentDidMount() {
      this.populateHotelsData().catch(e => {
         console.log(e)
      });
   }

   async populateHotelsData() {
      await fetch(window.HOST + '/hotels', {
         method: 'POST',
      })
         .then(async (response) => {
            const data = await response.json();
            this.setState({hotels: data, loading: false});
         })
         .catch(e => this.setState({error: true})
         );
   }

   render() {
      return <Table bordered
         dataSource={this.state.hotels}
         pagination={{
            pageSize: 8
         }}
         loading={this.state.loading}
      >
         <Column title="#" dataIndex="id" key="id" />
         <Column title="Название" dataIndex="name" key="name" width={250}/>
         <Column title="Адрес" dataIndex="adress" key="adress" width={400}/>
         <Column title="Сайт" dataIndex="webpage" key="webpage" />
         <Column title="Рейтинг" dataIndex="rating" key="rating" />
      </Table>
   }
}