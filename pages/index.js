import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicNavBar } from "../components/publicNavBar";
import Link from "next/link";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function PublicIndex() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setBooks(data);
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
    if (session.user.banned) {
      router.push("/banned");
      return null;
    }
    return (
      <>
        <PublicNavBar />

        <div className="grid grid-cols-3 p-1">
          {books.map((book, index) => {
            return (
              <>
                <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg bg-gray-200 border-gray-400 mt-6 mb-6 mx-auto px-8 py-6 w-80 text-center mt-20">
                  <a href="">
                    <img
                      class="rounded-t-lg h-80 pl-6"
                      src="https://edit.org/photos/img/blog/ppe-crear-portadas-de-libros-online.jpg-840.jpg"
                      alt=""
                    />
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {book.name}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {book.author}
                    </p>
                    <a
                      href={"books/" + book._id}
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Leer más
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
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
