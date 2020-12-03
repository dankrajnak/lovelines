import ColorInterpolate from "color-interpolate";
import Popover from "react-popover";
import { Fragment, useState } from "react";
import Colors from "../styles/colors";
import Circle from "../UI/Circle";
import SEO from "../utilities/SEO";

const NUM_INTENSITIES = 5;

const LOVE_COLORS = [Colors.red, Colors.blue, Colors.orange, Colors.green].map(
  (color) => ({
    color,
    interpolator: ColorInterpolate([Colors.white, color]),
  })
);

const totalCount = 20;
const dates = new Array(totalCount).fill(0).map((_, i) => {
  const date = new Date();
  const newMonth = date.getMonth() - (i % 12);
  const newYear = date.getFullYear() - Math.floor(i / 12);
  date.setMonth(newMonth);
  date.setFullYear(newYear);
  return date;
});

const LoveCell = (props: {
  colorInterpolator: (index: number) => string;
  intensity: number;
  isSelected?: boolean | null;
  popOverIsOpen?: boolean | null;
  onClick?: () => any;
  onIntensitySelect?: (color: number) => any;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
}) => (
  <>
    <Popover
      body={
        <div
          style={{
            padding: 6,
            width: NUM_INTENSITIES * 30,
            justifyContent: "space-between",
            backgroundColor: Colors.white,
            display: "flex",
            borderRadius: 2,
            boxShadow:
              "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
          }}
        >
          {new Array(NUM_INTENSITIES).fill(0).map((_, i) => (
            <div
              onClick={() =>
                props.onIntensitySelect && props.onIntensitySelect(i)
              }
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 3,
                boxShadow: "3px 3px 6px #cbcaca, -3px -3px 6px #ffffff",
                backgroundColor: props.colorInterpolator(i / NUM_INTENSITIES),
              }}
            ></div>
          ))}
        </div>
      }
      isOpen={!!props.popOverIsOpen}
      preferPlace="below"
    >
      <td
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    </Popover>
    <style jsx>
      {`
        td {
          border-radius: 10px;
          box-shadow: 11px 11px 22px #c4c3c3, -11px -11px 22px #ffffff;
          background-color: ${Colors.white};
          width: 150px;
          height: 60px;
        }

        td:hover {
          cursor: pointer;
        }
      `}
    </style>
    <style jsx>
      {`
        td {
          background-color: ${props.colorInterpolator(
            props.intensity / NUM_INTENSITIES
          )};
          ${props.isSelected ? "border: 1px solid black" : ""}
        }
      `}
    </style>
    <style jsx global>
      {`
        .Popover-tipShape {
          fill: ${Colors.white};
        }
      `}
    </style>
  </>
);

const NewStory = () => {
  const [love, setLove] = useState<
    {
      love: number;
      heartbreak: number;
      loveSelected: boolean;
      heartbreakSelected: boolean;
    }[][]
  >([
    Array(totalCount).fill({
      heartbreak: 0,
      love: 0,
      lovePopoverOpen: false,
      heartbreakPopoverOpen: false,
      loveSelected: false,
      heartbreakSelected: false,
    }),
  ]);

  const [popOverOpen, setPopOverOpen] = useState<{
    lineIndex: number;
    rowIndex: number;
    isLove: boolean;
  } | null>(null);

  const [mainSelect, setMainSelect] = useState<{
    lineIndex: number;
    rowIndex: number;
    isLove: boolean;
  } | null>(null);

  const [hoveredCell, setHoveredCell] = useState<{
    lineIndex: number;
    rowIndex: number;
    isLove: boolean;
  } | null>(null);

  return (
    <>
      <SEO title="New Story" />
      <div className="top-menu-holder">
        <div className="buttons">
          <button
            onClick={() =>
              setLove((l) => [
                ...l,
                Array(totalCount).fill({
                  heartbreak: 0,
                  love: 0,
                  lovePopoverOpen: false,
                  heartbreakPopoverOpen: false,
                }),
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
                    <LoveCell
                      isSelected={
                        mainSelect &&
                        mainSelect.lineIndex === lineI &&
                        ((mainSelect.rowIndex === i && mainSelect.isLove) ||
                          (hoveredCell &&
                            hoveredCell.isLove &&
                            hoveredCell.lineIndex === lineI &&
                            Math.max(
                              hoveredCell.rowIndex,
                              mainSelect.rowIndex
                            ) >= i &&
                            i >=
                              Math.min(
                                hoveredCell.rowIndex,
                                mainSelect.rowIndex
                              )))
                      }
                      colorInterpolator={
                        LOVE_COLORS[lineI % LOVE_COLORS.length].interpolator
                      }
                      intensity={line[i].love}
                      popOverIsOpen={
                        mainSelect &&
                        popOverOpen &&
                        popOverOpen.rowIndex === i &&
                        popOverOpen.lineIndex === lineI &&
                        popOverOpen.isLove
                      }
                      onMouseEnter={() => {
                        const address = {
                          rowIndex: i,
                          lineIndex: lineI,
                          isLove: true,
                        };
                        setPopOverOpen(address);
                        setHoveredCell(address);
                      }}
                      onClick={() => {
                        const address = {
                          rowIndex: i,
                          lineIndex: lineI,
                          isLove: true,
                        };
                        if (
                          address.rowIndex === mainSelect?.rowIndex &&
                          address.lineIndex === mainSelect?.lineIndex &&
                          address.isLove === mainSelect?.isLove
                        ) {
                          console.log("AHHHHHH");
                          setMainSelect(null);
                          setPopOverOpen(null);
                        } else {
                          setPopOverOpen(address);
                          setMainSelect(address);
                        }
                      }}
                      onIntensitySelect={(intensity) => {
                        setLove((sl) =>
                          sl.map((sline, slineI) => {
                            if (slineI === lineI) {
                              return sline.map((slineLove, slineLoveI) =>
                                Math.max(
                                  hoveredCell.rowIndex,
                                  mainSelect.rowIndex
                                ) >= slineLoveI &&
                                slineLoveI >=
                                  Math.min(
                                    hoveredCell.rowIndex,
                                    mainSelect.rowIndex
                                  )
                                  ? {
                                      ...slineLove,
                                      love: intensity,
                                    }
                                  : slineLove
                              );
                            }
                            return sline;
                          })
                        );
                        setMainSelect(null);
                        setPopOverOpen(null);
                      }}
                    />
                    <LoveCell
                      popOverIsOpen={
                        popOverOpen &&
                        popOverOpen.rowIndex === i &&
                        popOverOpen.lineIndex === lineI &&
                        !popOverOpen.isLove
                      }
                      colorInterpolator={
                        LOVE_COLORS[lineI % LOVE_COLORS.length].interpolator
                      }
                      intensity={line[i].heartbreak}
                      onClick={() => {
                        const address = {
                          rowIndex: i,
                          lineIndex: lineI,
                          isLove: false,
                        };
                        setPopOverOpen(address);
                        setMainSelect(address);
                      }}
                      onIntensitySelect={(intensity) => {
                        setLove((sl) =>
                          sl.map((sline, slineI) => {
                            if (slineI === lineI) {
                              return sline.map((slineLove, slineLoveI) =>
                                slineLoveI === i
                                  ? {
                                      ...slineLove,
                                      heartbreak: intensity,
                                    }
                                  : slineLove
                              );
                            }
                            return sline;
                          })
                        );
                      }}
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

          tr:first-child td:first-child {
            border-top-left-radius: 8px;
          }
          tr:first-child td:last-child {
            border-top-right-radius: 8px;
          }

          tr:last-child td:first-child {
            border-bottom-left-radius: 8px;
          }
          tr:last-child td:last-child {
            border-bottom-right-radius: 8px;
          }

          .line th {
            font-weight: lighter;
            padding-bottom: 10px;
          }

          td {
            width: 150px;
            height: 60px;
          }
        `}
      </style>
    </>
  );
};

export default NewStory;
