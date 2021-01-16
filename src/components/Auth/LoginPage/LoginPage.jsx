import React from 'react'

import Alert from 'react-s-alert';
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link, Redirect} from "react-router-dom";
import css from "../Auth.module.scss"
import Auth from "../../../services/Auth";
import {ACCESS_TOKEN, USER_AUTHORIZED} from '../../../constants';

export default class LoginPage extends React.Component {
   constructor(props) {
      super(props);
   }

   onFinish = (values) => {
      let success = false;
      Auth.login(values).then(response => {
         localStorage.setItem(ACCESS_TOKEN, response.accessToken);
         Alert.success("Вы авторизованы!");
         this.context.changeState(true);
         success = true;
      }).catch(error => {
         Alert.error((error && error.message) || 'Ошибка аторизации. Попробуйте еще раз позже.');
      });

      if(success)
         this.props.history.goBack();
   };

   componentDidMount() {

   }

   render() {
      return (
         <>
            <h1 className={css.header}>Авторизация</h1>
            <div className={css.headerDesc}>Для входа заполните следующие поля:</div>
            <div className={css.wrapper}>
               <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                     remember: true,
                  }}
                  layout="vertical"
                  onFinish={this.onFinish}
               >
                  <Form.Item
                     label={<span className={css.label}>E-mail</span>}
                     name="email"
                     rules={[
                        {
                           type: "email",
                           required: true,
                           message: 'Пожалуйста, введите E-mail',
                        },
                     ]}
                  >
                     <Input className={css.formInput}
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                     />
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
                        className={css.formInput}
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                     />
                  </Form.Item>
                  <Form.Item>
                     <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                     </Form.Item>

                     <Link className={css.loginFormForgot} to={'/'}>
                        Забыл пароль
                     </Link>
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" className={css.loginFormButton}>
                        Войти
                     </Button>
                     Или <Link to={'/'}>зарегистрируйтесь сейчас!</Link>
                  </Form.Item>
               </Form>
            </div>
         </>
      );
   }
}

LoginPage.contextType = USER_AUTHORIZED