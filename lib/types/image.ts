export interface ImageData {
  id: string;
  filename: string;
  name: string,
  title: string;
  url: {
    original: string;
    thumbnail: string;
    medium: string;
  };
  category: string[];
  tags: string[];
  description: string;
}
