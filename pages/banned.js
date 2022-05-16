import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Banned() {
  const { data: session } = useSession();
  const router = useRouter();

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    if (session.user.banned) {
      return (
        <>
          baneado tontito
          <a href="#" onClick={() => signOut()} title="Cerrar sesión">
            Cerrar sesion
          </a>{" "}
        </>
      );
    }
    router.push("/");
    return null;
  }
  router.push("/login")
  return null;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
