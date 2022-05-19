import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { PublicNavBar } from "../components/publicNavBar";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import FormModal from "../components/formToAddReview";
import Image from "next/image";

export default function Reviews() {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const router = useRouter();
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [idBookToEdit, setIdBookToEdit] = useState(null);

  if (session) {
    var idUser = session.user.id;
  } else {
    var idUser = "";
  }

  useEffect(async () => {
    await fetch(`/api/reviews?idUser=${idUser}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    setChange(false);
  }, [change]);

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

  if (typeof window === "undefined") {
    return null;
  }

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner" id="spinner"></i>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (session) {
    return (
      <>
        <PublicNavBar />
        <FormModal
          idbook={idBookToEdit}
          setChange={setChange}
          setOpen={setOpen}
          open={open}
          form={form}
          setForm={setForm}
        />

        <h1 className="text-4xl font-bold text-center m-5 mt-20">Tus reseñas</h1>
        {reviews.length === 0 && <p>No hay reseñas</p>}
        {reviews.length > 0 &&
          //if users is not null
          users &&
          reviews.map((review) => {
            const user = findUser(review.idUser);
            return (
              <>
                <div className="m-10" key={review.id}>
                  <Link href={"books/" + review.idBook}>
                    <a>
                      <h3 className="text-xl text-center font-semibold">
                        {review.bookName}
                      </h3>
                    </a>
                  </Link>
                  <div className="border-2 p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between">
                      <div className=" flex flex-wrap mb-4">
                        <div>
                          <img
                            src={user.image}
                            alt="user"
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
                          <Menu as="div" className="relative inline-block ">
                            <div>
                              <Menu.Button className="text-xl	font-bold hover:font-extrabold ">
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
                                            setIdBookToEdit(review.idBook);
                                            setOpen(true);
                                            setForm({
                                              idReview: review.idReview,
                                              idUser: session.user.id,
                                              pubDate: review.pubDate,
                                              description: review.description,
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
                                            handleDelete(review.idReview)
                                          }
                                        >
                                          Eliminar
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </>
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
          })}
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
