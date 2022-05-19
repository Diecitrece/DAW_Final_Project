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
          <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-500">
            <div
              className="flex flex-col p-20 bg-red-500 text-2xl justify-center rounded-3xl items-center text-center h-20 hover:cursor-pointer hover:bg-red-400"
              onClick={() => signOut()}
            >
              Estás baneado
              <br />
              No puedes acceder a ninguna página mientras estés baneado
              <span className="text-yellow-100 inline">
                Pulsa para cerrar sesión
              </span>
            </div>
          </div>
        </>
      );
    }
    router.push("/");
    return null;
  }
  router.push("/login");
  return null;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
