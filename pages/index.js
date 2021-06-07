import Weather from "../components/weather";

export default function Home() {
  return (
    <div className="page-container">
      <div>
        <h1>
          Welcome, <span>Ella</span>!
        </h1>
        <Weather />
      </div>
    </div>
  );
}
