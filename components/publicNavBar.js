import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const styles = {
  liNavBar:
    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
  actualLiNavBar:
    "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white",
  closeSession:
    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-3xl ml-5",
};

export const PublicNavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuMobileState, setMenuMobileState] = useState("hidden");
  useEffect(() => {
  }, [menuMobileState]);

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
        rel="stylesheet"
      />
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-row m-auto justify-between">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="https://mestreacasa.gva.es/c/document_library/get_file?folderId=500009883339&name=DLFE-600502.png"
                className="mr-3 h-6 sm:h-9"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Hermanos Amoros
              </span>
            </a>
          </Link>
          <div className="flex md:order-2">
            <div className="hidden relative mr-3 md:mr-0 md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="searchBook"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar libro..."
              />
            </div>
            <button
              data-collapse-toggle="mobile-menu-3"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-3"
              aria-expanded="false"
              onClick={() => {
                menuMobileState == "hidden"
                  ? setMenuMobileState("")
                  : setMenuMobileState("hidden");
                console.log(menuMobileState);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-5">
            <a
              href="#"
              className={styles.closeSession}
              onClick={() => signOut()}
            >
              <i className="fas fa-sign-out-alt text"></i>
            </a>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-4">
            <p className={styles.liNavBar}>Bienvenido {session.user.name}</p>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-3"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/">
                  <a
                    className={
                      router.asPath == "/"
                        ? styles.actualLiNavBar
                        : styles.liNavBar
                    }
                  >
                    Libros
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a
                    className={
                      router.asPath == "/profile"
                        ? styles.actualLiNavBar
                        : styles.liNavBar
                    }
                  >
                    Perfil
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <a
                    className={
                      router.asPath == "/reviews"
                        ? styles.actualLiNavBar
                        : styles.liNavBar
                    }
                  >
                    Tus reseñas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/peticiones">
                  <a
                    className={
                      router.asPath == "/petilciones"
                        ? styles.actualLiNavBar
                        : styles.liNavBar
                    }
                  >
                    Tus peticiones
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={menuMobileState + " absolute right-0 w-1/2 bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800"}>
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <Link href="/">
              <a
                className={
                  router.asPath == "/" ? styles.actualLiNavBar : styles.liNavBar
                }
              >
                Libros
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a
                className={
                  router.asPath == "/profile"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                Perfil
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reviews">
              <a
                className={
                  router.asPath == "/reviews"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                Tus reseñas
              </a>
            </Link>
          </li>
          <li>
            <Link href="/peticiones">
              <a
                className={
                  router.asPath == "/petilciones"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                Tus peticiones
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
