import React, { useState } from "react";
import { useInput } from "./hooks";

export default function MultiLineText() {
  const [textProps, resetText] = useInput("");

  return (
    <div>
      <textarea {...textProps} rows={4} cols={50} />
    </div>
  );
}
