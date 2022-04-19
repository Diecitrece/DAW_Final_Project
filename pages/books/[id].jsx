//page that displays the book details
import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PublicNavBar } from "../../components/publicNavBar";

export default function LoadBook() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/books?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const styles = {};

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    if (session.user.role == "Admin") {
      return (
        <>
          <PublicNavBar />
          <div className="container mx-auto">
            <div className="flex flex-wrap p-10 ">
              <div className="w-full md:w-1/3 p-4 ">
                <img
                  src="https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"
                  alt={book.name}
                  className="rounded-lg drop-shadow-lg w-1/2 mx-auto"
                />
              </div>
              <div className="w-full md:w-1/2 lg:w1/1 p-4">
                <h1 className="text-4xl font-bold mb-2">{book.name}</h1>
                <p className="text-2xl font-semibold mb-4 text-slate-800/75">
                  Autor del libro
                </p>
                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">Descripción</h4>
                  <p className="text-xl ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta obcaecati ratione nihil repellat esse mollitia,
                    incidunt architecto distinctio? Quod amet eius ex
                    necessitatibus ullam tenetur aperiam incidunt corrupti ad
                    nostrum.
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2 ">ISBN</h4>
                  <p className="text-xl ">{book.ISBN}</p>
                </div>
              </div>

              {/*show the reviews of the book*/}
              <div className="w-full md:w-1/1 p-4">
                <p className="text-2xl font-semibold mb-4 text-slate-800/75">
                  Reseñas de los usuarios
                </p>
                {/*check if there are reviews*/}
                {book.reviews ? (
                  /*show the reviews*/

                  book.reviews.map((review) => (
                    <div className="mb-4" key={review.id}>
                      <div className="border-2 p-4 rounded-lg">
                        <div className="flex flex-wrap mb-4">
                          <div>
                            <img
                              src="https://www.diez.hn/binrepository/agregar-un-titulo-1_1211524_20220329104133.jpg"
                              alt="profile"
                              className="rounded-full mr-2 w-12 h-12"
                            />
                          </div>
                          <div>
                            <p className="text-xl font-semibold mb-2">
                              Nombre del usuario
                            </p>
                            <div className="flex">
                              {[...Array(parseInt(review.rating))].map(
                                (star, i) => (
                                  <svg
                                    key={i}
                                    className="h-4 w-4 text-orange-500 fill-current mr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-xl mb-4">{review.description}</p>
                        <p>{review.pubDate}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  /*if there are no reviews, show this message*/
                  <p>No hay reseñas para este libro</p>
                )}
              </div>
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
  //show the book details with the book cover, title, author, and description with tailwind classes
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
