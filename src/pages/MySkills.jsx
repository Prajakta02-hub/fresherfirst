import { useState } from "react";
import { Link } from "react-router-dom";
import { allSkills } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";

export default function MySkills() {
  const { skills, toggleSkill } = useApp();
  const [custom, setCustom] = useState("");

  // Show the standard list plus any custom skills the user added.
  const options = [...new Set([...allSkills, ...skills])].sort();

  const addCustom = (e) => {
    e.preventDefault();
    const name = custom.trim();
    if (name && !skills.some((s) => s.toLowerCase() === name.toLowerCase())) {
      toggleSkill(name);
    }
    setCustom("");
  };

  return (
    <div className="narrow">
      <h1>My skills</h1>
      <p className="muted">
        Tap the skills you have. Match percentages on every job update instantly.
      </p>

      <div className="card">
        <div className="tags big">
          {options.map((s) => (
            <button
              key={s}
              className={`chip ${skills.includes(s) ? "on" : ""}`}
              onClick={() => toggleSkill(s)}
              aria-pressed={skills.includes(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <form className="inline-form" onSubmit={addCustom}>
          <input
            placeholder="Add another skill"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
          <button className="btn" type="submit">Add skill</button>
        </form>
      </div>

      <p>
        <b>{skills.length}</b> skills selected.{" "}
        <Link to="/">See jobs matched to you</Link>
      </p>
    </div>
  );
}
