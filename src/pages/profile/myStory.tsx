import useRequest from "../../Hooks/useRequest";
import NavbarLayout, { NAVBAR_HEIGHT } from "../../Layout/NavbarLayout";
import SEO from "../../Utilities/SEO";
import { GetStoryForCurrentUserReturnType } from "../api/story/forCurrentUser";
import React, { useEffect } from "react";
import CenterLayout from "../../Layout/CenterLayout";
import StoryComp from "../../UI/Story";

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
        {myStoryState.data?.data ? (
          <>
            Here's your story: <StoryComp story={myStoryState.data.data} />
          </>
        ) : (
          <>Loading...</>
        )}
      </CenterLayout>
    </NavbarLayout>
  );
};

export default MyStory;
