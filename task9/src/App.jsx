/* import React, { useState, useEffect } from "react";
// Carousel component
function Carousel({ projects }) {
  const [current, setCurrent] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [transition, setTransition] = useState("transform 0.5s ease-in-out");

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextProject();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [current]);

  const nextProject = () => {
    setTransition("transform 0.5s ease-in-out");
    setCurrent(current === projects.length - 1 ? 0 : current + 1);
  };

  const prevProject = () => {
    setTransition("transform 0.5s ease-in-out");
    setCurrent(current === 0 ? projects.length - 1 : current - 1);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextProject();
    }

    if (diff < -5) {
      prevProject();
    }

    setTouchPosition(null);
  };

  const handleClick = (project) => {
    console.log(project);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {projects.map((project, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{
              transform: `translateX(${(index - current) * 100}%)`,
              transition: transition,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              onClick={() => handleClick(project.title)}
            />
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-actions">
        <button onClick={prevProject}>&#x2039;</button>
        {projects.map((project, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
        <button onClick={nextProject}>&#x203A;</button>
      </div>
    </div>
  );
}

// App component
function App() {
  const projects = [
    {
      title: "Project 1",
      description: "This is project 1",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Project 2",
      description: "This is project 2",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Project 3",
      description: "This is project 3",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Project 4",
      description: "This is project 4",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="App">
      <Carousel projects={projects} />
    </div>
  );
}

export default App;
 */

import React, { useState, useEffect } from "react";

// Carousel component
const Carousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
    const timer = setTimeout(() => {
      setTransition(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleClick = (index) => {
    console.log(`Image ${index} clicked`);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            } ${transition ? "transition" : ""}`}
          >
            <img
              src=""
              alt={project.image}
              onClick={() => handleClick(index)}
            />
            <div className="carousel-caption">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="prev" onClick={handlePrev}>
          &lt;
        </button>
        <button className="next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

// App component
const App = () => {
  const projects = [
    {
      image: "Project 1 Image",
      title: "Project 1",
      description: "This is project 1 description",
    },
    {
      image: "Project 2 Image",
      title: "Project 2",
      description: "This is project 2 description",
    },
    {
      image: "Project 3 Image",
      title: "Project 3",
      description: "This is project 3 description",
    },
    {
      image: "Project 4 Image",
      title: "Project 4",
      description: "This is project 4 description",
    },
    {
      image: "Project 5 Image",
      title: "Project 5",
      description: "This is project 5 description",
    },
  ];

  return (
    <div className="app">
      <Carousel projects={projects} />
    </div>
  );
};

export default App;
