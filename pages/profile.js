import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicNavBar } from "../components/publicNavBar";

export default function Profile() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [numReviews, setNumReviews] = useState(0);

  const router = useRouter();
  const styles = {};
  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    useEffect(() => {
      let url = ""
    }, [userData]);
    useEffect(() => {
      let queryID = router.query.id ? router.query.id : session.user.id;
      let url = "api/users?id=" + queryID;
      const response = fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        });
    }, []);

    if (isLoading) {
      return (
        <div>
          <p>This shit is loading</p>
        </div>
      );
    }

    return (
      <>
        <PublicNavBar />
        <div>
          <div>
            <img src={userData.image} />
          </div>
          <div>
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p className={userData.banned ? "" : "hidden"}>
              En periodo de sanción
            </p>
            <p>Reseñas: {numReviews}</p>
          </div>
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
