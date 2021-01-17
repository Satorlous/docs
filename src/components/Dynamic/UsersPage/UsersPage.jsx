import React from 'react'
import { Table } from "antd";

const { Column } = Table;

export default class UsersPage extends React.Component {

   constructor(props, context) {
      super(props, context);
      this.state = {
         loading: true,
         error: false,
         users: []
      }
   }

   componentDidMount() {
      this.populateUserData()
         .catch(e => {console.log(e)})
   }

   async populateUserData() {
      await fetch(window.HOST + '/users', {
         method: 'POST',
      })
         .then(async (response) => {
            const data = await response.json();
            this.setState({users: data, loading: false});
            console.log(this.state.users);
         }).catch(e => this.setState({error: true}));
   }


   render() {
      return <Table bordered
                    dataSource={this.state.users}
                    pagination={{
                       pageSize: 8
                    }}
                    loading={this.state.loading}
      >
         <Column title="#" dataIndex="id" key="id" />
         <Column title="ФИО" dataIndex="name" key="name"/>
         <Column title="Почта" dataIndex="email" key="email"/>
         <Column title="Посл. изм." dataIndex="updatedAt" key="updatedAt" />
      </Table>
   }
}