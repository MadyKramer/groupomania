
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


const CreatePost = ({ handleCreatePost, content, postimg, setContent, setPostImg, userfirstname }) => {
  //STATE

  //COMPORTEMENTS
  let postPossibility = null;
  if (!content && !postimg) {
    postPossibility = "";
  } else {
    postPossibility = (
      <input
        onClick={handleCreatePost}
        type="submit"
        value="Postez!"
        className="postBtn"
        aria-label="Envoyer"
      ></input>
    );
  }
  //RENDER
  return (
    <div>
      <section className="createPostContainer">
        <div className="createPostContent">
          <form
            action=""
            className="writeNews"
            onSubmit={handleCreatePost}
            id="createPostForm"
          
          >
       
            <label className="hidden" htmlFor="createPost">Ajout image</label>
            <input
              name="createPost"
              id="createPost"
              className="createPostInput"
              type="textarea"
              aria-label="Ecrivez votre contenu"
              placeholder={`Quoi de neuf ${userfirstname}?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></input>
            <div className="createPostOptions">
              <span>
                <input
                  type="file"
                  id="sendImg"
                  className="sendImg"
                  aria-label="envoyer une image"
                  onChange={(e) => setPostImg(e.target.files)}
                ></input>
                <label aria-hidden="true" htmlFor="sendImg" ><span className="hidden">.</span>
                  <FontAwesomeIcon
                    icon={faImage}
                    tabIndex="0"
                    className="createPostIcon"
                  />
                </label>
              </span>

              {postPossibility}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
