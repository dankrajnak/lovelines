import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import Popover from "react-popover";
import Colors from "../../temp/Styles/colors";
import Circle from "../../temp/UI/Circle";
import SEO from "../../temp/Utilities/SEO";
import { List } from "immutable";
import { atom, useRecoilState } from "recoil";
import useDimensions from "../../temp/Hooks/useDimensions";
import NavbarLayout, { NAVBAR_HEIGHT } from "../../temp/Layout/NavbarLayout";
import SecondaryNavbarLayout, {
  SECONDARY_NAVBAR_HEIGHT,
} from "../../temp/Layout/SecondaryNavbarLayout";
import { faPlus, faMinus, faSave } from "@fortawesome/free-solid-svg-icons";
import SecondaryNavButton from "../../temp/UI/SecondaryNavButton";
import useRequest from "../../temp/Hooks/useRequest";
import { Story } from "@prisma/client";
import LOVE_COLORS, { NUM_INTENSITIES } from "../../temp/Utilities/loveColors";

const CELL_HEIGHT = 40;
const CELL_MARGIN = 10;

const CELL_WIDTH = 100;

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

type CellState = {
  intensity: number;
  selected: boolean;
};

const CELL_STATE = atom<List<List<CellState>>>({
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
          width: ${CELL_WIDTH}px;
          height: ${CELL_HEIGHT}px;
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
  const [secondSelect, setSecondSelect] = useRecoilState(SECOND_SELECT_STATE);
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
              setSecondSelect(address);
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
              setSecondSelect(null);
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

  const [savingState, save] = useRequest(
    async (): Promise<Story> => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const filteredAndGrouped = love.reduce(
        (sum, line, lineIndex) =>
          sum.update(Math.floor(lineIndex / 2), (val: List<unknown>) =>
            (val || List()).concat(
              // add year and month to cells,
              line
                .map((cell, cellIndex) => {
                  const year = currentYear - Math.floor(cellIndex / 12);
                  const month =
                    ((currentMonth - 1 - (cellIndex % 12) + 12) % 12) + 1;
                  return {
                    ...cell,
                    isHeartBreak: lineIndex % 2 !== 0,
                    year,
                    month,
                  };
                })
                // Filter out the ones with no intensity
                .filter((cell) => cell.intensity)
            )
          ),
        List()
      );
      const resp = await fetch("/api/story/newStory", {
        method: "POST",
        body: JSON.stringify({ story: filteredAndGrouped.toJS() }),
      });
      return resp.json();
    }
  );
  return (
    <NavbarLayout>
      <SecondaryNavbarLayout
        buttons={[
          <SecondaryNavButton
            icon={faPlus}
            text="Add Line"
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
          />,

          <SecondaryNavButton
            icon={faMinus}
            text="Remove Line"
            onClick={() => setLove((l) => (l.size > 2 ? l.pop().pop() : l))}
          />,
          <SecondaryNavButton
            icon={faSave}
            text="Save"
            loading={savingState.isLoading}
            onClick={() => save()}
          />,
        ]}
      >
        <SEO title="New Story" />
        <div className="top-menu-holder"></div>
        <div ref={ref} className="line-holder">
          {dimensions && (
            <FixedSizeGrid
              columnCount={1 + love.size}
              columnWidth={CELL_WIDTH + CELL_MARGIN * 2}
              height={dimensions?.height}
              rowCount={totalCount}
              rowHeight={CELL_HEIGHT + CELL_MARGIN * 2}
              width={dimensions?.width}
            >
              {Cell}
            </FixedSizeGrid>
          )}
        </div>
        <style jsx>
          {`
            .line-holder {
              position: fixed;
              top: ${NAVBAR_HEIGHT + SECONDARY_NAVBAR_HEIGHT}px;
              bottom: 0;
              left: 0;
              right: 0;
              display: flex;
            }
          `}
        </style>
      </SecondaryNavbarLayout>
    </NavbarLayout>
  );
};

export default NewStory;
