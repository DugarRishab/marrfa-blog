import React, { useState, useEffect } from 'react';
import BlogEditor from '../../components/Editor.jsx/Editor';

const CreateBlog = () => {
	return ( 
		<div className="create-blog" style={{width: '100%'}}>
			<BlogEditor></BlogEditor>
		</div>
	 );
}
 
export default CreateBlog;