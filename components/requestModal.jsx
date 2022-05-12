import { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession, getSession, signOut } from "next-auth/react";

export default function MyModal({ isOpen, setIsOpen }) {
  // let [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession();

  const [form, setForm] = useState({
    idUsuario: session.user.id,
    name: "",
    author: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(form);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const postData = async (form) => {
    try {
      //console.log(form);

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setIsOpen(false);
      setForm({
        name: "",
        // idUser: session.user.id,
        author: "",
        reviewd: false,
      });
      //setChange(true);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButtonRef = useRef(null);
  return (
    <>
      <div className="">
        {/* <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Open dialog
          </button> */}
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setIsOpen}
        >
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className=" sm:flex sm:items-start">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Petición de libro
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className=" mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="description"
                                className="block text-sm  font-medium leading-5 text-gray-700"
                              >
                                Título
                              </label>
                              <div className="">
                                <input
                                  id="name"
                                  name="name"
                                  type="text"
                                  value={form.name}
                                  onChange={handleChange}
                                  required
                                  placeholder="Titulo del libro..."
                                  className="px-3 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium leading-5 text-gray-700"
                              >
                                Autor/a
                              </label>
                              <div className="mt-1 rounded-md shadow-sm">
                                <input
                                  type="text"
                                  id="author"
                                  name="author"
                                  onChange={handleChange}
                                  placeholder="Autor/a..."
                                  value={form.author}
                                  className="px-3 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium leading-5 text-gray-700"
                              >
                               Descripción
                              </label>
                              <div className="mt-1 rounded-md shadow-sm">
                                <textarea
                                  type="text"
                                  id="description"
                                  name="description"
                                  onChange={handleChange}
                                  placeholder="Descripción..."
                                  value={form.description}
                                  className="px-3 py-2 w-full border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Enviar
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white  hover:bg-red-700 sm:mt-0  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
