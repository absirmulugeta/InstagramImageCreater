export interface Destination {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  destinations: Destination[];
}

export type LocationData = Country[];

export interface GeneratedImageData {
  imageUrl: string;
  description: string;
  altText: string;
}
