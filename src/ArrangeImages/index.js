/**
 * The page  where the user sorts the chosen images *
 */

import React from "react";
import arrayMove from "array-move";
import SortedPhoto from "./SortedPhoto";
import Gallery from "react-photo-gallery";
import { useLocation } from "react-router-dom";
import { saveSortedImages } from "../utils/saveSortedImages";
import { fetchSortedImages } from "../utils/fetchSortedImages";
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

  React.useEffect(() => {
    fetchSortedImages().then((photoList) => {
      return setItems(photoList);
    });
  }, []);

  return (
    <div className="App">
      <div>
        <h2 className="mx-auto">This is your Photo Grid</h2>
        <h3>Drag photos to Rearrange as you wish</h3>

        <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        <div className=" button-save btn btn-primary">
          <button type="button" onClick={() => saveSortedImages(items)}>
            Save sorted images
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArrangeImages;
