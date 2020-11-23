import ColorInterpolate from "color-interpolate";
import { Fragment, useState } from "react";
import Colors from "../styles/colors";
import Circle from "../UI/Circle";
import SEO from "../utilities/SEO";

type LoveAmount = 1 | 2 | 3 | 4 | 5;
const LOVE_COLORS = [Colors.red, Colors.blue, Colors.orange].map((color) => ({
  color,
  interpolator: ColorInterpolate([Colors.white, color]),
}));
const totalCount = 200;
const dates = new Array(totalCount).fill(0).map((_, i) => {
  const date = new Date();
  const newMonth = date.getMonth() - (i % 12);
  const newYear = date.getFullYear() - Math.floor(i / 12);
  date.setMonth(newMonth);
  date.setFullYear(newYear);
  return date;
});

const NewStory = () => {
  const [love, setLove] = useState<
    { love: LoveAmount; heartbreak: LoveAmount }[][]
  >([
    Array(totalCount).fill({
      heartbreak: 0,
      love: 0,
    }),
  ]);

  return (
    <>
      <SEO title="New Story" />
      <div className="top-menu-holder">
        <div className="buttons">
          <button
            onClick={() =>
              setLove((l) => [
                ...l,
                Array(totalCount).fill({ heartbreak: 0, love: 0 }),
              ])
            }
          >
            +
          </button>
          <button
            onClick={() =>
              setLove((l) => l.slice(0, Math.max(1, l.length - 1)))
            }
          >
            -
          </button>
        </div>
      </div>
      <div className="line-holder">
        <table className="line">
          <thead>
            <tr>
              <th />
              {love.map((_, i) => (
                <Fragment key={i}>
                  <th>
                    Love{" "}
                    <Circle color={LOVE_COLORS[i % LOVE_COLORS.length].color} />
                  </th>
                  <th>
                    Heartbreak{" "}
                    <Circle color={LOVE_COLORS[i % LOVE_COLORS.length].color} />
                  </th>
                </Fragment>
              ))}
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
                {love.map((line, lineI) => (
                  <Fragment key={lineI}>
                    <td
                      style={{
                        backgroundColor: LOVE_COLORS[
                          lineI % LOVE_COLORS.length
                        ].interpolator(line[i]?.love / 5 || 0),
                      }}
                      onClick={() =>
                        setLove((sl) =>
                          sl.map((sline, slineI) => {
                            if (slineI === lineI) {
                              return sline.map((slineLove, slineLoveI) =>
                                slineLoveI === i
                                  ? {
                                      ...slineLove,
                                      love: ((slineLove.love + 1) %
                                        6) as LoveAmount,
                                    }
                                  : slineLove
                              );
                            }
                            return sline;
                          })
                        )
                      }
                    />
                    <td
                      key={lineI}
                      style={{
                        backgroundColor: LOVE_COLORS[
                          lineI % LOVE_COLORS.length
                        ].interpolator(line[i]?.heartbreak / 5 || 0),
                      }}
                      onClick={() =>
                        setLove((sl) =>
                          sl.map((sline, slineI) => {
                            if (slineI === lineI) {
                              return sline.map((slineLove, slineLoveI) =>
                                slineLoveI === i
                                  ? {
                                      ...slineLove,
                                      heartbreak: ((slineLove.heartbreak + 1) %
                                        6) as LoveAmount,
                                    }
                                  : slineLove
                              );
                            }
                            return sline;
                          })
                        )
                      }
                    />
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>
        {`
          .top-menu-holder {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            z-index: 3;
          }
          .top-menu-holder .buttons {
            display: flex;
          }

          .top-menu-holder .buttons button {
            flex-grow: 1;
            margin: 0;
            border: none;
            background-color: #efeeee;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            box-shadow: 3px 3px 6px #cbcaca, -3px -3px 6px #ffffff;
            background: #efeeee;
            margin-left: 20px;
          }
          .top-menu-holder .buttons button:hover {
            cursor: pointer;
          }

          .line-holder {
            display: flex;
            min-width: 800px;
            margin: 40px auto;
          }

          .line-holder .line {
            table-layout: fixed;

            border-spacing: 20px;
            background-color: ${Colors.white};

            border-radius: 15px;
            padding: 0 30px;
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

          .line-holder .line tbody tr td:not(:nth-child(1)):hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default NewStory;
