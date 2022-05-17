import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

export default function AdminReports() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataTable, setDataTable] = useState([]);
  const [review, setReview] = useState({});

  const getReports = async () => {
    const res = await fetch("/api/reports");
    return await res.text();
  };

  const getUserName = async (idUser) => {
    const res = await fetch(`/api/users?id=${idUser}`);
    return await res.name;
  };

  const loadReports = () => {
    getReports()
      .then((response) => JSON.parse(response))
      .then((data) => {
        setDataTable(data);
      });
  };

  const columns = [
    {
      name: "Usuario reportado",
      selector: (row) => getUserName(row.idUser),
      width: "220px",
      sortable: true,
    },
    {
      name: "Ofensivo",
      center: true,
      cell: (row) => {
        if (row.report.offensive) {
          return (
            <>
              <a href="#" onClick={() => deleteUser(row.idReview)}>
                <i class="fa fa-trash text-red-600"></i>
              </a>
            </>
          );
        } else {
          return (
            <>
              <a href="#" onClick={() => deleteUser(row.idReview)}>
                <i class="fa fa-trash text-red-600"></i>
              </a>
            </>
          );
        }
      },
      width: "100px",
    },
    {
      name: "Incoerente",
      center: true,
      cell: (row) => {
        if (row.report.irrealInfo) {
          return (
            <>
              <a href="#">
                <i class="fa fa-check text-green-600 text-lg"></i>
              </a>
            </>
          );
        } else {
          return (
            <>
              <a href="#">
                <i class="fa fa-ban text-red-600 text-lg"></i>
              </a>
            </>
          );
        }
      },
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
