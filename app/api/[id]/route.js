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
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description } = body;

    if (!title && !description) {
      return NextResponse.json(
        { error: true, message: "No changes provided" },
        { status: 400 }
      );
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json(
        { error: true, message: "Topic not found" },
        { status: 404 }
      );
    }

    // Update only provided fields
    if (title) topic.title = title;
    if (description) topic.description = description;

    await topic.save();

    return NextResponse.json(
      { error: false, message: "Topic updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/topic error:", error);
    return NextResponse.json(
      { error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await ConnectionDB();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: true, message: "No ID Provided" },
        { status: 400 }
      );
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json(
        { error: true, message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: false, message: "Topic retrieved successfully", data: topic },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/topic error:", error);
    return NextResponse.json(
      { error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
