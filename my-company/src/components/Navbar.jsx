import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#333", padding: "10px" }}>
      <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>Home</Link>
      <Link to="/about" style={{ margin: "0 10px", color: "#fff" }}>About</Link>
      <Link to="/services" style={{ margin: "0 10px", color: "#fff" }}>Services</Link>
      <Link to="/contact" style={{ margin: "0 10px", color: "#fff" }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
