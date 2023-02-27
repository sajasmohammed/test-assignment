import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography, Select } from 'antd';
const { Text } = Typography;
const { Option } = Select;

const options = ['admin', 'user'];

export default function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { id: userId } = useParams();

    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState)
    const { user: authUser } = useSelector(state => state.authState)

    const dispatch = useDispatch();

    const handleChange = (value) => {
        setRole(value);
    };
    const submitHandler = (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }

        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])


    useEffect(() => {
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user])


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <Fragment>
                        <Form name="normal_login"
                            onFinish={submitHandler}>
                            <Text style={{ fontSize: 20 }} className='d-flex justify-content-center'>Update User</Text>
                            <Divider />
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <p className="d-none">{name}</p>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} name="name" type="name" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <p className="d-none">{email}</p>
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select value={role} disabled={user._id === authUser._id} onChange={handleChange}>
                                    {options.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item >
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loading} loading={loading} className="login-form-button "
                                >
                                    Update
                                </Button>

                            </Form.Item>
                            <Link to="/dashboard" className="float-left mt-0">Back to Dashboard</Link>

                        </Form>

                        {/* <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Email</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Role</label>
                                <select disabled={user._id === authUser._id} value={role} onChange={e => setRole(e.target.value)} className="form-control" id="category_field">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>

                        </form> */}
                </Fragment>
            </div>
        </div>

    )
}