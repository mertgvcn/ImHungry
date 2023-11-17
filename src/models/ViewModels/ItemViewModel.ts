interface ItemViewModel {
    id: number;
    name: string;
    description?: string | null;
    imageSource?: string | null;
    price: number;
    category: Category;
  }