"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../lib/features/postListSlice";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SearchIcon from "@mui/icons-material/Search";
import truncate from "../components/UI/Truncate";
import { Button, TextField } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeletePostDialog from "./DeletePostDialog";
import { deletePostById } from "../../lib/features/deletePostSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postList.posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();

    // Post metni içinde arama
    const textMatch = post.text.toLowerCase().includes(lowerCasedSearchTerm);

    // İsim içinde arama
    const nameMatch =
      post.owner.firstName.toLowerCase().includes(lowerCasedSearchTerm) ||
      post.owner.lastName.toLowerCase().includes(lowerCasedSearchTerm);

    // Etiketler içinde arama
    const tagsMatch = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerCasedSearchTerm)
    );

    return textMatch || nameMatch || tagsMatch;
  });

  //random renkler için
  const tagColorMap = {
    snow: "bg-red-500",
    ice: "bg-yellow-400",
    mountain: "bg-blue-500",
    dog: "bg-pink-500",
    human: "bg-purple-500",
    animal: "bg-orange-500",
    canine: "bg-indigo-500",
    "golden-retriever": "bg-teal-500",
    grey: "bg-gray-500",
    puppy: "bg-amber-500",
    pet: "bg-cyan-500",
    mammal: "bg-green-500",
  };
  const getTagColorClass = (tag) => {
    return tagColorMap[tag] || "bg-gray-200";
  };

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedPostId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      await dispatch(deletePostById(selectedPostId));
      dispatch(fetchPosts());
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Post silinirken bir hata oluştu:", error);
    }
    handleDeleteDialogClose();
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex  gap-x-5 justify-center items-center w-1/2 mx-auto">
        <TextField
          label="Arama Yap"
          variant="outlined"
          fullWidth
          className=" w-3/4 my-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="action" sx={{ marginRight: 1 }} />,
          }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3468C0",
            color: "success",
            height: "50px",
          }}
          endIcon={<PostAddIcon />}
        >
          Ekle
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className=" flex flex-col justify-between  border p-4 rounded shadow group relative cursor-pointer "
          >
            <Image
              src={post.image}
              alt={post.text}
              className="w-full h-40 object-cover mb-4"
              width={300}
              height={300}
            />
            <p className=" text-lg font-bold mb-2 ">
              {truncate(post.text, 25)}
            </p>
            <div className="flex items-center gap-x-2 py-2 border-b-2">
              <Image
                src={post.owner.picture}
                width={40}
                height={40}
                alt={post.owner.picture}
                className="rounded-full"
              />
              <p className="text-gray-500">
                {post.owner.firstName} {post.owner.lastName}
              </p>
            </div>
            <div>
              {post.tags.map((tag, index) => (
                <p
                  key={index}
                  className={` text-black font-bold inline-block p-1 rounded my-2 mr-2 ${getTagColorClass(
                    tag
                  )}`}
                >
                  {tag}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500">
                {new Date(post.publishDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 flex items-center gap-x-2">
                <ThumbUpIcon
                  sx={{
                    color: " #3468C0",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                  }}
                />{" "}
                {post.likes}
              </p>
            </div>
            <div className="bg-gray-100 shadow-lg shadow-indigo-500/40 p-2 rounded-full absolute top-2 -right-2 hidden group-hover:block">
              <DeleteIcon
                onClick={() => handleDeleteClick(post.id)}
                sx={{
                  color: "red",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
              ></DeleteIcon>
              <EditIcon
                sx={{
                  color: "blue",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
              ></EditIcon>
            </div>
          </div>
        ))}
        <DeletePostDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          onDelete={handleDeletePost}
        />
      </div>
    </div>
  );
};

export default PostList;
