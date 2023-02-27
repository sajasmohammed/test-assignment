import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
const { Text } = Typography;
export default function Login() {
    const [input, setInput] = useState({ email: "", password: "" })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const submitHandler = (e) => {
        // e.preventDefault()
        dispatch(login(input.email, input.password))
    }


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/myprofile')
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
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <Form name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={submitHandler}>
                        <Text style={{ fontSize: 20 }} className='d-flex justify-content-center'>Welcome to Login Page</Text>
                        <Divider />
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} name="email" type="email" value={input.email}
                                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                value={input.password}
                                name="password"
                                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item >
                            <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loading} loading={loading} className="login-form-button "
                            >
                                Log in
                            </Button>

                        </Form.Item>
                        <Link to="/register" className="float-left mt-0">Dont have an account? Click</Link>

                    </Form>
                </div>
            </div>
        </Fragment>
    )
}