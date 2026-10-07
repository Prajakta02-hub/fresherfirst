import { Link, useParams } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";
import { getMatch, getLevel } from "../utils/skillMatch.js";
import MatchMeter from "../components/MatchMeter.jsx";
import Avatar from "../components/Avatar.jsx";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === Number(id));
  const { skills, savedIds, toggleSave, hasApplied } = useApp();

  if (!job) {
    return (
      <div className="card empty">
        <h3>Job not found</h3>
        <Link className="btn" to="/">Back to jobs</Link>
      </div>
    );
  }

  const { percent, matched, missing } = getMatch(job.skills, skills);
  const level = getLevel(percent);
  const saved = savedIds.includes(job.id);

  return (
    <div className="details">
      <Link to="/" className="back">Back to all jobs</Link>

      <div className="card details-head">
        <div>
          <h1>{job.title}</h1>
          <div className="company-row">
            <Avatar name={job.company} size={30} />
            <span className="muted">
              {job.company} - {job.location} ({job.mode})
            </span>
          </div>
          <div className="tags">
            <span className="tag solid">{job.type}</span>
            <span className="tag">{job.pay}</span>
            <span className="tag">Posted {job.posted}</span>
          </div>
        </div>
        <div className="details-actions">
          <button className={`icon-btn ${saved ? "on" : ""}`} onClick={() => toggleSave(job.id)}>
            {saved ? "Saved" : "Save job"}
          </button>
          {hasApplied(job.id) ? (
            <span className="applied-badge">Applied</span>
          ) : (
            <Link className="btn" to={`/apply/${job.id}`}>Apply now</Link>
          )}
        </div>
      </div>

      <div className="details-grid">
        <section className="card">
          <h2>About the role</h2>
          <p>{job.about}</p>
          <h2>Skills required</h2>
          <div className="tags">
            {job.skills.map((s) => (
              <span key={s} className={`skill ${matched.includes(s) ? "have" : ""}`}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="card match-panel">
          <h2>Your skill match</h2>
          <MatchMeter percent={percent} size={120} />
          <p className={`level ${level.cls}`}>{level.label}</p>

          {skills.length === 0 ? (
            <p className="muted">
              You have not added any skills yet. <Link to="/skills">Add your skills</Link>
            </p>
          ) : (
            <>
              <p className="muted small-text">You have</p>
              <div className="tags">
                {matched.length ? matched.map((s) => <span key={s} className="skill have">{s}</span>) : <span className="muted">None yet</span>}
              </div>
              {missing.length > 0 && (
                <>
                  <p className="muted small-text">Learn next</p>
                  <div className="tags">
                    {missing.map((s) => <span key={s} className="skill">{s}</span>)}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
