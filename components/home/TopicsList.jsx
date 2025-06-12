"use client";

import { useState, useEffect } from "react";
import RemoveButton from "@/components/RemoveButton";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";

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
            <RemoveButton />
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
