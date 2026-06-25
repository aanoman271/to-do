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
export const GET = async () => {
  try {
    await connectDB();
    const allTasks = await Task.find().sort({ updatedAt: -1 });
    return NextResponse.json(allTasks, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Database connection failed: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
  }
};
export const PATCH = async (req: Request) => {
  try {
    await connectDB();

    const body = await req.json();
    const { params, status } = body;
    if (!params?.id || !status) {
      return NextResponse.json(
        { message: "do not change task status" },
        { status: 400 },
      );
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: params.id },
      { status: status },
      { new: true },
    );
    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Status update failed: ${error.message}`);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 },
    );
  }
};
