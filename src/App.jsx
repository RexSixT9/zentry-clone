import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="realtive min-h-screen w-screen overflow-x-hidden ">
      <Hero/>
      <section className="z-0 min-h-screen bg-blue-50"/>
    </main>
  );
};

export default App;
