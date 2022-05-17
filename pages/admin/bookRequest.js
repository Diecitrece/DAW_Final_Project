import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

const styles = {};

export default function AdminBookRequest() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    loadRequests();
  }, [data]);

  const getRequests = async () => {
    const res = await fetch("/api/requests");
    return await res.text();
  };

  const deleteRequest = async (id) => {
    const res = await fetch("/api/requests", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    loadRequests();
  };

  const loadRequests = () => {
    getRequests()
      .then((response) => JSON.parse(response))
      .then((data) => {
        setDataTable(data);
      });
  };

  const columns = [
    {
      name: "Autor",
      selector: (row) => row.author,
      width: "100px",
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      width: "200px",
    },
    {
      name: "Descripción",
      selector: (row) => (
        <>
          <span className="whitespace-normal">{row.description}</span>
        </>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <>
          <div className="flex flex-row space-x-4">
            <a href={"/admin/books/new/?id="+row._id}>
              <i className="fa fa-plus text-green-600"></i>
            </a>
            <a href="#" onClick={() => deleteRequest(row._id)}>
              <i class="fa fa-trash text-red-600"></i>
            </a>
          </div>
        </>
      ),
      width: "70px",
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
