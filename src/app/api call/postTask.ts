export const addTask = async (title: string, description: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      throw new Error("Failed to save task on server");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in addTask API call:", error);
    return null;
  }
};
