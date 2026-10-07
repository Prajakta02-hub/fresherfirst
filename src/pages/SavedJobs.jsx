import { Link } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";
import JobCard from "../components/JobCard.jsx";

export default function SavedJobs() {
  const { savedIds } = useApp();
  const saved = jobs.filter((j) => savedIds.includes(j.id));

  return (
    <div className="narrow">
      <h1>Saved jobs</h1>
      {saved.length === 0 ? (
        <div className="card empty">
          <h3>Nothing saved yet</h3>
          <p>Tap Save on any job to keep it here.</p>
          <Link className="btn" to="/">Browse jobs</Link>
        </div>
      ) : (
        <div className="list">
          {saved.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
