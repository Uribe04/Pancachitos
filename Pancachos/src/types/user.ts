export interface User {
  email: string;
  password: string;
  type: "client" | "bakery";
  bakeryName?: string;
  profileImage?: string; // nueva propiedad para guardar imagen del usuario
}