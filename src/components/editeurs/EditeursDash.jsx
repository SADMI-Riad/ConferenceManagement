import React from "react";
import { FaArrowRight } from "react-icons/fa";
function EditeursDash() {
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfAqkLllH5Oc1sGgK-Ck4-7fzmhrZwCx5jg&s";
  const editors = [
    {
      id: 1,
      name: "Alice Dupont",
    },
    {
      id: 2,
      name: "Jean Martin",
    },
    {
      id: 3,
      name: "Sophie Lemoine",
    },
    {
      id: 4,
      name: "Marc Petit",
    },
    {
      id: 5,
      name: "Claire Durand",
    },
  ];

  return (
    <div className="authors-container">
      <h1>Nos Éditeurs</h1>
      <div className="authors-banner">
        {editors.map((editor) => (
          <div className="main-author">
            <div key={editor.id} className="author-card">
              <img src={imgUrl} alt={editor.name} className="author-photo" />
              <div className="author-name">{editor.name}</div>
            </div>
            <div className="rightArrowAuthor">
              <FaArrowRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditeursDash;
