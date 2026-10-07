// Compares the user's skills with a job's required skills.
export function getMatch(jobSkills, userSkills) {
  const mine = userSkills.map((s) => s.toLowerCase());
  const matched = jobSkills.filter((s) => mine.includes(s.toLowerCase()));
  const missing = jobSkills.filter((s) => !mine.includes(s.toLowerCase()));
  const percent = jobSkills.length
    ? Math.round((matched.length / jobSkills.length) * 100)
    : 0;
  return { percent, matched, missing };
}

export function getLevel(percent) {
  if (percent >= 70) return { label: "Strong match", cls: "high" };
  if (percent >= 40) return { label: "Good start", cls: "mid" };
  return { label: "Needs more skills", cls: "low" };
}
