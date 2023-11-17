interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    locations: UserLocation[];
    creditCards: CreditCard[];
    cartItems: Cart[];
    currentLocation: UserLocation | null;
  }