import { Button, Form, Input,message } from 'antd';
import './register.css'
import {nanoid} from 'nanoid'
import {reqSendEmail,reqInsertDB,reqFindUser} from '../../api/index'
import {useNavigate} from 'react-router-dom'
import {setLocalStorage} from '../../utils/localStorage'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} 不能为空',
  types: {
    email: '${label} 不能为空',
    number: '${label} 不能为空',
  },
  number: {
    range: '${label} 在 ${min} 和 ${max} 之间',
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {

  const navigate = useNavigate()

  let IDCODE = ''

  let EMAIL = '' 

  let timeID = ''

  const onFinish = (values) => {
    
   const {username,password,email} = values.user

   reqFindUser(username).then((res) => {
    if (res.data === '该用户不存在') {
      if (values.user.idticode === IDCODE) {
        let LOCALCOOKIE = nanoid()
        //清除定时器
        clearTimeout(timeID)
        //注册成功
        // console.log("注册成功");
        //写入数据库
        reqInsertDB(username,password,LOCALCOOKIE,email).then(() => {
          setLocalStorage('KB_USERCOOKIE',LOCALCOOKIE)
          message.success("注册成功,即将跳转")
          setTimeout(() => {
            navigate('/')
          }, 2000);
          
        },(err) => {
          message(err)
        })
      }else{
        message.warn("验证码错误")
      }
    }if (res.data === '该用户已存在') {
      message.warn("该用户已存在")
    }
   },() => {
    
   })

  };

  const sendEmailF = () => {
    IDCODE = nanoid(4)
    timeID = setTimeout(() => {
      message.warn("验证码验证超时")
    },60000)
    reqSendEmail(IDCODE,EMAIL).then((res) => {
      message.success("发送成功")
    },(err) => {
      message.error("邮件返回错误",err)
    }
    )
  }

  return (
    <Form {...layout} name="nest-messages"
    className='register-box'
    onFinish={onFinish} validateMessages={validateMessages}>
 
      <Form.Item
        name={['user', 'username']}
        label="账户"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item name={['user', 'password']} rules={[{required:true}]} label="密码">
      <Input.Password />
      </Form.Item>

      <Form.Item
        name={['user', 'email']}
        label="邮箱"
        rules={[
          {
            type: 'email',
          },{
            required:true
          }
        ]}
      >
        <Input onChange={ (e) => {
          EMAIL = e.target.value
        } } />
      </Form.Item>

      <Form.Item
      name={['user', 'idticode']}
        label="验证码"
        rules={[
         {
            required:true
          }
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Button   style={{marginLeft: 50+'px',width:7+'rem'}} onClick={sendEmailF} >发送验证码</Button>
      </Form.Item>
    </Form>
  );
};

export default App;
