"use server"
import CryptoJS from 'crypto-js';

const secretKey = "S#9fGz7^kLm%8jHdQ!wX$23RrN&PzA4eXt5V^yT*UbMnVz@0gC"; // Llave secreta (asegúrate de que sea segura)

// Encriptar
export async function encryptToken(token) {
  return CryptoJS.AES.encrypt(token, secretKey).toString();
}

// Desencriptar
export async function decryptToken(encryptedToken) {
  // Verifica que encryptedToken sea una cadena válida
  if (typeof encryptedToken !== 'string') {
    throw new Error("El token encriptado debe ser una cadena.");
  }

  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (!originalText) {
    throw new Error("No se pudo desencriptar el token. Verifica la clave secreta.");
  }

  return originalText;
}