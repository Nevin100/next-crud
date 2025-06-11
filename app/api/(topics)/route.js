import ConnectionDB from "@/lib/connection";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

//Post :
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

//Get Request :
export async function GET(request) {
  try {
    await ConnectionDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      const topics = await Topic.find();
      if (!topics || topics.length == 0) {
        return NextResponse.json({ error: "No topics Exist" }, { status: 500 });
      }

      return NextResponse.json(
        { message: "Topics Fetched Successully", data: topics, error: false },
        { status: 200 }
      );
    } else {
      const topic = await Topic.findById(id);
      if (!topic) {
        return NextResponse.json(
          { message: "No Such Topic exists", error: true },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Topic Retieved Successfully", error: false, data: topic },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Issue" },
      { status: 500 }
    );
  }
}

//Delete :
export async function DELETE(request) {
  try {
    await ConnectionDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "No Id recieved", error: true },
        { status: 500 }
      );
    }

    const deletedtopic = await Topic.findByIdAndDelete(id);
    if (!deletedtopic) {
      return NextResponse.json(
        { message: "No such Topic exists", error: true },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Topic deleted Successfully", error: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Issue", error: error },
      { status: 500 }
    );
  }
}

//Put :
export async function PUT(request) {
  try {
    await ConnectionDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "No Id recieved", error: true },
        { status: 500 }
      );
    }

    if (id) {
      const body = await request.json();
      const { title, description } = body;

      if (!title && !description) {
        return NextResponse.json(
          { message: "No Change Provided", error: true },
          { status: 500 }
        );
      }

      const updateTopic = await Topic.findById(id);
      if (!updateTopic) {
        return NextResponse.json(
          { message: "No Such topic exists", error: true },
          { status: 500 }
        );
      }

      updateTopic.title = title;

      updateTopic.description = description;

      await updateTopic.save();

      return NextResponse.json(
        { message: "Updated Successfully", error: false, data: updateTopic },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Issue", error: true },
      { status: 500 }
    );
  }
}
