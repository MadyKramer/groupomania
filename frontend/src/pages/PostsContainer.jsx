import { useEffect, useState } from "react";
import UserComponent from "../components/UserComponent";
import axios from "axios";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import whitelogo from "./../assets/icon-left-font-monochrome-white.png";
import { toast } from "react-toastify";
import React from "react";
import { getDatas } from "../utils/getDatas";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PostsContainer = () => {
  //STATES
  const [postList, setPostList] = useState([]);
  const [postimg, setPostImg] = useState("");
  const [content, setContent] = useState("");
  const {user} = useAuthContext();

  //COMPORTEMENT
  // let token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => getDatas(setPostList, navigate), [navigate]);

  // const userInfos = decodeToken(token)
  // const {userId, perm}=userInfos
  // const {lastname, firstname, workstation} = userInfos.username

  const handleCreatePost = (e) => {
    e.preventDefault();

    let postCreate = { content, postimg };

    if (postimg.length > 0) {
      postCreate = new FormData();
      postCreate.append("image", postimg[0]);
      postCreate.append("content", content);
      
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, postCreate, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        
        setContent("");
        setPostImg("");
        getDatas(setPostList);
        toast.success("Votre poste est bien publié!");
      })
      .catch((err) => {
        toast.error("On dirait qu'il y a une erreur");
      });
  };

  //RENDER
  return (
    <div>
      <div className="bigContainer">
        <UserComponent/>
        <img src={whitelogo} alt="white logo" className="whiteLogo" />
        <main className="mainWrapper">
          <CreatePost
            handleCreatePost={handleCreatePost}
            content={content}
            postimg={postimg}
            setContent={setContent}
            setPostImg={setPostImg}
            userfirstname={user.firstname}
          />
          {postList.length > 0 &&
            postList
              .sort((a, b) => (a.postdate > b.postdate ? -1 : 1))
              .map((post, indexPost) => (
                <Post
                  post={post}
                  key={post.id}
                  indexPost={indexPost}
                  idUser={user.id}
                  isAdmin={user.hasRight}
                  className="index"
                  setPostList={setPostList}
                />
              ))}
        </main>
      </div>
    </div>
  );
};

export default PostsContainer;
