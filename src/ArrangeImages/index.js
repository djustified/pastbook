/**
 * The page  where the user sorts the chosen images *
 */

import React from "react";
import arrayMove from "array-move";
import SortedPhoto from "./SortedPhoto";
import Gallery from "react-photo-gallery";
import { useLocation, Link } from "react-router-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortablePhoto = SortableElement((item) => <SortedPhoto {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

function ArrangeImages() {
  const {
    state: { selectedPhotos },
  } = useLocation();

  const [items, setItems] = React.useState(selectedPhotos);
  console.log("items: ", items);

  /**
   *
   * moves the index of the location according to provided sort indices*
   * @param {object} {oldIndex, newIndex } the old and new indices of the selected image in the items array
   * @return {Array} items[] updates the exising item object with the new indices
   *
   */
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  /**
   *
   * Fetch the imagelist array from the database api
   * @param {} none
   * @return {array} returns an array of image objects
   *
   */
  const fetchImages = () => {
    return fetch("http://localhost:3200/api/get-images", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };

  React.useEffect(() => {
    fetchImages().then((photoList) => {
      return setItems(photoList);
    });
  }, []);

  /**
   *
   * sends the chosen images to the save api for storing*
   * @param {array} selectedPhotos the selected and sorted photo array
   * @return {Array} returns the last stored image array sorted
   *
   */
  const saveImages = () => {
    return fetch("http://localhost:3200/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    }).then((response) => response.json());
  };

  return (
    <div className="App">
      <div>
        <h2 className="mx-auto">This is your Photo Grid</h2>
        <h3>Drag photos to Rearrange as you wish</h3>

        <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        <div className=" button-save btn btn-primary">
          <button type="button" onClick={saveImages}>
            Save sorted images
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArrangeImages;
