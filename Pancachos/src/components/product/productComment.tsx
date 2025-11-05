import React from "react";

interface Comment {
  icon: string;
  username: string;
  comment: string;
  rating: number;
}

export default function CommentsSection({ comments }: { comments: Comment[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={index}
            className="flex gap-4 border-b border-gray-200 py-4 last:border-none"
          >
            {/* Icono del usuario */}
            <div className="text-3xl">{comment.icon}</div>

            {/* Contenido */}
            <div className="flex flex-col">
              <p className="font-semibold">{comment.username}</p>
              <p className="text-gray-700 mb-2">{comment.comment}</p>

              {/* Rating con estrellas */}
              <div className="flex text-yellow-500 text-lg">
                {"★".repeat(comment.rating)}
                {"☆".repeat(5 - comment.rating)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No comments yet.</p>
      )}
    </div>
  );
}
