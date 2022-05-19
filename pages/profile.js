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
    if (session.user.banned) {
      router.push("/banned");
      return null;
    }
    useEffect(() => {
      if (userData) {
        let url = "api/reviews?idUser=" + userData._id;
        fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setReviewNum(data.length);
          });
      }
    }, [userData]);
    useEffect(() => {
      if (typeof window === "undefined") {
        return null;
      }
      let queryID = router.query.id ? router.query.id : session.user.id;
      let url = "api/users?id=" + queryID;
      fetch(url, {
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
        <div className="loading">
          <i className="fas fa-spinner" id="spinner"></i>
        </div>
      );
    }
    return (
      <>
        <PublicNavBar />
        <div className="flex w-full h-screen p-4">
          <div className="w-40 h-min bg-black mx-4 border-2 border-black mt-20">
            <Image
              src={userData.image}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              priority="low"
            />
          </div>
          <div className="mt-20">
            <p>{userData.name}</p>
            <p>Correo: {userData.email}</p>
            <p className={userData.banned ? "" : "hidden"}>
              <span className="font-bold text-red-500">
                En período de sanción
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
