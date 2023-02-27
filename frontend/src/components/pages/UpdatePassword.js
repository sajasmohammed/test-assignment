import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Typography, Divider } from 'antd';
const { Text } = Typography;

export default function UpdatePassword() {

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, isUpdated, error } = useSelector(state => state.authState)

    const submitHandler = (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData))
    }

    useEffect(() => {
        if (isUpdated) {
            toast('Password updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setOldPassword("");
            setPassword("")
            return;
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [isUpdated, error, dispatch])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <Form name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={submitHandler}>
                    <Text style={{ fontSize: 20 }} className='d-flex justify-content-center'>Change Password</Text>
                    <Divider />

                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your oldPassword!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="new_password_field"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password field!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loading} loading={loading} className="login-form-button"
                        >
                            Change password
                        </Button>
                        <Link to="/myprofile" className="float-left mt-0">Back to Profile</Link>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}