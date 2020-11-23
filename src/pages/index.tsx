import Colors from "../styles/colors";
import SEO from "../utilities/SEO";
import Circle from "../UI/Circle";

const Home = () => (
  <>
    <SEO />
    <div className="holder">
      <div>
        <h1>
          LoveLines
          <Circle color={Colors.red} style={{ marginLeft: 5 }} />
          <Circle color={Colors.blue} style={{ marginLeft: 5 }} />
          <Circle color={Colors.orange} style={{ marginLeft: 5 }} />
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
