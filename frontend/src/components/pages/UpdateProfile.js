import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import { Button, Form, Input, Avatar } from 'antd';
import { MailOutlined, UserOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Typography, Divider } from 'antd';
const { Text } = Typography;

export default function UpdateProfile() {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0])
            }
        }


        reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler = (e) => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
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
    }, [user, isUpdated, error, dispatch])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <Form name="normal_login"

                    onFinish={submitHandler}>
                    <Text style={{ fontSize: 20 }} className='d-flex justify-content-center'>Update Profile</Text>
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
                                onChange={onChangeAvatar}
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
                            Update Profile
                        </Button>

                    </Form.Item>
                    <Link to="/myprofile" className="float-left mt-0">Back to Profile</Link>

                </Form>


            </div>
        </div >)
}

