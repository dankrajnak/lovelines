import ColorInterpolate from "color-interpolate";
import Colors from "../styles/colors";
import Circle from "../UI/Circle";
import SEO from "../utilities/SEO";

const totalCount = 200;
const redToWhite = ColorInterpolate([Colors.white, Colors.red]);
const blueToWhite = ColorInterpolate([Colors.blue, Colors.white]);

const NewStory = () => {
  const dates = new Array(totalCount).fill(0).map((_, i) => {
    const date = new Date();
    const newMonth = date.getMonth() - (i % 12);
    const newYear = date.getFullYear() - Math.floor(i / 12);
    date.setMonth(newMonth);
    date.setFullYear(newYear);
    return date;
  });
  return (
    <>
      <SEO title="New Story" />
      <div className="line-holder">
        <table className="line">
          <thead>
            <tr>
              <th />
              <th>
                Love <Circle color={Colors.red} />
              </th>
              <th>
                Heartbreak <Circle color={Colors.red} />
              </th>
              <th>
                Love <Circle color={Colors.blue} />
              </th>
              <th>
                Heartbreak <Circle color={Colors.blue} />
              </th>
            </tr>
          </thead>
          <tbody>
            {new Array(totalCount).fill(0).map((_, i) => (
              <tr key={i}>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {new Intl.DateTimeFormat("default", {
                    month: "short",
                    year: "numeric",
                  }).format(dates[i])}
                </td>
                <td
                  style={{
                    backgroundColor: redToWhite((i % 5) / 4),
                  }}
                />
                <td />
                <td
                  style={{
                    backgroundColor: blueToWhite(((Math.random() * 6) % 5) / 4),
                  }}
                />
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .top-menu-holder {
            position: fixed;
            top: 30px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            z-index: 3;
          }
          .top-menu-holder .buttons {
            width: 400px;
            display: flex;
            height: 30px;
            border-radius: 8px;
            box-shadow: 3px 3px 6px #cbcaca, -3px -3px 6px #ffffff;
            background: #efeeee;

            overflow-x: hidden;
          }
          .top-menu-holder .buttons button {
            flex-grow: 1;
            margin: 0;
            border: none;
          }
          .top-menu-holder .buttons button:hover {
            cursor: pointer;
          }

          .line-holder {
            display: flex;
            width: 800px;
            margin: 90px auto;
          }

          .line-holder .line {
            table-layout: fixed;

            border-spacing: 20px;
             {
              /* box-shadow: 11px 11px 22px #c4c3c3, -11px -11px 22px #ffffff; */
            }
            background-color: ${Colors.white};

            border-radius: 15px;
            padding: 0 30px;
             {
              /* margin-right: 120px; */
            }
          }

          .line th {
            font-weight: lighter;
            padding-bottom: 10px;
          }

          .line tbody tr:first-child td:first-child {
            border-top-left-radius: 8px;
          }
          .line tbody tr:first-child td:last-child {
            border-top-right-radius: 8px;
          }

          .line tbody tr:last-child td:first-child {
            border-bottom-left-radius: 8px;
          }
          .line tbody tr:last-child td:last-child {
            border-bottom-right-radius: 8px;
          }

          .line-holder .line td {
            width: 150px;
          }
          .line-holder .line tr td {
            height: 60px;
          }
          .line-holder .line tbody tr td:not(:nth-child(1)) {
            border-radius: 10px;
            box-shadow: 11px 11px 22px #c4c3c3, -11px -11px 22px #ffffff;
            background-color: ${Colors.white};
          }
        `}
      </style>
    </>
  );
};

export default NewStory;
