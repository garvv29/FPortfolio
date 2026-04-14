import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { config } from "../config";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const handlersRef = useRef<((container: HTMLDivElement) => void)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    containerRef.current.forEach((container, index) => {
      if (container) {
        container.classList.add("what-noTouch");
        
        const handler = () => handleClick(container);
        handlersRef.current[index] = handler;
        container.addEventListener("click", handler);
      }
    });

    return () => {
      containerRef.current.forEach((container, index) => {
        if (container && handlersRef.current[index]) {
          container.removeEventListener("click", handlersRef.current[index] as unknown as EventListener);
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            &nbsp;I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>{config.skills.develop.title}</h3>
              <h4>{config.skills.develop.description}</h4>
              <p>
                {config.skills.develop.details}
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {config.skills.develop.tools.map((tool, index) => (
                  <div key={index} className="what-tags">{tool}</div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>{config.skills.design.title}</h3>
              <h4>{config.skills.design.description}</h4>
              <p>
                {config.skills.design.details}
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                {config.skills.design.tools.map((tool, index) => (
                  <div key={index} className="what-tags">{tool}</div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  const parentEl = container.parentElement;
  if (!parentEl) return;

  const allContents = Array.from(parentEl.querySelectorAll(".what-content"));
  
  // If already active, just deactivate it
  if (container.classList.contains("what-content-active")) {
    container.classList.remove("what-content-active");
    container.classList.remove("what-sibling");
  } else {
    // Deactivate all others
    allContents.forEach((content) => {
      if (content !== container) {
        content.classList.remove("what-content-active");
        content.classList.add("what-sibling");
      }
    });
    // Activate this one
    container.classList.add("what-content-active");
    container.classList.remove("what-sibling");
  }
}
