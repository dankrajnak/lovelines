import { IconDefinition, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconDefinition;
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
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          style={{ marginRight: 5 }}
          fixedWidth
          size="sm"
          spin
        />
      ) : (
        <FontAwesomeIcon
          icon={icon}
          style={{ marginRight: 5 }}
          fixedWidth
          size="sm"
        />
      )}
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

        button:hover {
          background: #ddd;
        }
      `}
    </style>
  </span>
);
export default SecondaryNavButton;
