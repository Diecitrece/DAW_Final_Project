//page that displays the book details
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PublicNavBar } from "../../components/publicNavBar";
import FormModal from "../../components/formToAddReview";
import { Menu, Transition } from "@headlessui/react";
import { data } from "autoprefixer";
import Report from "../../components/report";

export default function LoadBook(props) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState();
  const [requestOpen, setRequestOpen] = useState(false);

  //let update =false;
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    await fetch(`/api/books?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setChange(false);
  }, [id, change]);

  useEffect(async () => {
    await fetch(`/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setChange(false);
  }, []);

  const findUser = (id) => {
    if (users) {
      return users.find((user) => user._id === id);
    }
  };

  let date = new Date();

  if(session){
    var idUser = session.user.id;
  }else{
    var idUser = "";
  }

  const [form, setForm] = useState({
    idReview: "",
    idUser: idUser,
    pubDate: date,
    description: "",
    rating: "1",
    reports: [],
  });

  const handleDelete = (id) => {
    var option = confirm("¿Estas seguro de que quieres eliminar esta reseña?");

    if (option === true) {
      deleteReview(id);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idReview: id,
        }),
      });

      setChange(true);
    } catch (error) {
      console.log(error);
    }
  };

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
    if (session.user.role == "Client") {
      return (
        <>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
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
                <FormModal
                  idbook={id}
                  setChange={setChange}
                  setOpen={setOpen}
                  open={open}
                  form={form}
                  setForm={setForm}
                />
                <Report open={requestOpen} setOpen={setRequestOpen} />

                {/*check if there are reviews*/}
                {book.reviews && users ? (
                  /*show the reviews*/

                  book.reviews.map((review) => {
                    const user = findUser(review.idUser);
                    console.log(user.name);

                    return (
                      <>
                        <div className="mb-4" key={review.id}>
                          <div className="border-2 p-4 rounded-lg">
                            <div className="flex flex-wrap justify-between">
                              <div className=" flex flex-wrap mb-4">
                                <div>
                                  <img
                                    src={user.image}
                                    alt="profile"
                                    className="rounded-full mr-2 w-12 h-12"
                                  />
                                </div>
                                <div className="">
                                  <div className="">
                                    <p className="text-xl font-semibold mb-2">
                                      {user.name}
                                    </p>
                                  </div>
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
                              <div className="text-right">
                                <div className="">
                                  <Menu
                                    as="div"
                                    className="relative inline-block "
                                  >
                                    <div>
                                      <Menu.Button className="text-xl	font-bold hover:font-extrabold ">
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                        · · ·
                                      </Menu.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        {session.user.id === review.idUser && (
                                          <>
                                            <div className="px-1 py-1 ">
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    className={`${
                                                      active
                                                        ? "bg-blue-500 text-white"
                                                        : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    onClick={() => {
                                                      setOpen(true);
                                                      setForm({
                                                        idReview:
                                                          review.idReview,
                                                        idUser: session.user.id,
                                                        pubDate: review.pubDate,
                                                        description:
                                                          review.description,
                                                        rating: review.rating,
                                                        reports: review.reports,
                                                      });
                                                    }}
                                                  >
                                                    Editar
                                                  </button>
                                                )}
                                              </Menu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                              <Menu.Item>
                                                {({ active }) => (
                                                  <button
                                                    className={`${
                                                      active
                                                        ? "bg-blue-500 text-white"
                                                        : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    onClick={() =>
                                                      handleDelete(
                                                        review.idReview
                                                      )
                                                    }
                                                  >
                                                    Eliminar
                                                  </button>
                                                )}
                                              </Menu.Item>
                                            </div>
                                          </>
                                        )}
                                        {session.user.id != review.idUser && (
                                          <div className="px-1 py-1">
                                            <Menu.Item>
                                              {({ active }) => (
                                                <button
                                                  className={`${
                                                    active
                                                      ? "bg-blue-500 text-white"
                                                      : "text-gray-900"
                                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                  onClick={() =>
                                                    setRequestOpen(true)
                                                  }
                                                >
                                                  Reportar review
                                                </button>
                                              )}
                                            </Menu.Item>
                                          </div>
                                        )}
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>

                            <p className="text-xl mb-4 break-words">
                              {review.description}
                            </p>
                            <p>{review.pubDate}</p>
                          </div>
                        </div>
                      </>
                    );
                  })
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
    router.push("/");
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
