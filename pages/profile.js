import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();

    const styles = 
    {

    }
    if (typeof window === "undefined") {
        return null;
    }
    if (session) {
        useEffect(async () =>
        {
            let url = './api/user';
            const response = await fetch(url, 
                {
                    method: "GET",
                });
            console.log(response);
        }, [])
        return(
            <div class='showBox'>
                <div>
                    <img></img>
                </div>
                <div>
                    <p>name</p>
                    <p>email</p>
                    <p>Baneado (variable)</p>
                </div>
            </div>
        )
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
