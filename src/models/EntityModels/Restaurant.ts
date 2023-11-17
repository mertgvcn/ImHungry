interface Restaurant {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    description?: string | null;
    imageSource?: string | null;
    items: Item[];
    location: RestaurantLocation;
  }