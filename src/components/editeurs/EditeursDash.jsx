import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function EditeursDash() {
  // const [editors, setEditors] = useState([]);
  const imgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfAqkLllH5Oc1sGgK-Ck4-7fzmhrZwCx5jg&s";

  // useEffect(() => {
  //   const fetchEditors = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/auth/Editeurs"
  //       );
  //       setEditors(response.data.slice(0, 5));
  //     } catch (error) {
  //       console.error("Error fetching editors:", error);
  //     }
  //   };

  //   fetchEditors();
  // }, []);
  const editors = [
    {
      id: 1,
      fullName: "SADMI Mohamed Riad",
    },
    {
      id: 2,
      fullName: "BOUTAGHOU Maria Ghalia",
    },
    {
      id: 3,
      fullName: "MENTIZI Rayane Rafik",
    },
    {
      id: 4,
      fullName: "AIT AHCENE Melissa",
    },
  ];
  return (
    <div className="authors-container">
      <h1>Nos Éditeurs</h1>
      <div className="authors-banner">
        {editors.map((editor) => (
          <div key={editor.id} className="main-author">
            <div className="author-card">
              <img
                src={imgUrl}
                alt={editor.Fullname}
                className="author-photo"
              />
              <div className="author-name">{editor.fullName}</div>
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
