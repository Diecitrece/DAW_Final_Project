import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import Images from 'next/image'

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-800 rounded-lg hover:bg-blue-900 m-5",
};

export default function AdminIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    if (session.user.role == "Admin") {
      return (
        <>
          <div className="flex flex-row h-full">
            <AdminMenuBar />
            <div className="">

              <div className="text-right m-5">
              <a href="/"><button className={styles.loginButton}>Parte pública</button></a>
              <button className={styles.loginButton} onClick={() => signOut()}><i className="fas fa-sign-out-alt text"></i></button>
              
              </div>

              <h1 className="font-bold text-4xl text-center">Panel Admin</h1> <br />

              <p className="text-center text-lg">Biblioteca del IES Hermanos Amoros</p>
              <p className="text-center text-xl">Aquí podras administrar la información de la aplicación</p> <br /> <br />

              <div className="m-10">
                <h1 className="font-bold text-2xl">Uso y Participacion de los usuarios en la aplicación en el último año</h1> <br />
                <Images src="/img/circulo1.jpg" width="600px" height="350px"/>  <Images src="/img/barras2.jpg" width="600px" height="350px"/>
              </div>
              
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
