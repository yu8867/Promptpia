"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  // ユーザーのポストを取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  // ポストの編集処理
  const hundleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // ポストの削除処理
  const hundleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filterdPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterdPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcom to youe personalized profile page"
      data={posts}
      handleEdit={hundleEdit}
      handleDelete={hundleDelete}
    />
  );
};

export default MyProfile;
