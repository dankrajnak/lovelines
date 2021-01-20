import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import Popover from "react-popover";
import Colors, { ColorsA } from "../../Styles/colors";
import Circle from "../../UI/Circle";
import SEO from "../../Utilities/SEO";
import { List } from "immutable";
import { atom, useRecoilState } from "recoil";
import useDimensions from "../../Hooks/useDimensions";
import NavbarLayout, { NAVBAR_HEIGHT } from "../../Layout/NavbarLayout";
import SecondaryNavbarLayout, {
  SECONDARY_NAVBAR_HEIGHT,
} from "../../Layout/SecondaryNavbarLayout";
import { SaveOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import SecondaryNavButton from "../../UI/SecondaryNavButton";
import useRequest from "../../Hooks/useRequest";
import { Story } from "@prisma/client";
import LOVE_COLORS, { NUM_INTENSITIES } from "../../Utilities/loveColors";
import React, { useState } from "react";

const CELL_HEIGHT = 40;
const CELL_MARGIN = 10;

const CELL_WIDTH = 100;

const totalCount = 200;
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
            backgroundColor: "#f2f0f0",
            display: "flex",
            borderRadius: 2,
            boxShadow:
              "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
          }}
        >
          {new Array(NUM_INTENSITIES).fill(0).map((_, i) => (
            <div
              className="intensity-box"
              onClick={() =>
                props.onIntensitySelect && props.onIntensitySelect(i)
              }
              key={i}
              style={{
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
          border: 1px ${ColorsA.black(0.7)} solid;
          background-color: ${Colors.white};
          width: ${CELL_WIDTH}px;
          height: ${CELL_HEIGHT}px;
        }

        .cell:hover {
          cursor: pointer;
        }

        .intensity-box {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          border: solid 0.5px ${Colors.black};
        }

        .intensity-box:hover {
          border: solid 2px ${Colors.black};
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
          ${props.isSelected ? `border: 2px solid ${Colors.black}` : ""}
        }
      `}
    </style>
    <style jsx global>
      {`
        .Popover-tipShape {
          fill: #f2f0f0;
          box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
            0 15px 12px rgba(0, 0, 0, 0.22);
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
  const [menuHasShadow, setMenuHasShadow] = useState(false);
  return (
    <NavbarLayout>
      <SecondaryNavbarLayout
        shadow={menuHasShadow}
        buttons={[
          <SecondaryNavButton
            icon={<PlusOutlined />}
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
            icon={<MinusOutlined />}
            text="Remove Line"
            onClick={() => setLove((l) => (l.size > 2 ? l.pop().pop() : l))}
          />,
          <SecondaryNavButton
            icon={<SaveOutlined />}
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
              onScroll={({ scrollTop }) => {
                setMenuHasShadow(scrollTop > 0);
              }}
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
