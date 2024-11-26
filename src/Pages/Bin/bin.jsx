import "./Bin.css";

import React, { useState, useEffect } from "react";
import { FaUndo } from "react-icons/fa";

function Bin() {
  const [bin, setBin] = useState([]);

  // ดึงข้อมูล Bin จาก Local Storage
  useEffect(() => {
    const storedBin = JSON.parse(localStorage.getItem("bin")) || [];
    setBin(storedBin);
  }, []);

  // กู้คืนเอกสารจาก Bin
  const restoreDocument = (id) => {
    const docToRestore = bin.find((doc) => doc.id === id);
    const updatedBin = bin.filter((doc) => doc.id !== id);

    const documents = JSON.parse(localStorage.getItem("documents")) || [];
    documents.push(docToRestore);
    localStorage.setItem("documents", JSON.stringify(documents));

    setBin(updatedBin);
    localStorage.setItem("bin", JSON.stringify(updatedBin));
  };

  return (
    <div className="main_css-container">
      <div className="bin-container">
        <div className="bin-header-content">
          <h1>Bin</h1>
        </div>
        <ul>
          {bin.map((doc) => (
            <li key={doc.id}>
              {doc.title}
              <button className="btn btn-outline-secondary m-2" onClick={() => restoreDocument(doc.id)}>
                <FaUndo /> Restore
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Bin;