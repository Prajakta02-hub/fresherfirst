import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Applications() {
  const { applications } = useApp();
  const { state } = useLocation();

  return (
    <div className="narrow">
      <h1>My applications</h1>

      {state?.justApplied && (
        <div className="banner" role="status">
          Application sent for {state.justApplied}. Good luck!
        </div>
      )}

      {applications.length === 0 ? (
        <div className="card empty">
          <h3>No applications yet</h3>
          <p>Apply to a job and it will show up here.</p>
          <Link className="btn" to="/">Browse jobs</Link>
        </div>
      ) : (
        <div className="list">
          {applications.map((a) => (
            <article key={a.jobId} className="card app-row">
              <div>
                <h3><Link to={`/jobs/${a.jobId}`}>{a.title}</Link></h3>
                <p className="muted">{a.company} - applied on {a.appliedOn}</p>
              </div>
              <span className="applied-badge">Submitted</span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
