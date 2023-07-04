import React, { useState, useEffect } from 'react';
import '../../Admin/Table.scss';
import { DeleteIcon, EditIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import EditBDModal from './BDModal/EditBDModal';

function TableBD(props) {
    const [posts, setPosts] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [ediBDModal, setEditBDModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        // Fetch data from the API
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

        fetch('https://vietnam-history.azurewebsites.net/api/posts', requestOptions)
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

        fetch(`https://vietnam-history.azurewebsites.net/api/posts/${postId}`, requestOptions)
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

    return (
        <>
            <table className="table-user">
                <thead>
                    <tr>
                        <th className="th-user">postId</th>
                        <th className="th-user">authorId</th>
                        <th className="th-user">parentId</th>
                        <th className="th-user">metaTitle</th>
                        <th className="th-user">slug</th>
                        <th className="th-user">summary</th>
                        <th className="th-user">published</th>
                        <th className="th-user">createdAt</th>
                        <th className="th-user">updatedAt</th>
                        <th className="th-user">publishedAt</th>
                        <th className="th-user">content</th>
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
                        const isExpanded = expandedRows.includes(post.postId);

                        return (
                            <React.Fragment key={post.postId}>
                                <tr>
                                    <td className="td-user">{post.postId}</td>
                                    <td className="td-user">{post.authorId}</td>
                                    <td className="td-user">{post.parentId !== null ? post.parentId : 'null'}</td>
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.metaTitle : truncatedMetaTitle}
                                    </td>
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.slug : truncatedSlug}
                                    </td>
                                    <td className="td-user" onClick={() => handleRowClick(post.postId)}>
                                        {isExpanded ? post.summary : truncatedSummary}
                                    </td>
                                    <td className="td-user">{post.published}</td>
                                    <td className="td-user">{formatDate(post.createdAt)}</td>
                                    <td className="td-user">{formatDate(post.updatedAt)}</td>
                                    <td className="td-user">{formatDate(post.publishedAt)}</td>
                                    <td className="td-user">{post.content}</td>
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
                    })}
                </tbody>
            </table>
            {ediBDModal && <EditBDModal closeModal={() => setEditBDModal(false)} post={selectedPost} />}
        </>
    );
}

export default TableBD;
