import { useState } from "react";

interface Comment {
  icon: string;
  username: string;
  comment: string;
  rating: number;
}

export default function CommentsSection({ comments }: { comments: Comment[] }) {
  
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8 max-w-4xl mx-auto w-full">
    
      <h3 className="text-xl font-bold mb-4 text-[#2870B8]">Customer Reviews</h3>

      {/* Sección para que el usuario califique */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <p className="text-gray-700 font-medium mb-2 sm:mb-0">
          Rate this product:
        </p>

        {/* Estrellas interactivas */}
        <div className="flex text-[#2870B8] text-2xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)} // cuando da clic, guarda el valor
              onMouseEnter={() => setHoverRating(star)} // muestra el efecto hover
              onMouseLeave={() => setHoverRating(0)} // quita el efecto hover
            >
              {star <= (hoverRating || userRating) ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>

     
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={index}
            className="flex gap-4 border-b border-gray-200 py-4 last:border-none"
          >
           
            <img
              src="/images/IconUser.png"
              alt="User Icon"
              className="w-7 h-7 rounded-full object-cover"
            />

            
            {/* Contenido del comentario */}
            <div className="flex flex-col bg-[#FBEFD5] p-4 rounded-xl shadow-sm w-full">
            <p className="font-semibold text-[#2870B8] mb-1">{comment.username}</p>
            <p className="text-gray-700 mb-2">{comment.comment}</p>

            {/* Rating con estrellas */}
            <div className="flex text-[#2870B8] text-lg">
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

