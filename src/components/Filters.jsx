import { categories, modes, types } from "../data/jobs.js";

export default function Filters({ filters, setFilters, onReset }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <aside className="card filters">
      <div className="filters-head">
        <h2>Filters</h2>
        <button className="link-btn" onClick={onReset}>Clear all</button>
      </div>

      <label>
        Search
        <input
          type="search"
          placeholder="Job title or company"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </label>

      <label>
        Job type
        <select value={filters.type} onChange={(e) => update("type", e.target.value)}>
          <option value="">All</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>

      <label>
        Work mode
        <select value={filters.mode} onChange={(e) => update("mode", e.target.value)}>
          <option value="">All</option>
          {modes.map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>

      <label>
        Category
        <select value={filters.category} onChange={(e) => update("category", e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Minimum skill match: <b>{filters.minMatch}%</b>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={filters.minMatch}
          onChange={(e) => update("minMatch", Number(e.target.value))}
        />
      </label>

      <label>
        Sort by
        <select value={filters.sort} onChange={(e) => update("sort", e.target.value)}>
          <option value="match">Best skill match</option>
          <option value="newest">Newest first</option>
        </select>
      </label>
    </aside>
  );
}
