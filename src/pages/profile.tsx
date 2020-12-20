import { Person } from "@prisma/client";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSwr from "swr";
import CenterLayout from "../Layout/CenterLayout";
import NavbarLayout from "../Layout/NavbarLayout";

const Profile: React.FunctionComponent = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { data } = useSwr(
    "/api/test",
    (url): Promise<Person> =>
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ foo: 6 }),
      }).then((res) => res.json())
  );
  useEffect(() => {
    if (!session && !loading) {
      signIn();
    }
  }, [loading, router, session]);

  return (
    <NavbarLayout>
      <CenterLayout height="100vh">
        <h1>Hey, {data?.name}</h1>
        {/* <button onClick={() => mutate({ ...data, name: "MICHAEL" })}>
          mutate
        </button> */}
      </CenterLayout>
    </NavbarLayout>
  );
};

export default Profile;
