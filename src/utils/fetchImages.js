/**
 *
 * Fetch the imagelist array from the image api
 * @param {} none
 * @return {array} returns an array of image objects
 *
 */
export const fetchImages = () => {
  return fetch(
    "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};
