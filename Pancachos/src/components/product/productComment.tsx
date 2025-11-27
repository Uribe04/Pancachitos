import { useState, useEffect } from "react";

interface Comment {
  icon?: string;
  username: string;
  comment: string;
  rating: number;
}

interface CommentsProps {
  comments: Comment[];
  productId: number;
}

export default function CommentsSection({ comments, productId }: CommentsProps) {
  const DEFAULT_ICON = "/images/IconUser.png";
  const STORAGE_KEY = `userComments_${productId}`;

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);

  // Cargar comentarios iniciales + los guardados
  useEffect(() => {
    const originalsWithIcon = comments.map((c) => ({
      ...c,
      icon: c.icon && c.icon.length > 0 ? c.icon : DEFAULT_ICON,
    }));

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const userComments: Comment[] = JSON.parse(saved);
        const userCommentsWithIcon = userComments.map((c) => ({
          ...c,
          icon: c.icon && c.icon.length > 0 ? c.icon : DEFAULT_ICON,
        }));
        setAllComments([...originalsWithIcon, ...userCommentsWithIcon]);
      } catch (error) {
        console.error("Error al cargar comentarios del localStorage:", error);
        setAllComments(originalsWithIcon);
      }
    } else {
      setAllComments(originalsWithIcon);
    }
  }, [comments, productId]);

  const saveUserComments = (userComments: Comment[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userComments));
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleAddComment = () => {
    if (userComment.trim() === "" || userRating === 0) return;

    const newComment: Comment = {
      icon: DEFAULT_ICON,
      username: "You",
      comment: userComment,
      rating: userRating,
    };

    const updatedComments = [...allComments, newComment];
    setAllComments(updatedComments);

    const onlyUserComments = updatedComments.filter((c) => c.username === "You");
    saveUserComments(onlyUserComments);

    setUserComment("");
    setUserRating(0);
  };

  const handleDeleteComment = (index: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    const updated = allComments.filter((_, i) => i !== index);
    setAllComments(updated);

    const onlyUserComments = updated.filter((c) => c.username === "You");
    saveUserComments(onlyUserComments);
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
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#2870B8] text-sm sm:text-base resize-none"
      />
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={handleAddComment}
          className="bg-[#2870B8] text-white px-5 py-2 rounded-lg hover:bg-[#1e5a93] transition text-sm sm:text-base"
        >
          Add Comment
        </button>
      </div>

      {allComments.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {allComments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-gray-200 pb-4 last:border-none"
            >
              <img
                src={DEFAULT_ICON}
                alt="User Icon"
                className="w-9 h-9 rounded-full object-cover shrink-0 mt-1"
              />

              <div className="flex flex-col bg-[#FBEFD5] p-4 rounded-xl shadow-sm w-full max-w-[90%] sm:max-w-[95%]">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-[#2870B8] text-sm sm:text-base">
                    {comment.username}
                  </p>

                  {comment.username === "You" && (
                    <button
                      onClick={() => handleDeleteComment(index)}
                      className="text-[#2870B8] text-xs sm:text-sm hover:text-[#11457a] transition"
                    >
                      Delete Comment
                    </button>
                  )}
                </div>

                <p className="text-gray-700 mb-2 text-sm sm:text-base wrap-break-word leading-relaxed">
                  {comment.comment}
                </p>

                <div className="flex text-[#2870B8] text-lg sm:text-xl">
                  {"★".repeat(Math.max(0, Math.min(5, comment.rating)))}
                  {"☆".repeat(5 - Math.max(0, Math.min(5, comment.rating)))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4 text-center sm:text-left">
          No comments yet.
        </p>
      )}
    </div>
  );
}









