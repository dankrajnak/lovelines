import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  icon: React.ReactNode;
  text: string;
  onClick: () => any;
  description?: string;
  loading?: boolean | null | undefined;
};

const SecondaryNavButton: React.FunctionComponent<Props> = ({
  icon,
  text,
  onClick,
  description,
  loading,
}) => (
  <span style={{ display: "flex", alignItems: "center" }}>
    <button onClick={onClick} title={description} disabled={!!loading}>
      <span>{loading ? <LoadingOutlined /> : icon}</span>
      {text}
    </button>
    <style jsx>
      {`
        button {
          min-width: 150px;
          font-weight: 400;
          height: 100%;
          padding: 5px 20px;
          border: none;
          background: none;
        }

        button > span {
          margin-right: 5px;
        }

        button:hover {
          background: #ddd;
        }
      `}
    </style>
  </span>
);
export default SecondaryNavButton;
