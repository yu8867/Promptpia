import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 space-y-6 py-8 xl:columns-3 sm:columns-2 sm:gap-6">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)} // handleEditが渡されている場合
            handleDelete={() => handleDelete && handleDelete(post)} // handleDeleteが渡されている場合
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
