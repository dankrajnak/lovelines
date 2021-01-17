import SEO from "../Utilities/SEO";
import Colors, { ColorsA } from "../Styles/colors";
import useScrollPosition from "@react-hook/window-scroll";
import FadeIn from "../UI/FadeIn";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Container from "../UI/Container";
import { signIn } from "next-auth/client";
import { CSSProperties } from "react";

const { Title, Paragraph, Text } = Typography;

const SVG_WIDTH = 768;
const SVG_HEIGHT = 1985;

const SCROLL_RATIO = 1.8;

const ContainerStyle: CSSProperties = {
  backgroundBlendMode: "lighten",
  backgroundColor: ColorsA.white(0.7),
};

const CenteredAbsolute: React.FunctionComponent<{
  top?: string | null;
  bottom?: string;
}> = ({ children, top, bottom }) => (
  <>
    <div className="centered-absolute">{children}</div>
    <style jsx>{`
      .centered-absolute {
        ${top != null ? `top: ${top};` : ""}
        ${bottom != null ? `bottom: ${bottom};` : ""}
        position: absolute;
        display: flex;
        width: 100%;
        z-index: 1000;
        justify-content: center;
      }
    `}</style>
  </>
);

const Home = () => {
  const scrollY = useScrollPosition(60);
  const progress = scrollY * SCROLL_RATIO;

  return (
    <>
      <SEO />
      <CenteredAbsolute>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            width: 100,
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FadeIn>
            <Container style={ContainerStyle}>
              <Title level={1} style={{ textAlign: "center" }}>
                Hey There.
              </Title>
              <Paragraph>
                Welcome to Love Lines, an interactive art project exploring our
                relationship to love and heartbreak.
              </Paragraph>
            </Container>
          </FadeIn>
        </div>
      </CenteredAbsolute>
      <CenteredAbsolute bottom="8%" top={null}>
        <FadeIn rootMargin="-90% 0px 0px 0px">
          <div>
            Scroll <CaretDownOutlined />
          </div>
        </FadeIn>
      </CenteredAbsolute>
      <CenteredAbsolute top="100vh">
        <FadeIn>
          <Container style={ContainerStyle}>
            <Title level={1}>Why love and heartbreak?</Title>
            <Paragraph>
              The way that we experience love and heartbreak is intensely
              personal, yet these experiences are something that we all share
              in. In other words, love, and unfortunately heartbreak, are
              experiences which have the unique property of being simultaneously{" "}
              <Text strong>personal</Text> and <Text strong>universal</Text>.
            </Paragraph>
            <Paragraph>
              Focusing on these feelings gives us a chance to tie together
              intensely personal experiences into a{" "}
              <Text strong>common visual language</Text>
            </Paragraph>
          </Container>
        </FadeIn>
      </CenteredAbsolute>
      <CenteredAbsolute top="200vh">
        <FadeIn>
          <Container style={ContainerStyle}>
            <Title level={1}>What does your love story look like?</Title>
            <Paragraph>
              This isn't about comparing yourself to others. It's not about
              verifying that you're on the right path. It's about seeing that
              you're a part of something.
            </Paragraph>
            <Paragraph>
              To continue, you'll need to sign in. This is mostly so robots
              can't spam this site. Don't worry, you aren't being tracked, and
              you don't need to submit any information unless you want to, and
              any information you share will only be shown to others
              anonymously.
            </Paragraph>
            <Button
              type="primary"
              onClick={() => {
                signIn(null as any, {
                  callbackUrl: `http://${window.location.host}/profile`,
                });
              }}
            >
              Start
            </Button>
          </Container>
        </FadeIn>
      </CenteredAbsolute>
      <div className="path-container">
        <div className="path-holder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M 240 0 S 420 0 440 160 S 240 240 240 400 S 386.6667 533.3333 460 600 S 313.3333 706.6667 240 760 S 460 840 520 1000 S 304.6667 1118 197 1177 S 519.6667 1352.3333 600 1439 S 792 1324 643 1293 S 261 1425 251 1538 S 483.6667 1694.6667 600 1773 S 726.6667 1983.6667 662 2082"
              stroke={Colors.red}
              strokeDashoffset={`${-progress + 1000}px`}
              strokeDasharray={`${progress + 1000}px 10000000px`}
              strokeWidth="6"
              fill="none"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <style jsx>{`
        .path-container {
          display: flex;
          justify-content: center;
          width: 100%;
          height: ${SVG_HEIGHT}px;
        }
        .path-holder {
          position: absolute;
        }

        .path-holder svg {
          width: 100vw;
          max-width: ${SVG_WIDTH}px;
          height: 260vh;
        }
      `}</style>
    </>
  );
};

export default Home;
