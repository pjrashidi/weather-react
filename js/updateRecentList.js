export function updateRecentList (RecentList, newGeocode, callback) {
  const newSearch = newGeocode[0].formatted_address
  RecentList.unshift(newSearch)
  if (RecentList.length > 5) { RecentList.pop() }
  callback(RecentList)
}
