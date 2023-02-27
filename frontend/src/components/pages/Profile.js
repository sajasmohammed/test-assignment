import { Button, Avatar, Typography } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
const { Text } = Typography;

export default function Profile() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout);
    }

    return (
        <div className="row justify-content-around mt-5">
            <div className="col-12 col-md-3">
                <figure className='d-flex justify-content-center'>
                    <Avatar size={200} icon={<UserOutlined />} src={user.avatar ?? './images/default_avatar.png'} />
                </figure>
                <Link to="/myprofile/update" className="btn-block my-5">
                    <Button type="dashed" danger style={{ width: 300, height: 40, fontSize: 20, color: 'black' }}>Edit Profile</Button>
                </Link>
                {user.role === 'admin' && <Link to="/dashboard" className="btn-block my-5">
                    <Button type="dashed" style={{ width: 300, height: 40, fontSize: 20, color: 'black' }}>Dashboard</Button>
                </Link>}

                <Button className="btn-block my-5" onClick={logoutHandler} type="dashed" style={{ width: 300, height: 40, fontSize: 20, color: 'black' }}>Logout</Button>

            </div>

            <div className="col-12 col-md-5">
                <Text style={{ fontSize: 20 }} strong>Full Name</Text>
                <p>{user.name}</p>

                <Text style={{ fontSize: 20 }} strong>Email Address</Text>
                <p>{user.email}</p>

                <Text style={{ fontSize: 20 }} strong>Joined</Text>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                <Link to="/myprofile/update/password" className="btn-block my-5">
                    <Button type="dashed" danger style={{ width: 300, height: 40, fontSize: 20, color: 'black' }}>Change Password</Button>
                </Link>
            </div>
        </div>
    )
}