import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AdminMenuBar } from "../../components/adminComponents/adminMenuBar";

export default function AdminReports() {
    const { data: session } = useSession();
    const router = useRouter();

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
                            <h1 className="w-3/5 text-6xl text-white text-center bg-red-900 rounded-lg mx-5">
                                Esta pagina esta contruyendose
                            </h1>
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
