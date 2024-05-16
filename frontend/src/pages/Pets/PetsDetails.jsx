import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PetsDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/pets/${id}`
        );
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Location: {pet.location}</p>
      <p>Description: {pet.description}</p>
      <p>Availability: {pet.availability ? "Available" : "Not Available"}</p>

    </div>
  );
};

export default PetsDetails;
