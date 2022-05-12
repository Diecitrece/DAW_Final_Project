import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession, getSession } from "next-auth/react";

const Report = ({ setOpen ,open }) => {
  const cancelButtonRef = useRef(null);

  //const [open, setOpen] = useState(false);

  const { data: session } = useSession();


  return (
    <>
      <div className="flex flex-wrap ">
        
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
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
                <div
                  className="inline-block align-bottom bg-white rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <form >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className=" sm:flex sm:items-start">
                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Reportar review
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className=" mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                              
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="first_name"
                                  className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                  Puntuación
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                  <select
                                    name="rating"
                                    
                                    required
                                    className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                  >
                                    <option value="1">Falta de repeto</option>
                                    <option value="2">Lenguaje inapropiado</option>
                                    <option value="3">Incitación al odio</option>
                                  </select>
                                </div>
                              </div>
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="description"
                                  className="block text-sm  font-medium leading-5 text-gray-700"
                                >
                                  Descripción
                                </label>
                                <div className="">
                                  <textarea
                                    id="description"
                                    name="description"
                                    type="text"
                                    
                                    required
                                    placeholder="Describe el reporte..."
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
                        className="w-full inline-flex justify-center rounded-md
                   border border-transparent shadow-sm px-4 py-2 bg-blue-600
                    text-base font-medium text-white hover:bg-blue-700 
                     sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Enviar
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center
                    rounded-md border border-gray-300 shadow-sm px-4 py-2
                   bg-red-500 text-base font-medium text-white
                    hover:bg-red-700 sm:mt-0
                      sm:ml-3 sm:w-auto sm:text-sm"
                        
                        ref={cancelButtonRef}
                        onClick={() => {
                          setOpen(false);
                        }}
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
      </div>
    </>
  );
}


export default Report;