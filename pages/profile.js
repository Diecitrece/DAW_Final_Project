import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PublicNavBar } from "../components/publicNavBar";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState(null);
  const [reviewNum, setReviewNum] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    useEffect(() => {
      if (userData) {
        let queryID = router.query.id ? router.query.id : session.user.id;
        let url = "api/reviews?idUser=" + queryID;
        const response = fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setReviewNum(data.length);
          });
      }
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

    if (!isLoading) {
      return (
        <div className="loading">
          <i className="fas fa-spinner" id="spinner"></i>
        </div>
      );
    }

    return (
      <>
        <PublicNavBar />
        <div className="flex w-full h-screen p-4">
          <div className="w-60 h-min bg-black mx-4 border-2 border-black">
            <Image
              src={userData.image}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div>
            <p>{userData.name}</p>
            <p>Correo: {userData.email}</p>
            <p className={userData.banned ? "" : "hidden"}>
              <span className="font-bold text-red-500">
                En periodo de sancion
              </span>
            </p>
            <p>Reseñas: {reviewNum}</p>
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
