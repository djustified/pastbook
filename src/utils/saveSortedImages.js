/**
 *
 * sends the chosen images to the save api for storing*
 * @param {array} selectedPhotos the selected and sorted photo array
 * @return {Array} returns the last stored image array sorted
 *
 */
export const saveSortedImages = (items) => {
  return fetch("http://localhost:3200/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  }).then((response) => response.json());
};
