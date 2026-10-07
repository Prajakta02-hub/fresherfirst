import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card empty">
      <h3>That page does not exist</h3>
      <Link className="btn" to="/">Go to jobs</Link>
    </div>
  );
}
