import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Failed to sign in" },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    )
  }
} 