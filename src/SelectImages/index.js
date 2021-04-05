/**
 * This is the first page that loads and display all the uploaded images *
 */

import { Link } from "react-router-dom";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { fetchImages } from "../utils/fetchImages";
import React, { useState, useCallback, useEffect } from "react";
import { deleteExistingSelection } from "../utils/deleteExistingSelection";

function SelectImages() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showButton, setShowButton] = useState(false);

  /**
   *
   * Adds a selected image to the selection list.   *
   * @param {integer} index the index of the selected image in the items array
   * @return {Array} selectedItems[] the list of selected images with all their proerties
   *
   */
  const add = (index) => {
    if (isItemAlreadySelected(index) === true) {
      //remove from the selection list
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else if (selectedItems.length === 8) {
      //disable and proceed to sorting page
      window.scrollTo(0, 0);
      setSelectedItems((selectedItems) => [...selectedItems, items[index]]);
      setShowButton(true);
    } else {
      //add to the selection list
      setSelectedItems((selectedItems) => [...selectedItems, items[index]]);
    }
  };

  /**
   *
   * check for duplicate selection and remove them from array  *
   * @param {integer} index the index of the selected image in the items array
   * @return {boolean} returns if the check passed or failed
   *
   */
  const isItemAlreadySelected = (index) => {
    let existCheck;
    const getItemFromItemList = items[index];
    selectedItems.forEach((photoItem) => {
      return (existCheck = photoItem.id === getItemFromItemList.id);
    });
    return existCheck;
  };

  /**
   *
   * Renders a selectable image.   *
   * @param {object} { index, left, top, key, photo } required for the image selection
   * @return {React} returns a selectable React element that contains the image
   *
   */
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => {
      return (
        <SelectedImage
          key={key}
          margin={"2px"}
          index={index}
          photo={photo}
          left={left}
          top={top}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          add={add}
        />
      );
    },
    [selectedItems, setSelectedItems, add, items]
  );

  useEffect(() => {
    fetchImages().then((photoList) => {
      const photoArray = [];
      photoList.entries.forEach((element) => {
        // destructuring, and rename the object keys to be used by react-photo-gallery
        const { picture: src, ...rest } = element;
        photoArray.push({ src, width: 1, height: 1, ...rest });
      });

      return setItems(photoArray);
    });
    deleteExistingSelection();
  }, [selectedItems]);

  return (
    <div className="App">
      <h2 className="mx-auto">Choose 9 Photos to Generate a photogrid</h2>
      <h3>Click on any 9 photos to select</h3>
      {showButton && (
        <div className="button btn btn-primary">
          <Link
            to={{
              pathname: "/arrange-images",
              hash: "#selection",
              state: { selectedPhotos: selectedItems },
            }}
          >
            Now lets Sort the chosen images
          </Link>
        </div>
      )}
      <div className={showButton === true ? "hide" : "show"}>
        <Gallery photos={items} renderImage={imageRenderer} />
      </div>
    </div>
  );
}

export default SelectImages;
