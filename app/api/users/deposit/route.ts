import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, amount } = await request.json()

    // Call the backend API to deposit funds
    const response = await fetch(`http://localhost:8000/profile/deposit?email=${encodeURIComponent(email)}&amount=${amount}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to deposit")
    }

    const data = await response.json()
    return NextResponse.json(data.user)
  } catch (error) {
    console.error("Error depositing:", error)
    return NextResponse.json(
      { detail: "Failed to deposit funds" },
      { status: 500 }
    )
  }
} 