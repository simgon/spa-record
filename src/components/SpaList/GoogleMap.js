import React, { useState } from "react";

export default function GoogleMap({ spaName }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  if (!spaName) return;

  return (
    <iframe
      title="Google Map"
      width="100%"
      height="450"
      style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${spaName}`}
      allowFullScreen
    ></iframe>
  );
}
