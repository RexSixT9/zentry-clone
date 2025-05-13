import About from "./components/About";
import Features from "./components/Features";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <main className="realtive min-h-screen w-screen overflow-x-hidden ">
      <NavBar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;
