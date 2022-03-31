import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PublicIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session) {
      if (session.user.role == "Admin") {
        router.push("/admin/indexTest");
      } else if (session.user.role == "Client") {
        router.push("/public/indexTest");
      } else {
        router.push("/login");
      }
    } else {
        router.push("/login");
      }
  }, [session]);

  return <>Cliente</>;
}
