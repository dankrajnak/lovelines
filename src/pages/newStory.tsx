import { useState } from "react";
import SEO from "../utilities/SEO";

const Line = () => {
  const [numBoxes, setNumBoxes] = useState(20);
  const dates = new Array(numBoxes).fill(0).map((_, i) => {
    const date = new Date();
    const newMonth = date.getMonth() - (i % 12);
    const newYear = date.getFullYear() - Math.floor(i / 12);
    date.setMonth(newMonth);
    date.setFullYear(newYear);
    return date;
  });

  return (
    <>
      <table>
        <thead>
          <th className="date" />
          <th>Love</th>
          <th>Heartbreak</th>
        </thead>
        <tbody>
          {new Array(numBoxes).fill(0).map((_, index) => (
            <tr key={index}>
              <td className="date">
                <span className="month">
                  {new Intl.DateTimeFormat("default", {
                    month: "short",
                  }).format(dates[index])}
                </span>{" "}
                <span className="year">
                  {new Intl.DateTimeFormat("default", {
                    year: "numeric",
                  }).format(dates[index])}
                </span>
              </td>
              <td className="love" />
              <td className="heartbreak" />
            </tr>
          ))}
          <tr>
            <td></td>
            <td colSpan={2}>
              <button onClick={() => setNumBoxes((b) => b + 12)}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>
        {`
          table {
            border-collapse: collapse;
          }

          th {
            width: 120px;
          }

          td.love,
          td.heartbreak {
            border: 1px black solid;
            height: 30px;
          }

          td.date {
            text-align: center;
            vertical-align: middle;
            color: #c1a478;
            font-size: 0.8rem;
            background-color: rgba(255, 255, 255, 0.4);
          }

          .month {
            font-weight: bold;
          }

          button {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

const NewStory = () => {
  const [numLines, setNumLines] = useState(1);
  return (
    <>
      <SEO title="New Story" />
      <div className="container">
        <div className="holder">
          {new Array(numLines).fill(0).map((_, index) => (
            <div className="line-holder" key={index}>
              <Line />
            </div>
          ))}
          <div className="button-container">
            <div className="button-holder">
              <button onClick={() => setNumLines((l) => l + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            height: 100%;
            width: 100%;
            position: fixed;
          }
          .holder {
            top: 20px;
            left: 40px;
            right: 40px;
            bottom: 40px;
            position: absolute;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            display: inline-block;
          }
          .line-holder {
            display: inline-block;
            width: 400px;
            height: 100%;
            overflow-y: auto;
            padding: 20px 0px;
            margin-left: 10px;
            margin-right: 10px;
          }
          .button-container {
            display: inline-block;
            height: 100%;
            width: 30px;
            overflow-y: auto;
            margin-left: 10px;
            margin-right: 10px;
          }
          .button-holder {
            height: 100%;
            width: 100%;
            display: flex;
          }
        `}
      </style>
    </>
  );
};

export default NewStory;
