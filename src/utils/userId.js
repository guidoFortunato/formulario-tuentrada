"use client"

import { v4 as uuidv4 } from "uuid";

export function getOrCreateUserId() {
  const existingId = sessionStorage.getItem("userId");
  if (existingId) {
    return existingId;
  }

  const newId = uuidv4(); // Genera un nuevo UUID
  sessionStorage.setItem("userId", newId);
  return newId;
}

