import React, { useState, useEffect } from 'react';
import styles from '../../Admin/Table.scss';
import classNames from 'classnames/bind';
import { AddIcon, DeleteIcon, EditIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditBDModal from './BDModal/EditBDModal';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import AddImage from './AddImage/AddImage';
import { useLocation } from 'react-router-dom';
import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import { Input, Space } from 'antd';

const { Search } = Input;

const cx = classNames.bind(styles);

function BaidangDetails() {
    const [posts, setPosts] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [ediBDModal, setEditBDModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [addImage, setAddImage] = useState(false);

    const location = useLocation();
    const searchResults = new URLSearchParams(location.search).get('searchResults');
    const parsedResults = JSON.parse(searchResults);

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

    const handleSearch = (value) => {
        const encodedKeyword = encodeURIComponent(value);
        const apiUrl = `https://vietnamhistory.azurewebsites.net/api/posts/search/metaTitle?keyword=${encodedKeyword}`;

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const encodedResults = encodeURIComponent(JSON.stringify(result));
                window.location.href = `/baidangDetails?searchResults=${encodedResults}`;
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <LayoutAdmin>
            <div className={cx('search-details')}>
                <Space direction="vertical">
                    <Search placeholder="Tìm kiếm" onSearch={handleSearch} style={{ width: 200 }} />
                </Space>
            </div>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">Tiêu đề</th>
                        {/* <th className="th-user">slug</th> */}
                        <th className="th-user">Tóm tắt</th>
                        <th className="th-user">Chế độ</th>
                        <th className="th-user">Ngày tạo</th>
                        <th className="th-user">Ngày cập nhật</th>
                        <th className="th-user">publishedAt</th>
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
                    {parsedResults && parsedResults.data && parsedResults.data.length > 0 ? (
                        parsedResults.data.map((post) => {
                            const isExpanded = expandedRows.includes(post.postId);
                            const truncatedMetaTitle = isExpanded ? post.metaTitle : post.metaTitle.slice(0, 5) + '...';
                            const truncatedSummary = isExpanded ? post.summary : post.summary.slice(0, 5) + '...';
                            const truncatedContent = isExpanded
                                ? post.content || ''
                                : (post.content || '').slice(0, 5) + '...';
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
                                        <td className="td-user">{formatDate(post.createdAt)}</td>
                                        <td className="td-user">{formatDate(post.updatedAt)}</td>
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
                        })
                    ) : (
                        <tr>
                            <td colSpan="14">No posts found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {ediBDModal && <EditBDModal closeModal={() => setEditBDModal(false)} post={selectedPost} posts={posts} />}
            {addImage && <AddImage closeModal={() => setAddImage(false)} post={selectedPost} />}
        </LayoutAdmin>
    );
}

export default BaidangDetails;
