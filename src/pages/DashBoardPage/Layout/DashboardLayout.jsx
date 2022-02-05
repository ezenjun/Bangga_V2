import React from 'react'
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.variable.min.css'
import { UserOutlined, StockOutlined,AppstoreOutlined, BookOutlined,HomeOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom'
import sidebarItems from "../../../assets/JSON/sidebarItems.json";
import logoText from '../../../assets/Logo/TextLogo.png'
import logoIcon from '../../../assets/Logo/OfficialIcon.png'
import logo from '../../../assets/Logo/Logo.png'
import slogan from '../../../assets/icon/Slogan_Banga.png'
import "./dashboard.css"
import SidebarIcon from '../../../components/sidebarIcon';

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



const DashboardLayout = () => {
	
    return (
		<Layout style={{boxSizing:'border-box', height: '100vh',padding: '20px', backgroundColor:'#F5F5F5'}}>
			<Sider style={{backgroundColor:'#F5F5F5', marginRight:'20px'}}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['0']}
					style={{ height: '100%',backgroundColor:'white', padding: '20px', borderRadius:'10px' }}
				>
					<div className="headerlogo"><img src={logo} width='150' alt="" /></div>
					{/* {
						sidebarItems.map((item, index)=>(
							<Menu.Item key={index} icon={<SidebarIcon/>} >
								<Link className="links" to={item.route} key={index}>
									{item.display_name}
								</Link>
							</Menu.Item>
							
						))
					} */}
					<Menu.Item key='0' icon={<AppstoreOutlined />} >
						<Link className="links" to="/dashboard" key='0'>
							대시보드
						</Link>
					</Menu.Item>
					<Menu.Item key='1' icon={<BookOutlined />} >
						<Link className="links" to="/dashboard/manage_rsv" key='1'>
							예약관리
						</Link>
					</Menu.Item>
					<Menu.Item key='2' icon={<StockOutlined />} >
						<Link className="links" to="/dashboard/analytics" key='2'>
							통계관리
						</Link>
					</Menu.Item>
					<Menu.Item key='3' icon={<HomeOutlined />} >
						<Link className="links" to="/dashboard/spacemanagement" key='3'>
							공간관리
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout style={{ backgroundColor:'rgb(245, 245, 245)'}}>
				<Content style={{ backgroundColor:'white', borderRadius:'10px'}}> <Outlet /> </Content>
			</Layout>
		</Layout>
    )
}

export default DashboardLayout


