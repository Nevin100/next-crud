"use client";

import { useState, useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { HiOutlineTrash } from "react-icons/hi";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api`);
      if (response) {
        setTopics(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  const deleteTopic = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This topic will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/${id}`);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Successfully Deleted",
            position: "top",
            timer: 1500,
            showConfirmButton: false,
          });
          getTopics(); // Refresh list
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Internal Server Issue",
          position: "top",
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-slate-700 px-2 py-4">
        Topics
      </h1>
      {topics.map((topic, index) => (
        <div
          key={index}
          className="border border-slate-400 mt-2 px-3 py-3 flex justify-between items-start rounded-md gap-4"
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-gray-800">{topic.title}</h1>
            <p className="font-semibold text-lg text-gray-600">
              {topic.description}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="text-red-500 text-semibold cursor-pointer"
              onClick={() => deleteTopic(topic._id)}
            >
              <HiOutlineTrash size={24} />
            </button>
            <Link href={`/edit-topic/${topic._id}`}>
              <HiPencilAlt
                size={24}
                className="text-semibold text-green-500 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
