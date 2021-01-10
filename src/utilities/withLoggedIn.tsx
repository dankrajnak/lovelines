import { Spin } from "antd";
import { Session, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import CenterLayout from "../layout/CenterLayout";
import SEO from "./SEO";

const DefaultLoader = () => (
  <>
    <SEO />
    <CenterLayout height="100vh" />
    <Spin />
  </>
);

const getDisplayName = (WrappedComponent: React.ComponentType<any>) =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withLoggedIn = <T extends Record<string, unknown>>(
  LoggedIn: React.ComponentType<T & { session: Session }>,
  Loading: React.ComponentType<T> = DefaultLoader
): React.FunctionComponent<T> => {
  const NewComponent = (props: T) => {
    const [session, loading] = useSession();
    const router = useRouter();

    if (session) {
      return <LoggedIn {...props} session={session} />;
    }
    if (loading) {
      return <Loading {...props} />;
    }
    // User is not logged in, redirect to homepage.
    router.replace("/");
    return null;
  };

  NewComponent.displayName = getDisplayName(LoggedIn);

  return NewComponent;
};

export default withLoggedIn;
