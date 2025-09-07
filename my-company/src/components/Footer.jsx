function Footer() {
  return (
    <footer style={{ background: "#333", color: "#fff", textAlign: "center", padding: "10px", marginTop: "20px" }}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
