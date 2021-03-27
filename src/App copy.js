import "./App.css";
import Gallery from "react-photo-gallery";
import React from "react";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "./Photo";

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

function App() {
  const [items, setItems] = React.useState([]);
  console.log("items: ", items);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(
      "arrayMove(items, oldIndex, newIndex: ",
      arrayMove(items, oldIndex, newIndex)
    );
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  // const [photos, setPhotos] = React.useState([]);
  // console.log("photos: ", photos);
  const getImages = () => {
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

  React.useEffect(() => {
    getImages().then((photoList) => {
      const arr = [];
      photoList.entries.forEach((element) => {
        // destructuring, and rename the object keys to be used by react-photo-gallery
        const { picture: src, ...rest } = element;
        arr.push({ src, width: 1, height: 1, ...rest });
      });

      return setItems(arr);
    });
  }, []);

  return (
    <div className="App">
      {/* <Gallery photos={photos} /> */}

      <div>
        <h2>Sortable Gallery</h2>
        <h3>Drag photo to rearrange</h3>
        <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
      </div>
    </div>
  );
}

export default App;
