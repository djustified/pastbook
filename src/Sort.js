import Gallery from "react-photo-gallery";
import React from "react";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import SortPhoto from "./SortPhoto";
import { useLocation } from "react-router-dom";

const SortablePhoto = SortableElement((item) => <SortPhoto {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

function App() {
  console.log("AT sort location");
  const {
    state: { selectedPhotos },
  } = useLocation();
  // console.log("state: ", state);
  const [items, setItems] = React.useState([]);
  console.log("items: ", items);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(
      "arrayMove(items, oldIndex, newIndex: ",
      arrayMove(items, oldIndex, newIndex)
    );
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  React.useEffect(() => {
    setItems(selectedPhotos);
  }, [selectedPhotos]);

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
