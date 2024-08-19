"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

interface session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession()!;
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    // session が null でないことを確認
    if (!session || !session.user) {
      console.error("No session or user found");
      setSubmitting(false);
      return;
    }
    const user = session?.user as { id: string } & typeof session.user;

    try {
      if (user?.id) {
        const response = await fetch(`/api/prompt/new`, {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
            prompt: post.prompt,
            tag: post.tag,
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
