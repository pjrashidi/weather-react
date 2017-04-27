export function updateRecentList (currentRecentList, newSearch, callback) => {
  const newRecentList = currentRecentList.push(newSearch)
  if (newRecentList.length > 5) {newRecentList.pop()}
  callback(newRecentList)
}
