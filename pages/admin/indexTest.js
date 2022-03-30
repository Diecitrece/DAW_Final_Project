import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminIndex() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }
  return <h1>TEST</h1>;
}
