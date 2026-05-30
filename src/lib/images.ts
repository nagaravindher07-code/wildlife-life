export interface Image {
  src: string;
  alt: string;
  title: string;
  aspect: number;
}

export const heroImage: Image = {
  src: "/images/thumb.jpg",
  alt: "Hero photograph",
  title: "Wildlife & Life",
  aspect: 16 / 9,
};

export const galleryImages: Image[] = [
  {
    src: "/images/wildlife-01.jpg",
    alt: "Gallery photo 1",
    title: "Frame 01",
    aspect: 4 / 5,
  },
  {
    src: "/images/wildlife-02.jpg",
    alt: "Gallery photo 2",
    title: "Frame 02",
    aspect: 4 / 5,
  },
  {
    src: "/images/wildlife-03.jpg",
    alt: "Gallery photo 3",
    title: "Frame 03",
    aspect: 4 / 5,
  },
];
