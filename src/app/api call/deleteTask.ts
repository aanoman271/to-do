export const deleteTask = async (id: string) => {
  try {
    const res = await fetch(`/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: { id: id },
      }),
    });

    if (!res.ok) {
      throw new Error("Database delete failed");
    }

    return true;
  } catch (error) {
    console.error("Error deleting task in API call:", error);
    return false;
  }
};
