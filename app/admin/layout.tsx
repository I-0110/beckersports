import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/app/ui/admin/sidebar";

export default async function AdminLayout({ 
    children,
}: { 
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="bg-chiefs-light flex-1 overflow-auto">{children}</main>
        </div>
    );
}