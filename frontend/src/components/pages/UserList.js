import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, getUsers } from "../../actions/userActions"
import { clearError, clearUserDeleted } from "../../slices/userSlice"
import Loader from '../layouts/Loader';
import { toast } from 'react-toastify'
import { Table, Input, Button, Space, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState)
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const dispatch = useDispatch();

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'asc',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'asc',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'asc',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'asc',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Fragment>
                        <Link to={`/dashboard/${record._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, record._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                </Space>
            ),
        },
    ];
    const handleSearch = (value) => {
        setSearchText(value);
        setPageNumber(1);
    };

    const handleTableChange = (pagination) => {
        setPageNumber(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const filteredData = users.filter((record) =>
        Object.values(record).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const paginatedData = filteredData.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
    );


    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isUserDeleted) {
            toast('User Deleted Succesfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    }, [dispatch, error, isUserDeleted])


    return (
        <div className="row">
            <div className="col-12 col-md-10">
                <h1 className="my-4">User List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <Fragment>
                            <div className="col-4">
                                <Search
                                    placeholder="Search table data"
                                    allowClear
                                    enterButton={<SearchOutlined />}
                                    size="large"
                                    onSearch={handleSearch}
                                />
                            </div>
                            <Table
                                columns={columns}
                                dataSource={paginatedData}
                                pagination={false}
                                onChange={handleTableChange}
                            />
                            <Pagination
                                current={currentPage}
                                total={filteredData.length}
                                pageSize={pageSize}
                                showSizeChanger
                                onShowSizeChange={(current, size) => {
                                    setPageSize(size);
                                    setCurrentPage(1);
                                }}
                                onChange={(page) => setCurrentPage(page)}
                                style={{ marginTop: 16, textAlign: 'center' }}
                            />
                        </Fragment>
                    }
                </Fragment>
            </div>
        </div>
    )
}

