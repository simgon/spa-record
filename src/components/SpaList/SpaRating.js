import React from "react";
import StarRating from "./StarRating";

export default function SpaRating({ record, onRate = (f) => f, edit = false }) {
  return (
    <div className={edit ? "border p-2" : "my-2"}>
      <div className="d-flex justify-content-center">
        <StarRating
          selectedStars={record.rating.spa}
          onRate={(rating) => onRate(record.id, { spa: rating })}
        />
      </div>

      <div
        className="gap-2 justify-content-center"
        style={{
          display: "grid",
          gridTemplateColumns: edit ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
        }}
      >
        <div className="text-center">
          <div>風呂</div>
          <StarRating
            selectedStars={record.rating.bath}
            onRate={(rating) => onRate(record.id, { bath: rating })}
          />
        </div>

        <div className="text-center">
          <div>サウナ</div>
          <StarRating
            selectedStars={record.rating.sauna}
            onRate={(rating) => onRate(record.id, { sauna: rating })}
          />
        </div>

        <div className="text-center">
          <div>水風呂</div>
          <StarRating
            selectedStars={record.rating.coldPlunge}
            onRate={(rating) => onRate(record.id, { coldPlunge: rating })}
          />
        </div>

        <div className="text-center">
          <div>外気浴</div>
          <StarRating
            selectedStars={record.rating.freshAir}
            onRate={(rating) => onRate(record.id, { freshAir: rating })}
          />
        </div>
      </div>
    </div>
  );
}
