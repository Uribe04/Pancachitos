import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProductComments, createComment, deleteComment } from "../../redux/thunks/commentsThunks";

interface CommentsProps {
  productId: string;
}

interface CommentData {
  id: string
  product_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
}

export default function CommentsSection({ productId }: CommentsProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const comments = useAppSelector((state) => state.comments.comments);
  const { loading, error } = useAppSelector((state) => state.comments);

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar comentarios del producto al montar
  // Cargar comentarios del producto al montar
  useEffect(() => {
    dispatch(fetchProductComments(productId) as any);
  }, [productId, dispatch]);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleAddComment = async () => {
    if (userComment.trim() === "" || userRating === 0) {
      alert("Please enter a comment and rating");
      return;
    }

    if (!currentUser?.id) {
      alert("You must be logged in to add a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await dispatch(
        createComment({
          productId,
          userId: currentUser.id,
          content: userComment,
          rating: userRating,
        }) as any
      );

      if (result.meta.requestStatus === "fulfilled") {
        setUserComment("");
        setUserRating(0);
        alert("Comment added successfully!");
      } else {
        alert(result.payload || "Error adding comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Error adding comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      const result = await dispatch(deleteComment(commentId) as any);

      if (result.meta.requestStatus === "fulfilled") {
        alert("Comment deleted successfully!");
      } else {
        alert(result.payload || "Error deleting comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Error deleting comment");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mt-8 max-w-3xl mx-auto w-full">
      <h3 className="text-xl font-bold mb-4 text-[#2870B8] text-center sm:text-left">
        Customer Reviews
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <p className="text-gray-700 font-medium text-center sm:text-left">
          Rate this product:
        </p>
        <div className="flex justify-center sm:justify-end text-[#2870B8] text-2xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {star <= (hoverRating || userRating) ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>

      <textarea
        value={userComment}
        onChange={(e) => setUserComment(e.target.value)}
        placeholder="Write your comment..."
        disabled={isSubmitting || !currentUser}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#2870B8] text-sm sm:text-base resize-none disabled:bg-gray-100"
      />
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={handleAddComment}
          disabled={isSubmitting || !currentUser || !userComment.trim() || userRating === 0}
          className="bg-[#2870B8] text-white px-5 py-2 rounded-lg hover:bg-[#1e5a93] transition text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Add Comment"}
        </button>
      </div>

      {!currentUser && (
        <p className="text-center text-red-500 mt-2 text-sm">
          Please log in to add comments
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-2 text-sm">
          Error loading comments: {error}
        </p>
      )}

      {comments.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {comments.map((comment: CommentData) => (
            <div
              key={comment.id}
              className="flex items-start gap-3 border-b border-gray-200 pb-4 last:border-none"
            >
              <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0 mt-1 flex items-center justify-center">
                <span className="text-sm text-white font-bold">U</span>
              </div>

              <div className="flex flex-col bg-[#FBEFD5] p-4 rounded-xl shadow-sm w-full max-w-[90%] sm:max-w-[95%]">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-[#2870B8] text-sm sm:text-base">
                    User #{comment.user_id.slice(0, 8)}
                  </p>

                  {currentUser?.id === comment.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-[#2870B8] text-xs sm:text-sm hover:text-[#11457a] transition"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <p className="text-gray-700 mb-2 text-sm sm:text-base wrap-break-word leading-relaxed">
                  {comment.content}
                </p>

                <div className="flex text-[#2870B8] text-lg sm:text-xl">
                  {"★".repeat(Math.max(0, Math.min(5, comment.rating)))}
                  {"☆".repeat(5 - Math.max(0, Math.min(5, comment.rating)))}
                </div>

                <p className="text-gray-400 text-xs mt-2">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4 text-center sm:text-left">
          {loading ? "Loading comments..." : "No comments yet."}
        </p>
      )}
    </div>
  );
}









