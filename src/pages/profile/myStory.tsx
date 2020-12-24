import useRequest from "../../Hooks/useRequest";
import NavbarLayout, { NAVBAR_HEIGHT } from "../../Layout/NavbarLayout";
import SEO from "../../Utilities/SEO";
import { GetStoryForCurrentUserReturnType } from "../api/story/forCurrentUser";
import { useEffect } from "react";
import CenterLayout from "../../Layout/CenterLayout";

const getMyStory = (): Promise<GetStoryForCurrentUserReturnType> =>
  fetch("/api/story/forCurrentUser", { method: "GET" }).then((resp) =>
    resp.json()
  );

const MyStory = () => {
  const [myStoryState, getStory] = useRequest(getMyStory);
  useEffect(() => {
    getStory();
  }, [getStory]);

  return (
    <NavbarLayout>
      <CenterLayout>
        <div style={{ height: NAVBAR_HEIGHT }} />
        <SEO title="My Story" />
        {myStoryState.data ? (
          <>
            Here's your story:{" "}
            <pre>{JSON.stringify(myStoryState.data, null, 2)}</pre>
          </>
        ) : (
          <>Loading...</>
        )}
      </CenterLayout>
    </NavbarLayout>
  );
};

export default MyStory;
