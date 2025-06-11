// app/api/topics/route.ts or route.js depending on your setup
import ConnectionDB from "@/lib/connection";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Establish DB connection
    await ConnectionDB();

    // Parse the JSON body from the request
    const body = await request.json();
    const { title, description } = body;

    // Validate input (optional but recommended)
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Create and save the new topic
    const newTopic = new Topic({ title, description });
    await newTopic.save();

    return NextResponse.json(
      { message: "Topic Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/topics error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
