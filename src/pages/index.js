import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log("YYYY");

  return (
    <div>
      {session ? (
        <p>Welcome, {session.user.username}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
