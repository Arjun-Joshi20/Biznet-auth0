import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Post from "./Post";

function Posts({ posts }) {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div>
      {realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              message={post.data().message}
              timestamp={post.data().timestamp}
              postImage={post.data().postImage}
            />
          ))
      }
    </div>
  );
}

export default Posts;