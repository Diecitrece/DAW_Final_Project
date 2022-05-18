import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Images from "next/image";

export const AdminMenuBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const styles = {
    liNavBar:
      "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 dk:hover:text-white md:hover:bg-transparent border-gray-700",
    actualLiNavBar:
      "block py-2 pr-4 pl-3 text-white bg-blue-900 rounded md:bg-transparent md:text-blue-500 md:p-0 text-white",
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
        rel="stylesheet"
      />
      <div
        className={
          "flex flex-col w-60 bg-white border-gray-200 px-2 px-4 py-2.5 bg-gray-800 h-full"
        }
      >
        <ul className="flex flex-col space-y-8 text-lg mt-4">
          <li className="m-auto">
            <img
              src="https://mestreacasa.gva.es/c/document_library/get_file?folderId=500009883339&name=DLFE-600502.png"
              className="m-auto h-28"
            />
            <span className="">
              <Images
                src="/img/PhantomLibraryLogo.png"
                width="650px"
                height="165px"
              />
            </span>
          </li>
          <li>
            <Link href="/admin">
              <a
                className={
                  router.asPath == "/admin"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-server"></i>&nbsp; Panel de administrador
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <a
                className={
                  router.asPath == "/admin/users"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-users"></i>&nbsp; Usuarios
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/books">
              <a
                className={
                  router.asPath == "/admin/books"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-book"></i>&nbsp; Libros
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/bookRequest">
              <a
                className={
                  router.asPath == "/admin/bookRequest"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-book-medical"></i>&nbsp; Peticiones de libros
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/roles">
              <a
                className={
                  router.asPath == "/admin/roles"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-user-tag"></i>&nbsp; Ver roles
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/reports">
              <a
                className={
                  router.asPath == "/admin/reports"
                    ? styles.actualLiNavBar
                    : styles.liNavBar
                }
              >
                <i class="fa fa-flag"></i>&nbsp; Reportes de usuarios
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
