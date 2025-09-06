function MainContent() {
  return (
    <main style={{ backgroundColor: '#f4f4f4', padding: '20px', minHeight: '200px' }}>
      <h2 style={{ textAlign: 'center', color: 'darkred' }}>Welcome to My Page</h2>
      <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
        I love to visit <span style={{ fontWeight: 'bold', color: 'navy' }}>New York</span>,{" "}
        <span style={{ fontWeight: 'bold', color: 'purple' }}>Paris</span>, and{" "}
        <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>Tokyo</span>.
      </p>
    </main>
  );
}

export default MainContent;
