import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log(session);
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

  return (
    <>
      <center>
        <img src="https://mestreacasa.gva.es/c/document_library/get_file?folderId=500009883339&name=DLFE-600502.png"></img>
        <button className={styles.loginButton} onClick={() => signIn("google")}>
          Login
        </button>
      </center>
    </>
  );
}
