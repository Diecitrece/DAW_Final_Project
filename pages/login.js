import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Images from 'next/image'

const styles = {
  loginButton:
    "flex px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 text-center m-0 ",

    
  caja:
    "border-2 border-inherit p-6 rounded-lg w-1/3"
};

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (typeof window === "undefined") return null;
  if (session) {
    if (session.user.banned) {
      router.push("/banned")
      return null;
    }
    router.push("/");
    return null;
  }

  return (
    <>
    
      
    
      <center>
        <div className="mt-8 w-1/3 p-10 bg-slate-500 border-2 border-inherit rounded-lg border-black">
        <img src="https://mestreacasa.gva.es/c/document_library/get_file?folderId=500009883339&name=DLFE-600502.png" width="350px" height="205px"></img>
        <Images src="/img/PhantomLibraryLogo.png" width="350px" height="205px"/>
        <button className={styles.loginButton} onClick={() => signIn("google")}>
          Login
        </button>
        </div>
      </center>
      
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
