import About from "@/components/About";
import Skill from "@/components/Skill";
import Footer from "@/components/Footer";
import HomeComponent from "@/components/HomeComponent";

export default function Home() {
  return (
    <>
      <section id="home">
        <HomeComponent />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skill">
        <Skill />
      </section>
      <Footer />
    </>
  );
}
