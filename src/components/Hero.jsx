import { useState } from "react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import { getMatch, getLevel } from "../utils/skillMatch.js";
import MatchMeter from "./MatchMeter.jsx";
import Avatar from "./Avatar.jsx";

// A small live demo: tap skills and watch the match ring change.
const demoJob = jobs[0];

export default function Hero() {
  const [demoSkills, setDemoSkills] = useState(["HTML"]);
  const { percent } = getMatch(demoJob.skills, demoSkills);
  const level = getLevel(percent);

  const toggle = (s) =>
    setDemoSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const internships = jobs.filter((j) => j.type === "Internship").length;
  const remote = jobs.filter((j) => j.mode === "Remote").length;

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Your first job should not ask for 3 years of experience.</h1>
        <p className="hero-sub">
          Every role here is made for freshers and interns. Add your skills and
          see exactly how well you match before you apply.
        </p>
        <div className="hero-cta">
          <button
            className="btn"
            onClick={() => document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })}
          >
            Browse {jobs.length} jobs
          </button>
          <Link to="/skills" className="btn ghost">Add my skills</Link>
        </div>
        <p className="hero-stats">
          <b>{internships}</b> internships, <b>{jobs.length - internships}</b> full-time roles, <b>{remote}</b> remote
        </p>
      </div>

      <div className="demo card" aria-label="Skill match demo">
        <p className="demo-title">Try it: tap the skills you know</p>
        <div className="demo-job">
          <Avatar name={demoJob.company} />
          <div>
            <b>{demoJob.title}</b>
            <div className="muted small">{demoJob.company}</div>
          </div>
        </div>
        <div className="tags big">
          {demoJob.skills.map((s) => (
            <button
              key={s}
              className={`chip ${demoSkills.includes(s) ? "on" : ""}`}
              onClick={() => toggle(s)}
              aria-pressed={demoSkills.includes(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="demo-result">
          <MatchMeter percent={percent} size={96} />
          <div>
            <p className={`level ${level.cls}`}>{level.label}</p>
            <p className="muted small">
              You match {demoSkills.length} of {demoJob.skills.length} required skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
