// src/components/BlogEditor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's styles
// import axios from "axios";
import {
	Input,
	Upload,
	Tag,
	Button,
	Divider,
	Typography,
	Card,
	message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Editor.css";
import { createBlog, updateBlog } from "../../service/api";

const { Title } = Typography;

const BlogEditor = ({ blog }) => {
	const [name, setName] = useState((blog && blog.name) || "");
	const [coverImgFile, setCoverImgFile] = useState(null); // File object for cover image
	const [coverImgPreview, setCoverImgPreview] = useState(
		(blog && blog.coverImg) || ""
	); // URL for live preview of cover image

	const [content, setContent] = useState((blog && blog.content) || ""); // HTML content from React-Quill
	const [tags, setTags] = useState((blog && blog.tags) || []);
	const navigate = useNavigate();

	// Handle cover image preview and file selection
	const handleCoverImgChange = ({ file }) => {
		const imgFile = file;
		setCoverImgFile(imgFile);
		setCoverImgPreview(URL.createObjectURL(imgFile)); // Create a URL for image preview
	};

	const handleAddTag = (e) => {
		if (e.key === "Enter" && e.target.value) {
			setTags((prevTags) => [...prevTags, e.target.value]);
			e.target.value = "";
		}
	};

	const handleRemoveTag = (tag) => {
		setTags((prevTags) => prevTags.filter((item) => item != tag));
	};

	// Handle form submission
	const handleSubmit = async (publish) => {
		if (!name) {
			message.error("Please add a title to the blog before saving");
			return;
		}
		// Create FormData object
		const formData = new FormData();
		formData.append("name", name);
		formData.append("content", content);
		tags.forEach((tag, i) => {
			formData.append(`tags[${i}]`, tag);
		});

		if (coverImgFile) formData.append("coverImg", coverImgFile);
		else formData.append("coverImg", coverImgPreview);
		// Append cover image file
		formData.append("active", publish);
		try {
			// Send FormData with Axios
			if (!blog) await createBlog(formData);
			else await updateBlog(blog._id, formData);
			navigate("/"); // Redirect after save
		} catch (error) {
			message.error(
				"Error saving the blog:",
				error.reponse.data.message || error.message
			);
		}
	};

	return (
		<div className="editor-wrapper">
			{/* Blog Editor Section */}
			<div className="editor">
				<Title level={2}>Create Blog</Title>
				{/* Blog Name Input */}
				<Input
					placeholder="Blog Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					size="large"
					style={{ marginBottom: "20px" }}
				/>
				{/* Cover Image Upload */}
				<Upload
					listType="picture"
					maxCount={1}
					beforeUpload={() => false} // Prevent automatic upload
					onChange={handleCoverImgChange}
				>
					<Button icon={<UploadOutlined />}>
						Upload Cover Image
					</Button>
				</Upload>
				<Divider />
				{/* Blog Content Editor */}
				<ReactQuill
					theme="snow"
					value={content}
					onChange={setContent}
					placeholder="Start writing your blog content..."
					style={{ height: "300px", marginBottom: "20px" }}
				/>
				<br />
				<br />
				Tags
				<Input
					onKeyDown={(event) => handleAddTag(event)}
					placeholder="Press Enter to add a tag"
				/>
				<div style={{ marginTop: "8px" }}>
					{tags.length > 0 &&
						tags.map((tag) => (
							<Tag
								key={tag}
								closable
								onClose={() => handleRemoveTag(tag)}
							>
								{tag}
							</Tag>
						))}
				</div>
				<br />
				{/* Submit Button */}
				<Button.Group>
					<Button size="large" onClick={() => handleSubmit(false)}>
						Save as Draft
					</Button>
					<Button
						type="primary"
						size="large"
						disabled={blog ? blog.active : false}
						onClick={() => handleSubmit(true)}
					>
						{blog && blog.active ? "published" : "Publish"}
					</Button>
				</Button.Group>
			</div>

			{/* Live Preview Section */}
			<div className="viewer">
				<Card
					title="Blog Preview"
					bordered={true}
					style={{ height: "100%" }}
				>
					<div>
						{/* Blog Title */}
						{name ? (
							<Title level={1}>{name}</Title>
						) : (
							<Title level={1}>Blog Title</Title>
						)}

						{/* Cover Image Preview */}
						{coverImgPreview && (
							<img
								src={coverImgPreview}
								alt="Cover Preview"
								style={{
									width: "100%",
									// maxHeight: "300px",
									objectFit: "cover",
									marginBottom: "20px",
								}}
							/>
						)}

						{/* Blog Content Preview */}
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</div>
				</Card>
			</div>
		</div>
	);
};

export default BlogEditor;
