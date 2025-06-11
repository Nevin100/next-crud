import React from "react";
import RemoveButton from "@/components/RemoveButton";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const TopicsList = () => {
  return (
    <>
      <div className=" border-1 border-slate-400 mt-2 px-3 py-3 flex justify-between items-start rounded-md gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl text-gray-800">Topics</h1>
          <p className="font-semibold text-lg text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
            repellendus incidunt sit culpa, molestias inventore dolore numquam
            rerum eius dolores voluptates sequi id fugit quae accusantium amet
            nobis nam. Labore rem corporis fugit sunt eos.
          </p>
        </div>

        <div className="flex gap-2">
          <RemoveButton />
          <Link href={"/edit-topic/123"}>
            <HiPencilAlt
              size={24}
              className="text-semibold text-green-500 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopicsList;
