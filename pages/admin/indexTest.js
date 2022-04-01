import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function AdminIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log(session);
      if (session.user.role != "Admin") {
        router.push("/public/indexTest");
      }
    } else {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      Admin
      <button className={styles.loginButton} onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
