/**
 *
 * Fetch the imagelist array from the database api
 * @param {} none
 * @return {array} returns an array of image objects
 *
 */
export const fetchSortedImages = () => {
  return fetch("http://localhost:3200/api/get-images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
