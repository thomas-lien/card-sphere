import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get the current user from the request
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Jane Smith",
        password: "password456"
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Failed to fetch users" },
        { status: response.status }
      )
    }

    return NextResponse.json([data.user])
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    )
  }
} 