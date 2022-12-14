
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faImage,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import CommentsContainer from "./CommentsContainer";
import axios from "axios";
import { toast } from 'react-toastify'
import EditPost from "./EditPost";
import { getDatas } from "../utils/getDatas";
import {useAuthContext} from "../hooks/useAuthContext"

const Post = ({ post, setPostList, idUser, isAdmin }) => {
  //destructuring pour arriver directement à l'entrée de l'obj == props.post

  //STATE
  const [displayModale, setDisplayModale] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [like, setLike] = useState(false);
  const [isLiked, setisLiked] = useState(post.likeit);
  const [commentcontent, setCommentContent] = useState("");
  const {user} = useAuthContext();


  //COMPORTEMENT
  const formatter = buildFormatter(frenchStrings);
  const imgUrl = `${process.env.REACT_APP_API_URL}${post.postimg}`;


  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleDeletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        getDatas(setPostList)
        toast.success('Poste supprimé! 😁')

      })
      .catch((err) => {
        toast.error("Oups, quelque chose s'est mal passé! 🤔")
      });
  };

  const sendComment = (e) => {
    let body = {
      userId: user.id,
      post_id: post.id,
      commentcontent: commentcontent,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/posts/${post.id}/comments`,
        body,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        getDatas(setPostList)
        toast.success('Commentaire posté 😁')
      })
      .catch((err) => {
        toast.error("Une erreur est survenue")
      });
  };

  const handleLike = (e) => {
    let likeValue = like ? 0 : 1;
    setLike(!like);
    setisLiked((current) => !current);
  
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/posts/${post.id}/like`,
        {
          value: likeValue,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        console.log(likeValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let handleBtn = null;
  if (user.hasright === 1 || user.id === post.users_id) {
    handleBtn = (
      <div className="handlePostIcons">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="handlePost"
          tabIndex="0"
          aria-label="modification du poste"
          onClick={() => setDisplayModale(true)}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          tabIndex="0"
          className="handlePost"
          aria-label="Supprimer le poste"
          onClick={handleDeletePost}
        />
      </div>
    );
  } else {
    handleBtn = "";
  }

  let commentPossibility=null;
  if (!commentcontent){
    commentPossibility="";
  }else{
    commentPossibility= <button
    className="commentButton"
    aria-label="envoyer le commentaire"
    onClick={sendComment}
  >
    Envoyer
  </button>
  }
  //RENDER
  return (
    <section className="post">
      <div className="postHeader">
        <div className="userInfos">
          <p tabIndex="0">
            {post.firstname} {post.lastname}
          </p>
          <p className="workstationHeader" tabIndex="0">
            {post.workstation}
          </p>
        </div>
        <div className="postDate">
          <TimeAgo
            date={post.postdate}
            formatter={formatter}
            tabIndex="0"
            aria-label="date de publication"
          />
        </div>
      </div>
      <div className="contentContainer">
        <div className="postContent">
          {handleBtn}
          {imgUrl !== "http://localhost:4500/null" && (
            <img src={imgUrl} alt="" />
          )}
          <p>{post.content}</p>
          {displayModale && (
            <EditPost data={post} closeModale={setDisplayModale} />
          )}
        </div>
        <div className="postReacts">
          <FontAwesomeIcon
            icon={faMessage}
            className="postIcons"
            tabIndex="0"
            aria-label="Ouvrir la section commentaires"
            onClick={handleComment}
          />
          <FontAwesomeIcon
            icon={faThumbsUp}
            aria-label="Liker la publication"
            tabIndex="0"
            className={isLiked ? "isLiked" : "postIcons"}
            onClick={handleLike}
          />
        </div>
        <div className="writeComment">
          <input
            className="writeCommentInput"
            aria-label="Ajouter un commentaire"
            tabIndex="0"
            placeholder="Ajouter un commentaire..."
            onChange={(e) => setCommentContent(e.target.value)}
          ></input>
         {commentPossibility}
        </div>
      </div>
      {showComments && <CommentsContainer post={post} setPostList={setPostList} idUser={idUser} isAdmin={isAdmin}/>}
    </section>
  );
};

export default Post;
