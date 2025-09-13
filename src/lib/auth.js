"use client"

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  return window.sessionStorage.getItem("adminSession") === "true"
}

export const logout = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("adminSession")
  }
  window.location.href = "/admin-panel"
}
