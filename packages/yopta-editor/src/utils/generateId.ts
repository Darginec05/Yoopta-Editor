export function generateId() {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
  const randomChars = Math.random().toString(36).slice(2, 8); // Generate random string of 6 characters
  const id = `${timestamp}-${randomChars}`; // Combine timestamp and random string with a hyphen
  return id;
}

// import { v4 } from 'uuid';

// export const generateId = () => v4();
