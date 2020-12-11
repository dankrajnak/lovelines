import ColorInterpolate from "color-interpolate";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import Popover from "react-popover";
import Colors from "../styles/colors";
import Circle from "../UI/Circle";
import SEO from "../utilities/SEO";
import { List } from "immutable";
import { atom, useRecoilState } from "recoil";
import useDimensions from "../hooks/useDimensions";

const NUM_INTENSITIES = 5;

const LOVE_COLORS = [Colors.red, Colors.blue, Colors.orange, Colors.green].map(
  (color) => ({
    color,
    interpolator: ColorInterpolate([Colors.white, color]),
  })
);

const totalCount = 2000;
const dates = new Array(totalCount).fill(0).map((_, i) => {
  const date = new Date();
  const newMonth = date.getMonth() - (i % 12);
  const newYear = date.getFullYear() - Math.floor(i / 12);
  date.setMonth(newMonth);
  date.setFullYear(newYear);
  return date;
});

const range = (start: number, end: number) =>
  new Array(end - start + 1).fill(0).map((_, ind) => ind + start);

type Address = {
  rowIndex: number;
  columnIndex: number;
};

const CELL_STATE = atom<
  List<
    List<{
      intensity: number;
      selected: boolean;
    }>
  >
>({
  key: "newStoryCellState",
  default: List([
    List(
      Array(totalCount).fill({
        intensity: 0,
        selected: false,
      })
    ),
    List(
      Array(totalCount).fill({
        intensity: 0,
        selected: false,
      })
    ),
  ]),
});

const POPOVER_STATE = atom<Address | null>({
  key: "newStoryPopoverState",
  default: null,
});

const MAIN_SELECT_STATE = atom<Address | null>({
  key: "newStoryMainSelectState",
  default: null,
});

const SECOND_SELECT_STATE = atom<Address | null>({
  key: "newStorySecondSelectState",
  default: null,
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
      <div
        className="cell"
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    </Popover>
    <style jsx>
      {`
        .cell {
          border-radius: 10px;
          box-shadow: 11px 11px 22px #c4c3c3, -11px -11px 22px #ffffff;
          background-color: ${Colors.white};
          width: 150px;
          height: 60px;
        }

        .cell:hover {
          cursor: pointer;
        }
      `}
    </style>
    <style jsx>
      {`
        .cell {
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

const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  const [love, setLove] = useRecoilState(CELL_STATE);
  const [mainSelect, setMainSelect] = useRecoilState(MAIN_SELECT_STATE);
  const [secondSelect, setSecondSelct] = useRecoilState(SECOND_SELECT_STATE);
  const [popOverOpen, setPopOverOpen] = useRecoilState(POPOVER_STATE);

  if (columnIndex === 0 && rowIndex === 0) {
    return <div style={style} />;
  }
  if (columnIndex === 0) {
    return (
      <div style={style}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {new Intl.DateTimeFormat("default", {
            month: "short",
            year: "numeric",
          }).format(dates[rowIndex])}
        </div>
      </div>
    );
  }
  if (rowIndex === 0) {
    if (columnIndex % 2 !== 0) {
      return (
        <div style={style}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <div>
              Love{" "}
              <Circle
                color={
                  LOVE_COLORS[((columnIndex - 1) / 2) % LOVE_COLORS.length]
                    .color
                }
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={style}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <div>
            Heartbreak{" "}
            <Circle
              color={
                LOVE_COLORS[((columnIndex - 2) / 2) % LOVE_COLORS.length].color
              }
            />
          </div>
        </div>
      </div>
    );
  }
  const xPos = columnIndex - 1;
  const yPos = rowIndex - 1;
  const lineIndex = xPos % 2 === 0 ? xPos / 2 : (xPos - 1) / 2;

  return (
    <div style={style}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoveCell
          isSelected={love.getIn([xPos, yPos]).selected}
          colorInterpolator={
            LOVE_COLORS[lineIndex % LOVE_COLORS.length].interpolator
          }
          intensity={love.getIn([xPos, yPos]).intensity}
          popOverIsOpen={
            popOverOpen &&
            popOverOpen.rowIndex === yPos &&
            popOverOpen.columnIndex === xPos
          }
          onMouseEnter={() => {
            // Set all the selected cells

            if (
              mainSelect &&
              !secondSelect &&
              mainSelect.columnIndex === xPos
            ) {
              setPopOverOpen({ rowIndex: yPos, columnIndex: xPos });
              setLove((luv) =>
                luv.update(xPos, (line) =>
                  line.withMutations((mutLine) => {
                    mutLine.forEach((_, i) => {
                      if (i !== mainSelect.rowIndex) {
                        mutLine.update(i, (val) => ({
                          ...val,
                          selected: false,
                        }));
                      }
                    });

                    range(
                      Math.min(mainSelect.rowIndex, yPos),
                      Math.max(mainSelect.rowIndex, yPos)
                    ).forEach((i) => {
                      mutLine.update(i, (l) => ({ ...l, selected: true }));
                    });
                  })
                )
              );
            }
          }}
          onClick={() => {
            const address = {
              rowIndex: yPos,
              columnIndex: xPos,
            };
            if (
              mainSelect &&
              address.rowIndex === mainSelect.rowIndex &&
              address.columnIndex === mainSelect.columnIndex
            ) {
              setMainSelect(null);
              setPopOverOpen(null);
            } else if (
              mainSelect &&
              !secondSelect &&
              address.columnIndex === mainSelect.columnIndex
            ) {
              setSecondSelct(address);
              setPopOverOpen(address);
              setLove((luv) =>
                luv.update(xPos, (line) =>
                  line.withMutations((mutLine) => {
                    mutLine.forEach((_, i) => {
                      if (i !== mainSelect.rowIndex) {
                        mutLine.update(i, (val) => ({
                          ...val,
                          selected: false,
                        }));
                      }
                    });

                    range(
                      Math.min(mainSelect.rowIndex, yPos),
                      Math.max(mainSelect.rowIndex, yPos)
                    ).forEach((i) => {
                      mutLine.update(i, (l) => ({ ...l, selected: true }));
                    });
                  })
                )
              );
            } else {
              setPopOverOpen(address);
              setMainSelect(address);
              setSecondSelct(null);
              // Unselect every cell.
              setLove((love) =>
                love.map((line) =>
                  line.withMutations((mutLine) =>
                    mutLine.forEach((_, cellI) =>
                      mutLine.update(cellI, (cell) => ({
                        ...cell,
                        selected: false,
                      }))
                    )
                  )
                )
              );
              setLove((l) =>
                l.updateIn([xPos, yPos], (val) => ({ ...val, selected: true }))
              );
            }
          }}
          onIntensitySelect={(intensity) => {
            setLove((sl) =>
              sl.update(xPos, (sline) =>
                sline.withMutations((mutSline) => {
                  mutSline.forEach((val, i) => {
                    if (val.selected) {
                      mutSline.update(i, (cell) => ({
                        ...cell,
                        intensity,
                        selected: false,
                      }));
                    }
                  });
                })
              )
            );
            setMainSelect(null);
            setPopOverOpen(null);
          }}
        />
      </div>
    </div>
  );
};

const NewStory = () => {
  const [love, setLove] = useRecoilState(CELL_STATE);
  const [ref, dimensions] = useDimensions();
  return (
    <>
      <SEO title="New Story" />
      <div className="top-menu-holder">
        <div className="buttons">
          <button
            onClick={() =>
              setLove((l) =>
                l
                  .push(
                    List(
                      Array(totalCount).fill({
                        intensity: 0,
                        selected: false,
                      })
                    )
                  )
                  .push(
                    List(
                      Array(totalCount).fill({
                        intensity: 0,
                        selected: false,
                      })
                    )
                  )
              )
            }
          >
            +
          </button>
          <button
            onClick={() => setLove((l) => (l.size > 2 ? l.pop().pop() : l))}
          >
            -
          </button>
        </div>
      </div>
      <div ref={ref} className="line-holder">
        {dimensions && (
          <FixedSizeGrid
            columnCount={1 + love.size}
            columnWidth={170}
            height={dimensions?.height}
            rowCount={totalCount}
            rowHeight={80}
            width={dimensions?.width}
          >
            {Cell}
          </FixedSizeGrid>
        )}
      </div>
      <style jsx>
        {`
          .top-menu-holder {
            position: fixed;
            top: 30px;
            width: 100%;
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
            position: fixed;
            top: 100px;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
          }
        `}
      </style>
    </>
  );
};

export default NewStory;
