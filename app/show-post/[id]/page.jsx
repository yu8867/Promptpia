"use client";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import Image from "next/image";

const ShowPost = ({ params }: { params: { id: String } }) => {
  const [post, setPost] = useState({});
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/prompt/${params.id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [params.id]);

  const hundleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  console.log(post?.creator);

  return (
    <div className="border border-gray-300 rounded-lg bg-white/20 p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[720px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        {post?.creator ? (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post?.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div>
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post?.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post?.creator.email}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="copy_btn" onClick={hundleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        {post.tag}
      </p>
      <p className="font-inter text-sm mt-2 text-gray-500">
        {format(post.createdAt)}
      </p>
    </div>
  );
};

export default ShowPost;
