import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AuthGuard } from "@/components/admin/auth-guard"

export const metadata = {
  title: "Admin Panel - Booking Management",
  description: "Admin dashboard for managing bookings",
}

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AuthGuard>
  )
}
