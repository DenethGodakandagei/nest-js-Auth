import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

const ProfilePage = async (props: Props) => {
  // ✅ Correct: Destructure inside the function body!
  const { params } = props;

  // ✅ Now safe to use
  const session = await getServerSession(authOptions);

  console.log("Session:", session);
  console.log("Route param id:", params.id);

  if (!session || !session.user?.id) {
    redirect("/api/auth/signin");
  }

  if (session.user.id.toString() !== params.id) {
    // It's common for `session.user.id` to be a number, but params.id is a string
    redirect("/unauthorized");
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
