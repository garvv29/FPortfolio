import "./styles/About.css";
import { config } from "../config";

const About = () => {
  const paragraphs = config.about.description.split('\n\n').filter(p => p.trim());

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <div className="para">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para.trim()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
