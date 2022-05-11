import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PublicNavBar } from "../components/publicNavBar";

const styles = {
  loginButton:
    "px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900",
};

export default function PublicIndex() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)

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
