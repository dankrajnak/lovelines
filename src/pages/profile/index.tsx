import { Person } from "@prisma/client";
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import useSwr from "swr";
import CenterLayout from "../../Layout/CenterLayout";
import NavbarLayout from "../../Layout/NavbarLayout";
import Link from "next/link";
import SEO from "../../Utilities/SEO";

const Profile: React.FunctionComponent = () => {
  const [session, loading] = useSession();
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
  }, [loading, session]);

  return (
    <NavbarLayout>
      <CenterLayout height="100vh">
        <SEO title="Profile" />
        <h1>Hey, {data?.name}</h1>
        <div>
          <Link href="/profile/newStory">Make a new story</Link>
        </div>
      </CenterLayout>
    </NavbarLayout>
  );
};

export default Profile;
