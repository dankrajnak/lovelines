import SEO from "../utilities/SEO";

const Circle = (props: { color: string }) => {
  const radius = 5;
  return (
    <svg width={radius * 2} height={radius * 2} style={{ marginLeft: 5 }}>
      <circle
        r={radius}
        cx={radius}
        cy={radius}
        style={{ fill: props.color }}
      />
    </svg>
  );
};

const Home = () => (
  <>
    <SEO />
    <div className="holder">
      <div>
        <h1>
          LoveLines
          <Circle color="#D95525" />
          <Circle color="#6D99AD" />
          <Circle color="#D7A164" />
        </h1>
        <div className="description">Under construction</div>
      </div>
    </div>
    <style jsx>{`
      .holder,
      .holder > div {
        display: flex;
        width: 100%;
        height: 100vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      h1 {
        margin-bottom: 3px;
        font-weight: 500;
      }
      .description {
        font-weight: lighter;
      }
    `}</style>
  </>
);

export default Home;
