import "./Home.css";
function Home() {
  return (
    <div className="main_css-container">
    <div className="home-container" style={{ textAlign: "center" }}>
      <h4>SHOW ALL FILE</h4>

      <div className="Filter-container">
        <h2>Filter</h2>
        <div className="Data-Filter-container"></div>
      </div>
      <div className="File-container">
        <h2>File</h2>
        <div className="Data-File-container">
          <table className="table-container">
            <thead>
              <tr className="table-row">
                <th>ID</th>
                <th>Name</th>
                <th>DATE</th>
                <th>CATAGORIES</th>
                <th>OFFICE</th>
                <th>DESCRIBE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td>1</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
