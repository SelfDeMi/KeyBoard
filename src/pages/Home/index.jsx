import {
  PieChartOutlined,
  UserOutlined, TeamOutlined,
  DesktopOutlined, FormOutlined,
  DownOutlined, VideoCameraAddOutlined
} from '@ant-design/icons';
import { lazy } from 'react';
import { Breadcrumb, Layout, Menu, Input, Dropdown, message, Space, Button, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate,useRoutes} from 'react-router-dom'
import './home.css'
import { removeLocalStorage } from '../../utils/localStorage'
const NoteIndex = lazy(() => import('../Note'))





const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
let InputSearchFunc = () => {
  console.log("aa");
}
let showUseInfo = () => {
  console.log("bb");
}


//导航栏部署
const items = [
  getItem('学习空间', 'a', <PieChartOutlined />),
  getItem('抖音小视界', 'b', <DesktopOutlined />),
  getItem('消息', 'c', <FormOutlined />, [
    getItem('新西兰老母猪', 'c-1'),
    getItem('利比里亚黑毛猪', 'c-2'),
    getItem('印第安斑鸠', 'c-3'),
    getItem('白垩纪宝丽龙', 'c-4'),
  ]),
  getItem('好友', 'd', <UserOutlined />,
    [getItem('狐朋1号', 'd-1'),
    getItem('狗友2号', 'd-2')
    ]),
  getItem('骑猪大队群', 'e', <TeamOutlined />,
    [getItem('耶特兰大猪圈', 'e-1'),
    getItem('内蒙古野生老鼠洞', 'e-2')
    ]),
  getItem('聊天室', 'f', <VideoCameraAddOutlined />, [
    getItem('奥巴马来电', 'f-1'),
    getItem('习大大来电', 'f-2'),
    getItem('特兰普求见', 'f-3'),
    getItem('拜登跪安', 'f-4'),
  ]),
  getItem('笔记', 'g', <FormOutlined />,
    [getItem('使用介绍', 'g-0')
      , getItem('JS笔记', 'g-1'),
    getItem('golang笔记', 'g-2')
    ]),
];

// console.log(myIItems);
const Home = () => {
  let navigate = useNavigate()
  //被选中的item 然后遍历它
  let updateItems = (key) => {
    items.map((i) => {
      if (i.children) {
        i.children.map((ci) => {
          if (ci.key === key) {
            //这里拿到了父级的key i.key ！！！！！！
            // return console.log(i.key);
            return setMyIItems(i.children)
          }
          return []
        })
      } else {
        if (i.key === key) {
          // return console.log(key);
          return setMyIItems([i])
        }
      }
      return []

    })
  }

  const onClick = ({ key }) => {
    // 点击了下拉菜单，即跳转
    console.log(key);
    if (key > 2) {
      message.success('退出成功')
      removeLocalStorage('KB_USERCOOKIE')
      navigate('/login')
    }

  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: '用户详情',
          key: '1',
        },
        {
          label: '用户设置',
          key: '2',
        },
        {
          label: '退出登录',
          key: '3',
        },
      ]}
    />
  );

  let [pmyIItems, setMyIItems] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['a']} mode="inline" items={items}
          // onSelect={(a) => {
          //   // 被选中后触发
          //   setSLESCTKRY(a.key)
          // }}
          onClick={(e) => {
            updateItems(e.key)
            switch (e.key) {
              case 'g-0':
                navigate('/note/')
                break;
              case 'g-1':
                navigate('/note/normalnote')
                break;
              case 'g-2':
                navigate('/note/normalnote')
                break;
              default:
                navigate('/note/normalnote')
                break;
            }
          }}
        />
      </Sider>



      <Layout className="site-layout">


        {/* 头部 */}
        <Header
          className="site-layout-background"
          style={{
            height: 5 + 'rem',
            padding: 0,
            backgroundColor: 'white'
          }}
        >
          {/* 搜索框，用户头像 */}
          <div className="header-box">

            {/* 展示用户信息 */}
            <span onClick={showUseInfo} >
              <img
                style={{
                  margin: 10,
                  borderRadius: 30,
                  width: 60,
                  height: 60
                }}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                alt="加载失败" />   </span>


            {/* <MenuUnfoldOutlined /> */}
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  你是猪吧
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>



            <Search placeholder="用户名/账号" enterButton onSearch={InputSearchFunc}
              style={{ width: 30 + 'rem', marginLeft: 13 + 'rem', marginTop: 1.5 + "rem" }}
            />


          </div>
        </Header>


        {/* 主体内容 */}
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {
              pmyIItems.map(i => {
                return <Breadcrumb.Item key={i.key} >
                  <Button style={{ borderRadius: 5 }} disabled={true} >
                    {i.label}</Button>
                </Breadcrumb.Item>
              })
            }

          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 550,
            }}
          >
            {/* 主界面 */}
            <NoteIndex></NoteIndex>
          </div>



        </Content>


        {/* 尾部？ */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          KeyBoard app Design ©2018 Used by SelfDeMi
          Just For Learn <br></br>
          如需转载,请联系QQ:2624752305
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;