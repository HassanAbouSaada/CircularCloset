import { useEffect, useState } from "react";

function TextSlideshow() {
  const phrases = [
    {
      title: "„Organize“ ✔️",
      description:
        "Make sure your wardrobe is clutter-free\nand well-organized to help you find your favorite clothing items easily.",
    },
    {
      title: "„Share and Reuse“ ♻️",
      description:
        "Share your clothing with others and reduce clothing waste.",
    },
    {
      title: "„Consume less“ and live more sustainably 🌱",
      description:
        "By consuming less and making conscious choices, you can live a more sustainable lifestyle and reduce your environmental impact.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const slideStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    opacity: 0,
    transition: "opacity 0.5s",
  };

  const activeSlideStyles = {
    opacity: 1,
  };

  const titleStyles = {
    fontSize: "45px",
    color: "#f5f5f5",
    position: "absolute", // Adjust position as needed
    top: "-20%", // Adjust position as needed
    left: "10%", // Adjust position as needed
    transform: "translate(-50%, -50%)", 
    textShadow: "10px 10px 20px rgba(0, 0, 0, 0.3)",
  };

  const descriptionStyles = {
    fontSize: "20px",
    color: "#f5f5f5",
    position: "absolute", // Adjust position as needed
    top: "40%", // Adjust position as needed
    left: "10%", // Adjust position as needed
    transform: "translate(-50%, -50%)", // Center horizontally and vertically
    textShadow: "10px 10px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={{ width: "400px", height: "300px", margin: " auto",  }}>
      <div style={{ ...slideStyles, ...(currentIndex === 0 && activeSlideStyles) }}>
        <h1 style={titleStyles}>{phrases[0].title}</h1>
        <p style={descriptionStyles}>{phrases[0].description}</p>
      </div>
      <div style={{ ...slideStyles, ...(currentIndex === 1 && activeSlideStyles) }}>
        <h1 style={titleStyles}>{phrases[1].title}</h1>
        <p style={descriptionStyles}>{phrases[1].description}</p>
      </div>
      <div style={{ ...slideStyles, ...(currentIndex === 2 && activeSlideStyles) }}>
        <h1 style={titleStyles}>{phrases[2].title}</h1>
        <p style={descriptionStyles}>{phrases[2].description}</p>
      </div>
    </div>
  );
}

export default TextSlideshow;