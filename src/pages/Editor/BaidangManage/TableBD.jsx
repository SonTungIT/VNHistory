import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { AddIcon, DeleteIcon, EditIcon, VisibilityIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditBDModal from './BDModal/EditBDModal';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import AddImage from './AddImage/AddImage';
import config from '~/config';
import TableMeta from '../PostMetaManage/TableMeta';
import { Pagination } from 'antd';

function TableBD() {
    const [posts, setPosts] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [ediBDModal, setEditBDModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [addImage, setAddImage] = useState(false);
    const [views, setViews] = useState([]);

    const infoUser = JSON.parse(localStorage.getItem('infoUser'));

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the API
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
            return;
        }
        fetchData();
    }, []);

    const fetchData = () => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch('https://vietnamhistory.azurewebsites.net/api/posts', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // Update the events state with the retrieved data
                setPosts(result.data);
            })
            .catch((error) => console.log('error', error));
    };

    const handleDelete = (postId) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/posts/${postId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted event from the events state
                    setPosts(posts.filter((post) => post.postId !== postId));
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setEditBDModal(true);
        console.log(post);
    };

    const handleAddImg = (post) => {
        setSelectedPost(post);
        setAddImage(true);
        console.log(post);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    };

    const handleRowClick = (postId) => {
        if (expandedRows.includes(postId)) {
            setExpandedRows(expandedRows.filter((id) => id !== postId));
        } else {
            setExpandedRows([...expandedRows, postId]);
        }
    };

    const handleView = (postId) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://vietnamhistory.azurewebsites.net/api/postmetas/post/${postId}/meta`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                // Bỏ qua lỗi 404 và chuyển hướng đến trang mới với postId
                if (response.status === 404) {
                    navigate(`/BaidangMange/postmeta`, { state: { postId: postId } });
                } else {
                    throw new Error(response.status);
                }
            })
            .then((result) => {
                // Nếu dữ liệu không rỗng, chuyển hướng đến trang mới
                navigate(`/BaidangMange/postmeta`, { state: { views: result.data } });
            })
            .catch((error) => console.log('error', error));
    };

    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(2);
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    // const handlePageChange = (event, value) => {
    //     setCurrentPage(value);
    // };

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">Tiêu đề</th>
                        {/* <th className="th-user">slug</th> */}
                        <th className="th-user">Tóm tắt</th>
                        <th className="th-user">Chế độ</th>
                        {/* <th className="th-user">Ngày tạo</th> */}
                        {/* <th className="th-user">Ngày cập nhật</th> */}
                        <th className="th-user">Ngày công khai</th>
                        <th className="th-user">Nội dung</th>
                        <th className="th-user">Thể loại</th>
                        <th className="th-user">Sự kiện</th>
                        <th className="th-user">Người đăng</th>
                        <th className="th-user">Bài đăng trước</th>
                        <th className="th-user">Ảnh</th>
                        <th className="th-user"></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => {
                        const truncatedMetaTitle =
                            post.metaTitle.length > 5 ? post.metaTitle.slice(0, 5) + '...' : post.metaTitle;
                        const truncatedSlug = post.slug.length > 5 ? post.slug.slice(0, 5) + '...' : post.slug;
                        const truncatedSummary =
                            post.summary.length > 5 ? post.summary.slice(0, 5) + '...' : post.summary;
                        const truncatedContent =
                            post.content.length > 5 ? post.content.slice(0, 5) + '...' : post.content;
                        const isExpanded = expandedRows.includes(post.postId);

                        return (
                            <React.Fragment key={post.postId}>
                                <tr>
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.metaTitle : truncatedMetaTitle}
                                    </td>
                                    {/* <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.slug : truncatedSlug}
                                    </td> */}
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.summary : truncatedSummary}
                                    </td>
                                    <td className="td-user">{post.published === 1 ? 'Công khai' : 'Riêng tư'}</td>
                                    {/* <td className="td-user">{formatDate(post.createdAt)}</td> */}
                                    {/* <td className="td-user">{formatDate(post.updatedAt)}</td> */}
                                    <td className="td-user">{formatDate(post.publishedAt)}</td>
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.content || '' : truncatedContent || ''}
                                    </td>
                                    <td className="td-user">{post.categoryNames}</td>
                                    <td className="td-user">{post.eventNames}</td>
                                    <td className="td-user">{post.authorName}</td>
                                    <td className="td-user">{post.parentId !== null ? post.parentId : ''}</td>
                                    <td className="td-user">
                                        <button className="btn-function" onClick={() => handleAddImg(post.postId)}>
                                            <AddIcon />
                                        </button>
                                    </td>
                                    <td className="td-user">
                                        <button className="btn-function" onClick={() => handleView(post.postId)}>
                                            <VisibilityIcon />
                                        </button>
                                        <button className="btn-function" onClick={() => handleEdit(post)}>
                                            <EditIcon />
                                        </button>
                                        <button className="btn-function" onClick={() => handleDelete(post.postId)}>
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr>
                                        <td colSpan="12">
                                            {/* Render additional information here */}
                                            {/* You can customize the expanded content */}
                                            {/* For example: */}
                                            <div>{post.additionalInfo}</div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            {/* <div className='footer'>
                <Pagination
                    count={Math.ceil(posts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    color="primary"
                />
            </div> */}
            {ediBDModal && <EditBDModal closeModal={() => setEditBDModal(false)} post={selectedPost} posts={posts} />}
            {addImage && <AddImage closeModal={() => setAddImage(false)} post={selectedPost} />}
        </>
    );
}

export default TableBD;
