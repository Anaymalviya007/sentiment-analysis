import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentsList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="bg-gray-900 p-8">
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-gray-800 rounded-md p-4 mb-4">
          <h1 className="text-gray-400 text-lg font-bold mb-2">Comments Box</h1>
          {comments.map((comment, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-gray-500 text-base font-semibold mb-1">
                {comment.name}
              </h2>
              <div className="bg-gray-700 rounded-md p-2">
                <p className="text-white text-sm">{comment.message}</p>
              </div>
              <div className="flex items-center mt-1 text-gray-400 text-xs">
                <span className="mr-2">Mood:</span>
                <span
                  style={{
                    color:
                      comment.mood === "Positive"
                        ? "#38a169"
                        : comment.mood === "Negative"
                        ? "#e53e3e"
                        : "#d69e2e",
                  }}
                >
                  {comment.mood}
                </span>
                {/* <span className="ml-4 mr-2">Sentiment:</span>
                <span className="text-blue-500">{comment.sentiment}</span> */}
              </div>
              <div className="mt-2 border-b border-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsList;
