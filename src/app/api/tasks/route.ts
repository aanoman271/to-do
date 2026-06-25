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
    // ⚠️ এই ক্যাচ ব্লকটা ফিক্স করা হয়েছে যেন সার্ভার ক্র্যাশ না করে প্রপার রেসপন্স যায়
    if (error instanceof Error) {
      console.error(`Database connection failed: ${error.message}`);
      return NextResponse.json({ message: error.message }, { status: 500 }); // 👈 এই রিটার্নটা মিসিং ছিল
    }

    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 },
    );
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

// detete
export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const id = body.params?.id;
    if (!id) {
      return NextResponse.json(
        { message: "task id not found" },
        { status: 400 },
      );
    }
    const deteledTask = await Task.findByIdAndDelete(id);
    if (!deteledTask) {
      return NextResponse.json(
        { message: "deleted task not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Task deleted successfully", task: deteledTask },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Task deletion failed: ${error.message}`);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
};
