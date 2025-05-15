export function applyFilters(
  groups,
  { search = "", subject = "all", sort = "newest" }
) {
  if (!groups || !Array.isArray(groups)) return [];

  let filtered = groups.filter((group) => {
    const searchLower = search.toLowerCase();
    return (
      group.name.toLowerCase().includes(searchLower) ||
      (group.description &&
        group.description.toLowerCase().includes(searchLower))
    );
  });

  if (subject !== "all") {
    filtered = filtered.filter(
      (group) =>
        group.subject && group.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  // Sort the results
  return filtered.sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.created) - new Date(a.created);
      case "oldest":
        return new Date(a.created) - new Date(b.created);
      case "most":
        return b.members - a.members;
      case "fewest":
        return a.members - b.members;
      default:
        return 0;
    }
  });
}
