import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the current user from localStorage
    const user = localStorage.getItem("user")
    if (!user) {
      return NextResponse.json(
        { detail: "Not authenticated" },
        { status: 401 }
      )
    }

    return NextResponse.json(JSON.parse(user))
  } catch (error) {
    console.error("Error fetching current user:", error)
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    )
  }
} 