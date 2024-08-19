"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name={posts[0]?.creator.username}
      desc="Welcom to youe personalized profile page"
      data={posts}
    />
  );
};

export default OtherProfile;
