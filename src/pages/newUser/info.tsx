import { Button, DatePicker, Space, Form, Steps, message } from "antd";
import CenterLayout from "../../layout/CenterLayout";
import SEO from "../../Utilities/SEO";
import NeuCard from "../../ui/NeuCard";
import withLoggedIn from "../../Utilities/withLoggedIn";
import moment, { Moment } from "moment";
import axios from "axios";
import {
  LoadingOutlined,
  SolutionOutlined,
  HighlightOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import useRequest from "../../hooks/useRequest";
import { APISetAgeRequest } from "../api/person/setAge";

const { Step } = Steps;

const submitBirthdayService = (year: number, month: number, day: number) =>
  axios
    .post("/api/person/setAge", {
      year,
      month,
      day,
    } as APISetAgeRequest)
    .then((resp) => resp.data);

const NewUser = () => {
  const defaultDate = moment().subtract(25, "years").startOf("year");
  const [submitState, submitAge] = useRequest(submitBirthdayService);
  return (
    <>
      <SEO title="Welcome!" />
      <CenterLayout height="100vh" key={1}>
        <NeuCard width="800px">
          <Steps>
            <Step
              status="process"
              title="Info"
              icon={
                submitState.isLoading ? (
                  <LoadingOutlined />
                ) : (
                  <SolutionOutlined />
                )
              }
            />
            <Step status="wait" title="Story" icon={<HighlightOutlined />} />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
          <Space direction="vertical" wrap>
            <Form
              requiredMark={false}
              layout="vertical"
              initialValues={{ birthday: defaultDate }}
              onFinish={({ birthday }: { birthday: Moment }) => {
                const year = birthday.year();
                const month = birthday.month();
                const day = birthday.day();
                submitAge(year, month, day).catch((_) => {
                  message.error("There was an error saving your birthday");
                });
              }}
            >
              <Form.Item
                label="What month where you born in?"
                name="birthday"
                tooltip="We use this to show love lines in terms of age"
              >
                <DatePicker
                  allowClear={false}
                  format="MM/YYYY"
                  disabledDate={(date) =>
                    date?.isAfter(moment().subtract(12, "years"))
                  }
                  picker="month"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={submitState.isLoading}
              >
                Next
              </Button>
            </Form>
          </Space>
        </NeuCard>
      </CenterLayout>
    </>
  );
};

export default withLoggedIn(NewUser);
