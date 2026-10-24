import { Link } from "react-router-dom";
import { ReactCounts, SafeImg, reactions } from "./Bits.jsx";

export function PetCard({ pet }) {
  const counts = reactions(pet.id);
  return (
    <article className="pet-card">
      <Link to={`/pets/${pet.id}`}>
        <div className="pet-card__media">
          <SafeImg src={pet.cover} alt={`${pet.breed} ${pet.name} 품종 안내 사진`} />
        </div>
        <div className="pet-card__body">
          <h3>{pet.name}</h3>
          <p className="meta">{pet.breed}</p>
          <ReactCounts likes={counts.likes} comments={counts.comments} />
        </div>
      </Link>
    </article>
  );
}
