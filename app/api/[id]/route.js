import { NextResponse } from "next/server";
import ConnectionDB from "@/lib/connection";
import Topic from "@/models/topics";

export async function PUT(request, { params }) {
  try {
    await ConnectionDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: true, message: "No ID Provided" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description } = body;

    if (!title && !description) {
      return NextResponse.json(
        { message: "No Change Provided", error: true },
        { status: 401 }
      );
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json(
        { message: "No Such Topic exist", error: true },
        { status: 401 }
      );
    }

    topic.description = description;
    topic.title = title;

    await topic.save();
    return NextResponse.json(
      { message: "Topic Updated Successfully", error: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: "Internal Server Issue" },
      { status: 500 }
    );
  }
}
