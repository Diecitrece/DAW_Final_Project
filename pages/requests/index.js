import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicNavBar } from "../../components/publicNavBar";
import Link from "next/link";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function PublicIndex() {
  const { data: session } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/requests?idUsuario=${session.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  if (typeof window === "undefined") {
    return null;
  }
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner" id="spinner"></i>
      </div>
    );
  }
  if (session) {
    return (
      <>
        <PublicNavBar />
        <h1 className="text-center mt-10 mb-4 text-4xl font-bold mt-20">
          Tus peticiones de libros abiertas
        </h1>
        <div className="p-1">
          {requests.map((request, index) => {
            return (
              <>
                <div className="border-2 border-inherit m-6 p-6 rounded-lg">
                  <p className="text-lg mb-4 break-words">
                    {" "}
                    <b className="text-xl">Título:</b>&nbsp;&nbsp;{" "}
                    {request.name}{" "}
                  </p>
                  <p className="text-lg mb-4 break-words">
                    {" "}
                    <b className="text-xl">Autor:</b>&nbsp;&nbsp;{" "}
                    {request.author}{" "}
                  </p>
                  <p className="text-lg mb-4 break-words">
                    {" "}
                    <b className="text-xl">Descripción:</b>&nbsp;&nbsp;{" "}
                    {request.description}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
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
