import useRequest from "../../hooks/useRequest";
import NavbarLayout, { NAVBAR_HEIGHT } from "../../layout/NavbarLayout";
import SEO from "../../Utilities/SEO";
import { GetStoryForCurrentUserReturnType } from "../api/story/forCurrentUser";
import React, { useEffect } from "react";
import CenterLayout from "../../layout/CenterLayout";
import StoryComp from "../../ui/Story";

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
