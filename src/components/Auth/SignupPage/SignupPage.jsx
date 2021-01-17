import React from 'react'
import Auth from "../../../services/Auth";
import {ACCESS_TOKEN, API_BASE_URL, USER_AUTHORIZED} from "../../../constants";
import Alert from "react-s-alert";
import css from "../Auth.module.scss";
import {Button, Checkbox, Form, Input, Select, Spin} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import debounce from 'lodash/debounce';

const {Option} = Select;

export default class SignupPage extends React.Component {
   constructor(props) {
      super(props);
      this.fetchCountries = debounce(this.fetchCountries, 500);
      this.state = {
         value: [],
         countries: [],
         fetching: false
      }
   }

   onFinish = (values) => {
      let success = false;
      Auth.signup(values)
         .then(data => {
            Alert.success(data.message);
            success = true;

            if (success) {
               Auth.login(values).then(response => {
                  localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                  this.context.changeState(true);
               }).catch(error => {
                  console.log(error)
               });

            }
         }).catch(error => {
         console.log(error.message)
         Alert.error((error && error.message) || 'Ошибка регистрации. Попробуйте еще раз позже.');
      })
      this.props.history.goBack();
   };

   fetchCountries = (name) => {
      if (name !== "") {
         this.setState({countries: [], fetching: true});
         Auth.request({
            url: API_BASE_URL + "/country/like/" + name,
            method: "GET"
         }).then(data => {
            this.setState({countries: data, fetching: false})
         }).catch(err => {
            console.log(err)
         })
      }
   }

   handleChange = (value) => {
      this.setState({
         value: value,
         countries: [],
         fetching: false,
      });
   };

   componentDidMount() {

   }

   render() {
      let {value, countries, fetching} = this.state;

      return (
         <>
            <h1 className={css.header}>Регистрация</h1>
            <div className={css.headerDesc}>Для регистрации заполните следующие поля:</div>
            <div className={css.wrapper}>
               <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{country: "Россия"}}
                  layout="vertical"
                  onFinish={this.onFinish}
               >
                  <Form.Item
                     label={<span className={css.label}>Имя</span>}
                     name="firstName"
                     rules={[
                        {
                           type: "string",
                           required: true,
                           message: 'Пожалуйста, введите имя',
                        },
                     ]}
                  >
                     <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>

                  <Form.Item
                     label={<span className={css.label}>Фамилия</span>}
                     name="lastName"
                     rules={[
                        {
                           type: "string",
                           required: true,
                           message: 'Пожалуйста, введите фамилию',
                        },
                     ]}
                  >
                     <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>

                  <Form.Item
                     label={<span className={css.label}>E-Mail</span>}
                     name="email"
                     rules={[
                        {
                           type: "email",
                           required: true,
                           message: 'Пожалуйста, введите E-Mail',
                        },
                     ]}
                  >
                     <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>

                  <Form.Item
                     label={<span className={css.label}>Страна</span>}
                     name="country"
                     rules={[
                        {
                           type: "string",
                           required: true,
                           message: 'Пожалуйста, введите страну',
                        },
                     ]}
                  >
                     <Select
                        showSearch
                        value={value}
                        placeholder="Поиск по странам"
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        filterOption={false}
                        onSearch={this.fetchCountries}
                        onChange={this.handleChange}
                        style={{width: '100%'}}
                        showArrow={false}
                     >

                        {countries.map(d => (
                           <Option key={d.id} value={d.name}>{d.name}</Option>
                        ))}
                     </Select>
                  </Form.Item>

                  <Form.Item
                     label={<span className={css.label}>Пароль</span>}
                     name="password"
                     style={{
                        fontSize: 22,
                     }}
                     rules={[
                        {
                           required: true,
                           message: 'Пожалуйста, введите пароль',
                        },
                     ]}
                  >
                     <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                     />
                  </Form.Item>

                  <Form.Item
                     name="confirm"
                     label={<span className={css.label}>Повторите пароль</span>}
                     dependencies={['password']}
                     hasFeedback
                     rules={[
                        {
                           required: true,
                           message: 'Пожалуйста, введите подтверждение пароля',
                        },
                        ({getFieldValue}) => ({
                           validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                 return Promise.resolve();
                              }

                              return Promise.reject('Пароли не совпадают!');
                           },
                        }),
                     ]}
                  >
                     <Input.Password/>
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" className={css.loginFormButton}>
                        Зарегистрироваться
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </>
      );
   }
}

SignupPage.contextType = USER_AUTHORIZED
