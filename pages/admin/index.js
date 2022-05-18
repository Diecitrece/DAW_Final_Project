import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import Images from "next/image";

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
            <div className="w-full">
              <div className="text-right m-5">
                <a href="/">
                  <button className={styles.loginButton}>Parte pública</button>
                </a>
                <button
                  className={styles.loginButton}
                  onClick={() => signOut()}
                >
                  <i className="fas fa-sign-out-alt text"></i>
                </button>
              </div>
              <h1 className="font-bold text-4xl text-center">Panel Admin</h1>{" "}
              <br />
              <p className="text-center text-lg">
                Biblioteca del IES Hermanos Amorós
              </p>
              <p className="text-center text-xl">
                Aquí podrás administrar la información de la aplicación
              </p>{" "}
              <br /> <br />
              <div className="p-10 w-full">
                <h1 className="font-bold text-2xl">
                  Uso de la aplicación y actividad de los usuarios en el último
                  año
                </h1>{" "}
                <br />
                <div className="flex">
                  <div className="w-1/2 inline mr-4">
                    <Images
                      src="/img/circulo1.jpg"
                      width="100%"
                      height="50%"
                      layout="responsive"
                      objectFit="contain"
                      priority="low"
                    />{" "}
                  </div>{" "}
                  <div className="inline w-1/2">
                    <Images
                      src="/img/barras2.jpg"
                      width="100%"
                      height="50%"
                      layout="responsive"
                      objectFit="contain"
                      priority="low"
                    />
                  </div>
                </div>
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
