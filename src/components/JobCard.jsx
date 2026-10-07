import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { getMatch } from "../utils/skillMatch.js";
import MatchMeter from "./MatchMeter.jsx";
import Avatar from "./Avatar.jsx";

export default function JobCard({ job }) {
  const { skills, savedIds, toggleSave, hasApplied } = useApp();
  const { percent, matched } = getMatch(job.skills, skills);
  const saved = savedIds.includes(job.id);

  return (
    <article className="card job-card">
      <MatchMeter percent={percent} />

      <div className="job-main">
        <h3>
          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
        <div className="company-row">
          <Avatar name={job.company} size={26} />
          <span className="muted">
            {job.company} - {job.location} ({job.mode})
          </span>
        </div>
        <div className="tags">
          <span className="tag solid">{job.type}</span>
          <span className="tag">{job.pay}</span>
          <span className="tag">{job.posted}</span>
        </div>
        <div className="tags">
          {job.skills.map((s) => (
            <span key={s} className={`skill ${matched.includes(s) ? "have" : ""}`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="job-actions">
        <button
          className={`icon-btn ${saved ? "on" : ""}`}
          onClick={() => toggleSave(job.id)}
          aria-pressed={saved}
        >
          {saved ? "Saved" : "Save"}
        </button>
        {hasApplied(job.id) ? (
          <span className="applied-badge">Applied</span>
        ) : (
          <Link className="btn small" to={`/apply/${job.id}`}>
            Apply
          </Link>
        )}
      </div>
    </article>
  );
}
