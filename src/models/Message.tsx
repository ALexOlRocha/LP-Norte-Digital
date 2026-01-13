interface Message {
  id: number;
  text: string;
  isBot: boolean;
  type?: "text" | "image" | "buttons" | "whatsapp" | "budget" | "qr";
  options?: string[];
  imageUrl?: string;
}
export type { Message };
