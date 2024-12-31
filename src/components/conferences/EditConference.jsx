// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { conferenceService } from "./ConferenceService";


// function EditConference() {
//   const { idConference } = useParams(); // correspond à /edit-conference/:idConference
//   const navigate = useNavigate();

//   const [conference, setConference] = useState({
//     nom: "",
//     description: "",
//     dateDebut: "",
//     dateFin: "",
//     statut: "Ouverte",
//     imageUrl: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchConference = async () => {
//       try {
//         const data = await conferenceService.getById(idConference);
//         setConference({
//           nom: data.nom || "",
//           description: data.description || "",
//           dateDebut: data.dateDebut || "",
//           dateFin: data.dateFin || "",
//           statut: data.statut || "Ouverte",
//           imageUrl: data.imageUrl || "",
//         });
//         setLoading(false);
//       } catch (err) {
//         setError("Erreur lors de la récupération de la conférence.");
//         setLoading(false);
//       }
//     };

//     if (idConference) {
//       fetchConference();
//     }
//   }, [idConference]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setConference({ ...conference, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await conferenceService.update(idConference, conference);
//       setSuccessMessage("La conférence a été mise à jour avec succès !");
//       // Redirection après 2 secondes vers la page des conférences
//       setTimeout(() => {
//         navigate("/conferences");
//       }, 2000);
//     } catch (err) {
//       setError("Erreur lors de la mise à jour de la conférence.");
//     }
//   };

//   if (loading) return <div>Chargement...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <div className="edit-conference-container">
//       <h1>Modifier la Conférence</h1>

//       {successMessage && (
//         <div style={{ color: "green", marginBottom: "1rem" }}>
//           {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="nom">Nom de la conférence</label>
//           <input
//             type="text"
//             id="nom"
//             name="nom"
//             value={conference.nom}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={conference.description}
//             onChange={handleInputChange}
//             rows="4"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="dateDebut">Date de début</label>
//           <input
//             type="date"
//             id="dateDebut"
//             name="dateDebut"
//             value={conference.dateDebut}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="dateFin">Date de fin</label>
//           <input
//             type="date"
//             id="dateFin"
//             name="dateFin"
//             value={conference.dateFin}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="statut">Statut</label>
//           <select
//             id="statut"
//             name="statut"
//             value={conference.statut}
//             onChange={handleInputChange}
//           >
//             <option value="Ouverte">Ouverte</option>
//             <option value="Fermée">Fermée</option>
//             <option value="Annulée">Annulée</option>
//           </select>
//         </div>

//         {/* Champ URL désactivé */}
//         <div className="form-group">
//           <label htmlFor="imageUrl">URL de l'image</label>
//           <input
//             type="text"
//             id="imageUrl"
//             name="imageUrl"
//             value={conference.imageUrl}
//             onChange={handleInputChange}
//             placeholder="https://..."
//             disabled // <-- L'utilisateur ne peut pas modifier l'URL
//           />
//         </div>

//         <button type="submit" className="btn-save">
//           Enregistrer
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditConference;
