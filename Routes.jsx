import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BlogsPage from "./src/pages/BlogsPage/BlogsPage";
import BlogEditor from "./src/components/Editor.jsx/Editor";
import CreateBlog from "./src/pages/CreateBlog/CreateBlog";
import EditBlogPage from "./src/pages/EditBlog/EditBlog";



const PageRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
		<Routes>
			<Route exact path="/" element={<BlogsPage />}></Route>
			<Route exact path="/create" element={<CreateBlog />}></Route>
			<Route exact path="/edit/:id" element={<EditBlogPage></EditBlogPage>}></Route>
		</Routes>
	);
};

export default PageRoutes;
