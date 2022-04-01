import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PublicIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session == null) {
      router.push("/login");
    }
  }, [session]);

  return <>Cliente</>;
}
