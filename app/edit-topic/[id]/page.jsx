"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

const EditForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchTopic = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/${id}`);
        console.log("GET BY ID : ", res);
        const data = res.data.data;
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load topic.");
      }
    };

    fetchTopic();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.put(`http://localhost:3000/api/${id}`, {
        title,
        description,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Topic Updated Successfully",
          position: "top",
        });
        router.push("/");
      } else {
        setError("Failed to update topic.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire({
        icon: "error",
        title: "Topic Updation Unsuccessful",
        position: "top",
      });
      setError("Failed to update topic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[45vh] flex flex-col mt-5 p-3 border-2 rounded-md border-slate-400">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-4">
          <label htmlFor="title" className="mt-2 font-semibold text-xl mb-2">
            Title :
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="px-2 py-4 text-gray-700 bg-neutral-100 border-indigo-400 border outline-0 rounded-md w-full mt-2"
          />
        </div>

        <div className="flex flex-col p-4">
          <label
            htmlFor="description"
            className="mt-2 font-semibold text-xl mb-2"
          >
            Description :
          </label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="px-2 py-4 text-gray-700 bg-neutral-100 border-indigo-400 border outline-0 rounded-md w-full mt-2"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center font-normal">{error}</p>
        )}

        <div className="flex justify-center items-center px-2 py-1 mt-4 mx-2 mb-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 text-center text-white hover:bg-indigo-900 transition-colors ease-in-out font-medium text-2xl bg-indigo-400 rounded-md cursor-pointer"
          >
            {loading ? "Updating..." : "Update Topic"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
