import TimeDate from "../../components/TimeDate";
import Translate from "../../components/Translate";
import "./Home.css";

// Home component that serves as the main dashboard page
// This is the central hub where users can access all dashboard features
const Home = () => {
  return (
    <main className="home-container">
      {/* Main content section containing core dashboard components */}
      <section className="home-content">
        {/* Display current time and date */}
        <TimeDate />
        {/* Language translation component */}
        <Translate />
      </section>
    </main>
  );
};

export default Home;
