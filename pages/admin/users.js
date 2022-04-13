import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import DataTable from "react-data-table-component";
import { useState, useEffect, useMemo } from "react";
import { data } from "autoprefixer";

const styles = {};

export default function AdminIndex() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataTable, setDataTable] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {}, [filter]);

  useEffect(() => {
    loadUsers();
  }, [filter]);

  async function getUsers() {
    const res = await fetch("/api/users?name=" + filter, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.text();
  }

  const loadUsers = () => {
    getUsers()
      .then((response) => JSON.parse(response))
      .then((data) => {
        setDataTable(data);
      });
  };

  const columns = [
    {
      name: "Usuario",
      selector: (row) => row.name,
      width: "220px",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      width: "110px",
    },
    {
      name: "Baneado",
      center: true,
      cell: (row) => (
        <a href="#">
          {row.banned ? (
            <span className="text-lg font-black text-red-700">X</span>
          ) : (
            <i class="fa fa-check text-green-600"></i>
          )}
        </a>
      ),
      width: "100px",
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
              <input
                placeholder="Buscar..."
                className="m-auto form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={(e) => setFilter(e.target.value)}
              />
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
