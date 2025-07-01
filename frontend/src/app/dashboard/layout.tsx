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
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-6">
      <Link href={`/dashboard/user/${session.user.id}`} className="underline text-blue-600">
        User Profile
      </Link>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
