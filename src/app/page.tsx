"use client";

import React, { useEffect, useState } from "react";
import { getAllTask } from "./api call/getAllTask";
import { updateStatus } from "./api call/updateStatus";
import { deleteTask } from "./api call/deleteTask";
import { addTask } from "./api call/postTask";
import { Task } from "@/types/task";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleStatusChange = async (id: string, newStatus: Task["status"]) => {
    const originalTasks = [...tasks];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task,
      ),
    );

    const success = await updateStatus(id, newStatus);

    if (success) {
      alert(`Task status changed to: ${newStatus}`);
    } else {
      setTasks(originalTasks);
      alert("Failed to update status on server. Rolled back!");
    }
  };
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const target = e.target as typeof e.currentTarget & {
      title: { value: string };
      description: { value: string };
    };

    const title = target.title.value;
    const description = target.description.value;

    if (!title) return;

    const savedTaskFromServer = await addTask(title, description);

    if (savedTaskFromServer) {
      setTasks([savedTaskFromServer, ...tasks]);

      form.reset();
      setIsOpen(false);
    } else {
      alert("Failed to add task on server!");
    }
  };
  const handleDeleteTask = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const filterdTasks = tasks.filter((task) => task._id !== id);
      setTasks(filterdTasks);
      await deleteTask(id);
    }
  };
  useEffect(() => {
    const loadTasks = async () => {
      const data = await getAllTask();
      setTasks(data);
    };
    loadTasks();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center">
      {/* Add Task Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm px-5 py-2.5 rounded-lg cursor-pointer mb-8"
      >
        + Add Task
      </button>

      {/* Task Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-white font-bold text-sm">{task.title}</h3>

                {/* Dropdown Action */}
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(
                      task._id,
                      e.target.value as Task["status"],
                    )
                  }
                  className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 rounded px-2 py-1 cursor-pointer focus:outline-none"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <p className="text-zinc-400 text-xs">{task.description}</p>
            </div>

            {/* Footer: Status & Delete Button */}
            <div className="flex items-center justify-between mt-4 border-t border-zinc-800 pt-2">
              <div className="text-[10px] uppercase font-mono text-zinc-500">
                Status: <span className="text-indigo-400">{task.status}</span>
              </div>

              {/* 🗑️ ডিলিট বাটন */}
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="text-[10px] font-mono text-red-500 hover:text-red-400 uppercase tracking-wider cursor-pointer transition-colors px-1.5 py-0.5 rounded hover:bg-red-500/10"
              >
                [Delete]
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-base">New Task</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={3}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm py-2 rounded cursor-pointer"
              >
                Save Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
