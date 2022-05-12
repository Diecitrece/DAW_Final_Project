import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

const styles = {};

export default function AdminRoles() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const getRoles = async () => {
    const res = await fetch("/api/users");
    return await res.text();
  };

  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const loadRoles = () => {
    getRoles()
      .then((response) => JSON.parse(response))
      .then((data) => {
        let groupedRoles = groupBy(data, "role");
        let x = Object.keys(groupedRoles);
        x.map((key, i) => {
          let newRole = {
            name: x[i],
            total: groupedRoles[key].length,
          };
          setDataTable((oldRoles) => [...oldRoles, newRole]);
        });
      });
  };

  const columns = [
    {
      name: "Rol",
      selector: (row) => row.name,
      width: "350px",
      sortable: true,
    },
    {
      name: "Nº Personas",
      selector: (row) => row.total,
      sortable: true,
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
