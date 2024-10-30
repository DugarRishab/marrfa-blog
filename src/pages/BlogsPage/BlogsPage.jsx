import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { deleteBlog, getBlogs, updateBlog } from "../../service/api";
import "./BlogsPage.css";
import {
	DeleteOutlined,
	EditOutlined,
	CloudUploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
	const navigate = useNavigate();

	const handleDeleteBlog = async () => {
		try {
			await deleteBlog(blog._id);
			navigate("/");
		} catch (error) {
			message.error(
				"Error deleting blog:",
				error.reponse.data.message || error.message
			);
		}
	};

	const handleEditBlog = () => {
		navigate("/edit/" + blog._id);
	};

	const handlePublishBlog = async () => {
		try {
			const res = await updateBlog(blog._id, { active: true });
			navigate("/");
		} catch (error) {
			message.error(
				"Error publishing blog:",
				error.reponse.data.message || error.message
			);
		}
	};

	return (
		<div className="blog-card">
			<div className="img">
				<img src={blog.coverImg} alt="" />
			</div>

			<div className="content">
				<div className="name">{blog.name}</div>

				{/* {blog.content} */}
				<div className="description">{blog.description}</div>

				<Button.Group className="action">
					<Button
						variant="filled"
						icon={<EditOutlined />}
						onClick={handleEditBlog}
					>
						Edit
					</Button>
					<Button
						color="danger"
						variant="filled"
						onClick={handleDeleteBlog}
						icon={<DeleteOutlined></DeleteOutlined>}
					>
						Delete
					</Button>
					<Button
						onClick={handlePublishBlog}
						disabled={blog.active}
						variant="filled"
						type="primary"
						icon={<CloudUploadOutlined />}
					>
						{blog.active ? 'published' : 'Publish'}
					</Button>
				</Button.Group>
			</div>
		</div>
	);
};

const BlogsPage = () => {
	const [blogs, setBlogs] = useState([]);

	const handleGetBlogs = async () => {
		try {
			const res = await getBlogs();
			setBlogs(res.data.data.blogs);
		} catch (error) {
			message.error(
				"Error saving the blog:",
				error.reponse.data.message || error.message
			);
		}
	};

	useEffect(() => {
		handleGetBlogs();
	}, []);

	return (
		<div className="blogs-page">
			<h1>All Blogs</h1>
			<div className="blogs">
				{blogs.map((blog, i) => (
					<BlogCard key={i} blog={blog}></BlogCard>
				))}
			</div>
		</div>
	);
};

export default BlogsPage;
