import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import { useApp } from "../context/AppContext.jsx";

const emptyForm = { name: "", email: "", phone: "", college: "", resume: "", note: "" };

function validate(f) {
  const errors = {};
  if (f.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) errors.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.phone)) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (f.college.trim().length < 2) errors.college = "Enter your college name.";
  if (!/^https?:\/\/\S+\.\S+/.test(f.resume)) errors.resume = "Paste a resume or portfolio link starting with https://";
  return errors;
}

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === Number(id));
  const { addApplication, hasApplied } = useApp();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (!job) {
    return (
      <div className="card empty">
        <h3>Job not found</h3>
        <Link className="btn" to="/">Back to jobs</Link>
      </div>
    );
  }

  if (hasApplied(job.id)) {
    return (
      <div className="card empty">
        <h3>You have already applied to {job.title}</h3>
        <Link className="btn" to="/applications">View my applications</Link>
      </div>
    );
  }

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addApplication({
      jobId: job.id,
      title: job.title,
      company: job.company,
      applicant: form.name,
      email: form.email,
    });
    navigate("/applications", { state: { justApplied: job.title } });
  };

  const field = (name, label, type = "text", placeholder = "") => (
    <label>
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        aria-invalid={!!errors[name]}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </label>
  );

  return (
    <div className="narrow">
      <Link to={`/jobs/${job.id}`} className="back">Back to job</Link>
      <h1>Apply for {job.title}</h1>
      <p className="muted">{job.company} - {job.location}</p>

      <form className="card form" onSubmit={handleSubmit} noValidate>
        {field("name", "Full name", "text", "Aarav Sharma")}
        {field("email", "Email", "email", "aarav@example.com")}
        {field("phone", "Mobile number", "tel", "9876543210")}
        {field("college", "College / University", "text", "Your college name")}
        {field("resume", "Resume or portfolio link", "url", "https://")}
        <label>
          Why do you want this role? (optional)
          <textarea name="note" rows="4" value={form.note} onChange={handleChange} />
        </label>
        <button className="btn" type="submit">Submit application</button>
      </form>
    </div>
  );
}
