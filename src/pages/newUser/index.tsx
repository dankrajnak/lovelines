import { Button, Divider, Space, Typography } from "antd";

import CenterLayout from "../../temp/Layout/CenterLayout";
import SEO from "../../temp/Utilities/SEO";
import NeuCard from "../../temp/UI/NeuCard";
import withLoggedIn from "../../temp/Utilities/withLoggedIn";
import Link from "next/link";

const { Title, Text } = Typography;
const NewUser = () => (
  <>
    <SEO title="Welcome!" />
    <CenterLayout height="100vh">
      <NeuCard width="400px">
        <Space direction="vertical" wrap>
          <Title level={2}>Welcome</Title>
          <Text>
            Welcome to Love Lines. Just need to get a couple things out of the
            way. Ready to start?
          </Text>
          <Divider />
          <Link href="/newUser/info">
            <Button type="primary" href="/newUser/info">
              Great, let's get started
            </Button>
          </Link>
        </Space>
      </NeuCard>
    </CenterLayout>
  </>
);

export default withLoggedIn(NewUser);
