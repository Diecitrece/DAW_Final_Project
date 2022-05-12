import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AdminMenuBar } from "../../../components/adminComponents/adminMenuBar";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function AdminIndex() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [ISBN, setISBN] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    postBook();
    router.push("/admin/books");
  };

  const postBook = async () => {
    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        ISBN: ISBN,
      }),
    });
  };

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    if (session.user.role == "Admin") {
      return (
        <>
          <div className="flex flex-row h-full">
            <AdminMenuBar />
            <div className="w-1/3 m-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <h2 className="text-xl font-bold text-gray-400">
                  Nuevo libro:
                </h2>
                <br />
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-base font-bold mb-2"
                    for="username"
                  >
                    Nombre
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-400 text-base font-bold mb-2"
                    for="ISBN"
                  >
                    ISBN
                  </label>
                  <input
                    onChange={(e) => setISBN(e.target.value)}
                    className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="ISBN"
                    type="text"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
    router.push("/index");
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
