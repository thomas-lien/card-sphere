export interface UserData {
  id: number
  name: string
  email: string
  isVendor: boolean
  giftCardOwned: string[]
  history: any[]
  user_balance: number
}

export interface GiftCardData {
  id: string
  name: string
  balance: number
  expiryDate: string
  color: string
}

// Mock gift card data since it's not in the Python file
const mockGiftCards = {
  ABC123: {
    name: "Starbucks",
    balance: 25.0,
    expiryDate: "12/31/2025",
    color: "bg-green-500",
  },
  XYZ456: {
    name: "Amazon",
    balance: 50.0,
    expiryDate: "06/30/2026",
    color: "bg-blue-500",
  },
  LMN789: {
    name: "Target",
    balance: 100.0,
    expiryDate: "09/15/2025",
    color: "bg-red-500",
  },
  DEF012: {
    name: "Apple",
    balance: 175.0,
    expiryDate: "03/22/2026",
    color: "bg-gray-500",
  },
  GHI345: {
    name: "Walmart",
    balance: 75.0,
    expiryDate: "08/15/2025",
    color: "bg-blue-600",
  },
  JKL678: {
    name: "Best Buy",
    balance: 150.0,
    expiryDate: "11/30/2025",
    color: "bg-blue-400",
  },
  MNO901: {
    name: "Home Depot",
    balance: 200.0,
    expiryDate: "07/15/2026",
    color: "bg-orange-500",
  },
  PQR234: {
    name: "Costco",
    balance: 125.0,
    expiryDate: "05/20/2026",
    color: "bg-blue-500",
  },
  STU567: {
    name: "Whole Foods",
    balance: 85.0,
    expiryDate: "10/10/2025",
    color: "bg-green-600",
  },
  VWX890: {
    name: "Trader Joe's",
    balance: 65.0,
    expiryDate: "09/30/2025",
    color: "bg-red-400",
  },
}

export async function fetchUserData(userId: number): Promise<UserData | null> {
  try {
    const response = await fetch('/api/users')
    const users = await response.json()
    return users.find((user: UserData) => user.id === userId) || null
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export async function fetchGiftCards(cardIds: string[]): Promise<GiftCardData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return cardIds.map(id => ({
    id,
    ...mockGiftCards[id as keyof typeof mockGiftCards]
  }))
}

export async function fetchAllUsers(): Promise<UserData[]> {
  try {
    const response = await fetch('/api/users')
    return await response.json()
  } catch (error) {
    console.error('Error fetching all users:', error)
    return []
  }
} 