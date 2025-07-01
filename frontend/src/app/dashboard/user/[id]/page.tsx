import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  params: { id: string };
};

const ProfilePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== params.id) {
    // Redirect to signin if no session or not authorized
    throw new Error("Unauthorized");
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p>ID: {session.user.id}</p>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default ProfilePage;
