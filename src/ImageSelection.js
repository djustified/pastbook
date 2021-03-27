import "./App.css";
import Gallery from "react-photo-gallery";
import React, { useState, useCallback, useEffect } from "react";
import SelectedImage from "./SelectedImage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function ImageSelection() {
  const [items, setItems] = useState([]);
  // console.log("items: ", items);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log("selectedItemsState: ", selectedItems);
  const [showButton, setShowButton] = useState(false);

  const add = (index) => {
    console.log("add index: ", index);
    console.log("selectedItems:25 ", selectedItems);
    if (selectedItems.includes(index)) {
      //remove
      console.log("remove: ");
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else if (selectedItems.length === 8) {
      console.log("selectedItems.length === 8: ");
      console.log("LIMIT REACHED");
      setSelectedItems((selectedItems) => [...selectedItems, items[index]]);
      setShowButton(true);
    } else {
      // debugger;
      console.log("else: ");
      console.log("items[index]", items[index]);
      setSelectedItems((selectedItems) => [...selectedItems, items[index]]);
    }
  };

  const remove = (index) => {
    console.log("removeindex: ", index);
    const item = selectedItems.indexOf(index);
    setSelectedItems(selectedItems.splice(item, 1));
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => {
      // setSelectedItems(selectedItems);
      // console.log("selectedItems: cbk", selectedItems);
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
          remove={remove}
        />
      );
    },
    [selectedItems, setSelectedItems, add, items]
  );

  const fetchImages = () => {
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
    // setSelectedItems(selectedItems);
  }, [selectedItems]);

  const showArray = () => {
    console.log("selectedItems:Arr ", selectedItems);
  };
  return (
    <div className="App">
      {showButton && (
        // <button onClick={showArray}></button>

        <Link
          to={{
            pathname: "/sort",
            search: "?sort=name",
            hash: "#selection",
            state: { selectedPhotos: selectedItems },
          }}
        >
          {" "}
          NOW SORT THE SELECTED IMAGES{" "}
        </Link>
      )}
      <div className={showButton === true ? "hide" : "show"}>
        <Gallery photos={items} renderImage={imageRenderer} />
      </div>
    </div>
  );
}

export default ImageSelection;
