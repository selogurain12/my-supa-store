export type Product = {
  slug: string;
  name: string;
  price: string;
  shortDescription: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "sneaker-neo",
    name: "Sneaker Neo",
    price: "79,99 €",
    shortDescription: "Une basket légère et moderne pour tous les jours.",
    description:
      "La Sneaker Neo combine amorti souple, style minimaliste et maintien confortable pour un look urbain polyvalent.",
    image: "/products/sneaker-neo.svg",
  },
  {
    slug: "sac-a-dos-travel",
    name: "Sac à dos Travel",
    price: "59,99 €",
    shortDescription: "Un sac à dos durable et élégant pour partir en voyage.",
    description:
      "Conçu avec plusieurs compartiments, un support dorsal renforcé et des matériaux résistants à l’eau.",
    image: "/products/sac-a-dos-travel.svg",
  },
  {
    slug: "t-shirt-relax",
    name: "T-shirt Relax",
    price: "24,99 €",
    shortDescription: "Un t-shirt confortable, idéal pour le quotidien.",
    description:
      "Coupe décontractée, coton doux et finition légère pour un confort optimal toute la journée.",
    image: "/products/t-shirt-relax.svg",
  },
];
