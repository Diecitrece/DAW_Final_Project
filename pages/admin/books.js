import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import DataTable from "react-data-table-component";
import { useState, useEffect, useMemo } from "react";

const styles = {};

export default function AdminIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataTable, setDataTable] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadBooks();
  }, [filter]);

  const getBooks = async () => {
    const res = await fetch("/api/books?name=" + filter);
    return await res.text();
  };

  const deleteBook = async (id) => {
    const res = await fetch("/api/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    loadBooks();
  };

  const loadBooks = () => {
    getBooks()
      .then((response) => JSON.parse(response))
      .then((data) => {
        setDataTable(data);
      });
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      width: "350px",
      sortable: true,
    },
    {
      name: "ISBN",
      selector: (row) => row.ISBN,
      sortable: true,
    },
    {
      name: "Reseñas",
      cell: (row) => (
        <>
          <div className="flex space-x-4">
            <span>{row.reviews.length}</span>
            <a href={"/admin/books/reviews?id=" + row._id}>
              <i class="fa fa-eye text-base"></i>
            </a>
          </div>
        </>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <div className="flex space-x-4">
            <a
              href={
                "/admin/books/edit?id=" +
                row._id +
                "&name=" +
                row.name +
                "&ISBN=" +
                row.ISBN
              }
            >
              <i class="fa fa-pen text-green-600"></i>
            </a>
            <a href="#" onClick={() => deleteBook(row._id)}>
              <i class="fa fa-trash text-red-600"></i>
            </a>
          </div>
        </>
      ),
    },
  ];

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rangeSeparatorText: "de",
  };

  if (typeof window === "undefined") {
    return null;
  }
  if (session) {
    if (session.user.role == "Admin") {
      return (
        <>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
            rel="stylesheet"
          />
          <div className="flex flex-row w-full h-full">
            <AdminMenuBar />
            <div className="m-auto w-1/2">
              <div className="flex w-1/4">
                <input
                  placeholder="Buscar..."
                  className="m-auto form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => setFilter(e.target.value)}
                />
                <a href="/admin/books/new" className="w-min h-min m-auto ml-4">
                  <i className="fa fa-plus text-green-600 text-2xl"></i>
                </a>
              </div>
              <DataTable
                columns={columns}
                data={dataTable}
                pagination
                paginationComponentOptions={paginationComponentOptions}
              />
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
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
