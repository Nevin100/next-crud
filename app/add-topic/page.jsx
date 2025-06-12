"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title Field Can't be Empty");
    }

    if (!description) {
      setError("Description Field Cant't be Empty");
    }

    setError("");

    try {
      const response = await axios.post(`http://localhost:3000/api`, {
        title: title,
        description: description,
      });
      if (response) {
        Swal.fire({
          title: "Topic Created SuccessFully!",
          position: "top",
          icon: "success",
        });
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Internal Server Issue...",
      });
    }
  };

  return (
    <>
      <div className="min-h-[35vh] flex flex-col mt-5 p-3 border-2 rounded-md border-slate-400">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <label htmlFor="title" className="mt-2 font-semibold text-xl mb-2 ">
              Title :
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 py-4 text-gray-700 bg-neutral-100 border-indigo-400 border-1 outline-0 rounded-md  w-full mt-2"
            />
          </div>

          <div className="flex flex-col p-4">
            <label
              htmlFor="description"
              className="mt-2 font-semibold text-xl mb-2 "
            >
              Description :
            </label>
            <textarea
              id="description"
              type="text"
              rows={5}
              cols={14}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="px-2 py-4 text-gray-700 bg-neutral-100 border-indigo-400 outline-0 border-1 rounded-md  w-full mt-2"
            />
          </div>

          {error ? (
            <p className="text-red-500 text-md py-0.5 px-2 text-center font-normal">
              {error}
            </p>
          ) : (
            <></>
          )}
          <div className="flex justify-center items-center px-2 py-1 mt-4 mx-2 mb-5">
            <button
              type="submit"
              className="w-full p-4 text-center text-white hover:bg-indigo-900 transition-colors ease-in-out font-medium text-2xl bg-indigo-400 rounded-md cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTopic;
