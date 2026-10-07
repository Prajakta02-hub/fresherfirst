// Colored circle with the company's initials (no logo files needed).
export default function Avatar({ name, size = 40 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 360;

  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{ width: size, height: size, background: `hsl(${hue} 55% 42%)`, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
