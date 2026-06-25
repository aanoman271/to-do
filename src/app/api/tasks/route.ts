import connectDB from "@/app/lib/db";
import { Task } from "@/app/model/taskModel";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 },
      );
    }

    const newTask = new Task({ title, description });
    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Database connection failed: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
  }
};
