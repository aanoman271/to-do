export const updateStatus = async (id: string, newStatus: string) => {
  try {
    const res = await fetch(`/api/tasks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        params: { id: id },
        status: newStatus,
      }),
    });

    if (!res.ok) {
      throw new Error("Database update failed");
    }

    return true;
  } catch (error) {
    console.error("Error updating status in API call:", error);
    return false;
  }
};
