import { Line, Period, Story } from "@prisma/client";
import { ReactNode, useCallback, useMemo } from "react";
import Colors from "../styles/colors";
import LOVE_COLORS, { NUM_INTENSITIES } from "../Utilities/loveColors";
import {
  getMonthsBetween,
  getNextYearMonth,
  getNumFromYearMonth,
  getYearMonthFromNum,
  YearMonth,
} from "../Utilities/yearMonthUtilities";

const Tick = ({
  label,
  x,
  y,
  width = 80,
}: {
  label: string;
  x: number;
  y: number;
  width?: number;
}) => (
  <>
    <g>
      <text x={width / 2} y={5} width={width} text-anchor="middle">
        {label}
      </text>
      <line x1={width / 2} x2={width / 2} y1={20} y2="100%"></line>
    </g>
    <style jsx>
      {`
        g {
          transform: translate(${x}px, ${y}px);
        }
      `}
    </style>
    <style jsx>
      {`
        rect {
          fill: none;
          stroke: none;
        }
        line {
          stroke: ${Colors.black};
          stroke-width: 1px;
          stroke-opacity: 0.1;
        }
        text {
          fill: ${Colors.black};
          font-size: 10px;
        }
      `}
    </style>
  </>
);

const Scale: React.FunctionComponent<{
  children: (mapper: (yearMonth: YearMonth) => number) => ReactNode;
  start: YearMonth;
  end: YearMonth;
  spread?: number;
}> = ({ start, end, children, spread = 80 }) => {
  const indexMapper = useCallback((index: number) => index * spread, [spread]);

  const mapper = (yearMonth: YearMonth | number) => {
    const index = getMonthsBetween(start, yearMonth);
    return indexMapper(index) + spread / 2;
  };

  const ticksAndLabels = useMemo(
    () =>
      new Array(getMonthsBetween(start, end)).fill(0).map((_, i) => {
        const date = new Date(
          Math.floor(i / 12) + start.year,
          (i % 12) + start.month,
          0
        );
        return {
          x: indexMapper(i),
          y: 5,
          label: new Intl.DateTimeFormat("en", {
            month: "short",
            year: "numeric",
          }).format(date),
        };
      }),
    [end, indexMapper, start]
  );

  return (
    <>
      {ticksAndLabels.map((tick, index) => (
        <Tick key={index} {...tick} />
      ))}
      <g>{children(mapper)}</g>
      <style jsx>
        {`
          g {
            transform: translate(0, 40px);
          }
        `}
      </style>
    </>
  );
};

const LineComp = ({
  line,
  colorInterpolator,
  mapper,
}: {
  line: Line & { periods: Period[] };
  colorInterpolator: (intensity: number) => string;
  mapper: (yearMonth: YearMonth | number) => number;
}) => {
  if (!line.periods?.length) {
    return null;
  }
  // We gotta group the periods into intensity groupings.
  const previousIntensity = null;
  const groups = [
    line.periods.filter((period) => !period.isHeartBreak),
    line.periods.filter((period) => period.isHeartBreak),
  ].map((list) =>
    list.reduce(
      (
        sum: { start: YearMonth; end: YearMonth; intensity: number }[],
        period
      ) => {
        if (previousIntensity === period.intensity) {
          sum[sum.length - 1].end = { year: period.year, month: period.month };
          return sum;
        }
        return sum.concat([
          {
            start: { year: period.year, month: period.month },
            end: getNextYearMonth(period.yearMonth),
            intensity: period.intensity,
          },
        ]);
      },
      []
    )
  );

  return (
    <>
      {groups[0].map((group, index) => (
        <line
          key={index}
          x1={mapper(group.start)}
          x2={mapper(group.end)}
          y1={0}
          y2={0}
          style={{
            stroke: colorInterpolator(group.intensity / NUM_INTENSITIES),
            strokeWidth: 5,
          }}
        ></line>
      ))}
      {groups[1].map((group, index) => (
        <rect
          key={index}
          x={mapper(group.start)}
          y={10}
          width={mapper(group.end) - mapper(group.start)}
          height={5}
          style={{
            fill: "none",
            stroke: colorInterpolator(group.intensity / NUM_INTENSITIES),
            strokeWidth: 1,
          }}
        ></rect>
      ))}
    </>
  );
};

const StoryComp = ({
  story,
}: {
  story: Story & {
    lines: (Line & {
      periods: Period[];
    })[];
  };
}) => {
  const min = Math.min(
    ...story.lines.flatMap((line) =>
      line.periods.map((period) => period.yearMonth)
    )
  );
  const max = getNumFromYearMonth(
    getNextYearMonth(
      Math.max(
        ...story.lines.flatMap((line) =>
          line.periods.map((period) => period.yearMonth)
        )
      )
    )
  );

  return (
    <>
      <div className="container">
        <svg
          version="1.1"
          baseProfile="full"
          width="2000"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Scale
            start={getYearMonthFromNum(min)}
            end={getYearMonthFromNum(max)}
          >
            {(mapper) =>
              story.lines.map((line, lineIndex) => (
                <>
                  <g style={{ transform: `translate(0, ${lineIndex * 50}px` }}>
                    <LineComp
                      line={line}
                      mapper={mapper}
                      colorInterpolator={
                        LOVE_COLORS[lineIndex % LOVE_COLORS.length].interpolator
                      }
                    />
                  </g>
                </>
              ))
            }
          </Scale>
        </svg>
      </div>
      {/* <pre>{JSON.stringify(story, null, 2)}</pre> */}
      <style jsx>{`
        svg {
          display: block;
        }
        .container {
          max-width: 800px;
          overflow-x: auto;
        }
      `}</style>
    </>
  );
};

export default StoryComp;
