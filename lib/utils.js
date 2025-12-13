const calculateNextRevision = (level, lastRevisedDate) => {
  const date = new Date(lastRevisedDate);
  let daysToAdd = 1;
  if (level === 0) daysToAdd = 1;
  else if (level === 1) daysToAdd = 7;
  else if (level === 2) daysToAdd = 30;
  else daysToAdd = 60;
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
};
const formatDate = (isoString) => {
  if (!isoString) return "Never";
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
};
export {
  calculateNextRevision,
  formatDate
};
