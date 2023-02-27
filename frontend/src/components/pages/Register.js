import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Divider, Avatar, Form, Input, Typography } from 'antd';
const { Text } = Typography;

export default function Register() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setInputs({ ...inputs, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        const formData = new FormData();
        formData.append('name', inputs.name)
        formData.append('email', inputs.email)
        formData.append('password', inputs.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [error, isAuthenticated, dispatch, navigate])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">

                <Form name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={submitHandler}>
                    <Text style={{ fontSize: 20 }} className='d-flex justify-content-center'>Register User</Text>
                    <Divider />

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} name="name" type="name" value={inputs.name}
                            onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                            placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} name="email" type="email" value={inputs.email}
                            onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                            placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            value={inputs.password}
                            name="password"
                            onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <div className='d-flex align-items-center mb-3'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>

                                <Avatar size={100} icon={<UserOutlined />} src={avatarPreview} />

                            </figure>
                        </div>
                        <Form.Item>
                            <Input
                                type='file'
                                name='avatar'
                                onChange={onChange}
                                className='custom-file-input'
                                id='customFile'
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                            </label>
                        </Form.Item>
                    </div>

                    <Form.Item >
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loading} loading={loading} className="login-form-button "
                        >
                            Regiser
                        </Button>
                        <Link to="/" className="float-right mt-3">Already have an account? Click</Link>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}