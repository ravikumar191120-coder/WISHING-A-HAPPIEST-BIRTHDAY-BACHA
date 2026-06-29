export interface MemoryImage {
  id: string;
  src: string;
  fallback: string;
  title: string;
  caption: string;
  year?: string;
}

export interface MemoryVideo {
  id: string;
  src: string;
  fallback: string;
  title: string;
  caption: string;
  thumbnail?: string;
}
