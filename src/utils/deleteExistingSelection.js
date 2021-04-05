/**
 *
 * Delete any previously saved image sort selction so a user can start fresh
 * @return {String} "Ok. deleted all" if success
 * @return {String} "Something went wrong!" if there was an generic error
 * @return {String} "Something broke!" if there was a server error
 *
 */
export const deleteExistingSelection = () => {
  return fetch("http://localhost:3200/api/delete-images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
