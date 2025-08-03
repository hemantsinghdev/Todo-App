const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#ff9800";
    case "in progress":
      return "#2196f3";
    case "completed":
      return "green";
    default:
      return "grey";
  }
};

export default getStatusColor;
