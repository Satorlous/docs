import React from 'react'
import Auth from "../../../services/Auth";
import {ACCESS_TOKEN} from "../../../constants";
import Alert from "react-s-alert";
import css from "../Auth.module.scss";
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export default class SignupPage extends React.Component {
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
            <h1 className={css.header}>Регистрация</h1>
            <div className={css.headerDesc}>Для регистрации заполните следующие поля:</div>
            <div className={css.wrapper}>
               <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{

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
