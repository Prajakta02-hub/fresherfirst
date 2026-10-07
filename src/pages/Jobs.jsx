import { useMemo, useState } from "react";
import { jobs } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";
import { getMatch } from "../utils/skillMatch.js";
import Filters from "../components/Filters.jsx";
import JobCard from "../components/JobCard.jsx";
import Hero from "../components/Hero.jsx";

const defaultFilters = {
  search: "",
  type: "",
  mode: "",
  category: "",
  minMatch: 0,
  sort: "match",
};

export default function Jobs() {
  const { skills } = useApp();
  const [filters, setFilters] = useState(defaultFilters);

  const visibleJobs = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return jobs
      .map((job) => ({ job, percent: getMatch(job.skills, skills).percent }))
      .filter(({ job, percent }) => {
        const text = `${job.title} ${job.company}`.toLowerCase();
        return (
          (!q || text.includes(q)) &&
          (!filters.type || job.type === filters.type) &&
          (!filters.mode || job.mode === filters.mode) &&
          (!filters.category || job.category === filters.category) &&
          percent >= filters.minMatch
        );
      })
      .sort((a, b) =>
        filters.sort === "match"
          ? b.percent - a.percent
          : a.job.postedDays - b.job.postedDays
      )
      .map((x) => x.job);
  }, [filters, skills]);

  return (
    <>
      <Hero />

      <div className="layout" id="jobs">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        <section>
          <p className="muted result-count">
            {visibleJobs.length} {visibleJobs.length === 1 ? "job" : "jobs"} found
          </p>

          {visibleJobs.length === 0 ? (
            <div className="card empty">
              <h3>No jobs match these filters</h3>
              <p>Lower the minimum skill match or clear a filter.</p>
              <button className="btn" onClick={() => setFilters(defaultFilters)}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="list">
              {visibleJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
