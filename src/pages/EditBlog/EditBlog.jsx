import React, { useState, useEffect } from 'react';
import BlogEditor from '../../components/Editor.jsx/Editor';
import { useParams } from "react-router-dom";
import { getBlog } from '../../service/api';
import { message } from 'antd';

const EditBlogPage = () => {

	const params = useParams();

	const [blog, setBlog] = useState();

	const handleGetBlogData = async () => {
		const { id } = params;

		try {
			if (id) {
				const res = await getBlog(id);

				setBlog(res.data.data.blog);
			}
		} catch (err) {
			message.error(err.response.data.message | err.message);
		}
	}

	useEffect(() => {
		handleGetBlogData();
	}, []);


	return (
		<div className="edit-blog">
			{blog && <BlogEditor blog={blog}></BlogEditor>}
		</div>
	);
}
 
export default EditBlogPage;