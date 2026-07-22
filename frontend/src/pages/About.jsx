import React from "react";
import profile from "../assets/profile.jpg";

const About = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  const socialBtnStyle = {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    background: "#27272a",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "0.3s",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <div style={containerStyle}>
      <img
        src={profile}
        alt="Girish Posture"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #f97316",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(249,115,22,.4)",
        }}
      />

      <h2
        style={{
          fontSize: "2.5rem",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          fontSize: "1.6rem",
          color: "#f97316",
          marginBottom: "15px",
        }}
      >
        Girish Posture
      </h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.1rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "0 auto 30px",
        }}
      >
        I'm a <strong>MERN Stack Developer</strong> passionate about building
        modern, scalable, and user-friendly web applications. I enjoy creating
        responsive frontends with React.js and powerful backend systems using
        Node.js, Express.js, and MongoDB. My goal is to develop high-quality,
        production-ready applications with clean code and an excellent user
        experience.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <a
          href="https://github.com/girishposture1623"
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          💻 GitHub
        </a>

        <a
          href="www.linkedin.com/in/girish-posture-148409374"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(59,130,246,.2)",
            borderColor: "#3b82f6",
            color: "#3b82f6",
          }}
        >
          💼 LinkedIn
        </a>

        <a
          href="mailto:girishposture3@email.com"
          style={{
            ...socialBtnStyle,
            background: "rgba(249,115,22,.15)",
            borderColor: "#f97316",
            color: "#f97316",
          }}
        >
          📧 Email
        </a>
      </div>
    </div>
  );
};

export default About;