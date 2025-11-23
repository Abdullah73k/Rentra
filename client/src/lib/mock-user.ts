import type { User } from "./types"

export const mockUser: User = {
  id: "user-1",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+971 50 123 4567",
  company: "Real Estate Holdings LLC",
  country: "United Arab Emirates",
  currency: "AED",
  vatRate: 5,
  twoFactorEnabled: false,
  passkeys: [],
  createdAt: "2024-01-15T10:00:00.000Z",
}
