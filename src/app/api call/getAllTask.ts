export const getAllTask = async () => {
  try {
    const res = await fetch("/api/tasks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading tasks: ", error);
    return [];
  }
};
