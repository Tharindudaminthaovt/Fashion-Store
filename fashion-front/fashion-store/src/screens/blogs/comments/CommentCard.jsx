import React from "react";
import CommenterIcon from "../../../assets/commenter.png";
import { formatYearMonth } from "../../../util/datefunctions";
import PostAComment from "./PostAComment";
import { useSelector } from "react-redux";

const CommentCard = ({ comments }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user?.username);
  // console.log(comments);

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {comments.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments...</h3>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img src={CommenterIcon} alt="" className="h-14" />
                    <div className="space-y-1">
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {comment.user.username}
                      </p>
                      <p className="text-[12px] italic">
                        {formatYearMonth(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* comment details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium">No comments found!</div>
        )}
      </div>

      {/* add comment section */}
      <PostAComment />
    </div>
  );
};

export default CommentCard;
