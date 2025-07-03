import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  console.log("Session in DashboardLayout:", session);

  if (!session?.user?.id) {
    redirect("/auth/signin"); // ✅ Use custom sign-in page
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">My Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Dashboard Home
          </Link>
          <Link
            href={`/dashboard/user/${session.user.id}`}
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            User Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">Logged in as</p>
          <p className="font-medium text-gray-700">{session.user.name || "User"}</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Sign Out
          </Link>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
