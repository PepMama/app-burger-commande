export interface Ingredient {
  name: string;
  quantity: number;
}

export interface Composition {
  type: "Carn" | "Vegan" | "Fish";
  ingredients: Ingredient[];
}

export interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  composition: Composition;
}
