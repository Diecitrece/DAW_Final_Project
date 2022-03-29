import { useSession, signIn, signOut } from "next-auth/react";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function Home() {
  return (
    <>
      <center>
        <img src="https://mestreacasa.gva.es/c/document_library/get_file?folderId=500009883339&name=DLFE-600502.png"></img>
        <button class={styles.loginButton} onClick={() => signIn()}>
          Login
        </button>
      </center>
    </>
  );
}
