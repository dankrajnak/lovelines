import SEO from "../utilities/SEO";

const Home = () => (
  <>
    <SEO />
    <div className="holder">
      <div>
        <h1>Love Lines</h1>
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
        color: #d95525;
        margin-bottom: 3px;
      }
      .description {
        font-weight: lighter;
      }
    `}</style>
  </>
);

export default Home;
