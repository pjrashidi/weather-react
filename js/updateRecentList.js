export function updateRecentList (RecentList, newGeocode, callback) {
  const newSearch = newGeocode[0].formatted_address
  if (RecentList.includes(newSearch)) {
    RecentList.splice(RecentList.indexOf(newSearch), 1)
  }
  RecentList.unshift(newSearch)
  if (RecentList.length > 5) { RecentList.pop() }
  callback(RecentList)
}
