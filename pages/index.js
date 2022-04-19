import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PublicNavBar } from "../components/publicNavBar";
import Link from "next/link";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function PublicIndex() {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    return (
      <>
        <PublicNavBar />

        <div className="grid grid-cols-3 p-1">
          {books.map((book, index) => {
            return (
              <>
                <Link href={"books/" + book._id}>
                  <a className="mt-12 bg-teal-600 mx-auto px-10 py-8">
                    <div>
                      <p className="text-center">{book.name}</p>
                      <div className="w-32 mt-4 mx-auto">
                        <img
                          src="https://pbs.twimg.com/media/FJApRPRWUAgOa9G.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </a>
                </Link>
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
