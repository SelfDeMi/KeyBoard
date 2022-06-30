import React from 'react'
import { useState } from 'react'
import './login.css'
import {reqRegister,reqLogin,reqFindUser,reqFindCookie} from '../../api/index'
import {nanoid} from 'nanoid'
import {message} from 'antd'
import {setLocalStorage,getLocalStorage} from '../../utils/localStorage'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
    reqFindCookie(getLocalStorage('KB_USERCOOKIE')).then((res) => {
      // console.log(res);
      if (res.data === '该用户已存在') {
        message.success('自动登陆中,即将跳转')
      setTimeout(() => {
        navigate('/',{replace:true})
      }, 3000);
      }
    })

  const login = () => {
    if (password!==''&&username!=='') {
      reqFindUser(username).then((res) => {
        if (res.data === '该用户已存在') {
          reqLogin(username,password).then((res) => {
            console.log(res);
            if (res) {
              if (res.data.username === username && res.data.password === password) {
                // console.log(res);
                message.success('用户信息验证成功')
                setLocalStorage("KB_USERCOOKIE",res.data.cookie)
                navigate('/',{replace:true})
              }
            }
          },(err) => {
            console.log(err);
          })
        }if (res.data === '该用户不存在') {
          message.warn('该用户不存在')
        }
      },(err) => {
        message.error(err)
      })


      reqLogin(username,password,'62b806f2438a847eebd75756').then((res) => {
        if (res) {
          if (res.data.username === username && res.data.password === password) {
            // console.log(res);
            message.success('用户信息验证成功')
            setLocalStorage("KB_USERID",res.data._id)
            setLocalStorage("KB_USERCOOKIE",res.data.cookie)
            navigate('/',{replace:true})
          }
        }
      },(err) => {
        console.log(err);
      })
      

    }else{
      message.warning('账号或密码不能为空')
    }
    
  }
  const goRegister = () => {
      //    reqRegister(username,password,nanoid()).then((res) => {
      // },(e) => {
      //   console.log(e);
      // })
      navigate('/register',{replace:false})
  }
  return (
    <div className='login-box'>
      <div className="input-wrapper">
         <div className='n'>
          <input className="input" name="username" placeholder="请输入账号" type="text" onChange={(e) => {
            setUsername(e.target.value) 
          }} />
          </div>
        <div className='p'>
          <input className="input" name="password" placeholder="请输入密码" type="password" onChange={(e) => {
            setPassword(e.target.value)
          }}/>
          </div>
        <div className='btn'>
          <button onClick={login}>登录</button>
          <button onClick={goRegister}>注册</button></div>
      </div>
    </div>
  );

}

