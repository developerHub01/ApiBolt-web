export interface FakeUserInterface {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
}
export interface FakePostInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags: Array<string>;
  reactions: number;
  createdAt: string;
}

export interface FakeProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  thumbnail: string;
  createdAt: string;
}

export interface FakeOrderInterface {
  id: number;
  reference: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export interface FakeCategoryInterface {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
