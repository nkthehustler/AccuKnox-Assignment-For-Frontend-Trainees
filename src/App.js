import React, { useState } from "react";

const initialData = {
  "CSPM Executive Dashboard": [
    { id: 1, name: "Widget 1", text: "Random Text 1" },
    { id: 2, name: "Widget 2", text: "Random Text 2" },
  ],
  "Security Metrics": [
    { id: 3, name: "Widget A", text: "Random Text A" },
  ],
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(initialData);
  const [newWidget, setNewWidget] = useState({ name: "", text: "", category: "CSPM Executive Dashboard" });
  const [search, setSearch] = useState("");

  const addWidget = () => {
    if (!newWidget.name || !newWidget.text) return;
    const updated = { ...dashboard };
    const id = Date.now();
    const newW = { id, name: newWidget.name, text: newWidget.text };
    updated[newWidget.category] = [...(updated[newWidget.category] || []), newW];
    setDashboard(updated);
    setNewWidget({ name: "", text: "", category: newWidget.category });
  };

  const removeWidget = (category, id) => {
    const updated = { ...dashboard };
    updated[category] = updated[category].filter((w) => w.id !== id);
    setDashboard(updated);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "2rem", padding: "2rem", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "1rem" }}>Add Widget</h1>
        <input
          placeholder="Widget Name"
          value={newWidget.name}
          onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
        />
        <input
          placeholder="Widget Text"
          value={newWidget.text}
          onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
        />
        <select
          value={newWidget.category}
          onChange={(e) => setNewWidget({ ...newWidget, category: e.target.value })}
          style={{ padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%" }}
        >
          {Object.keys(dashboard).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={addWidget}
          style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer" }}
        >
          + Add Widget
        </button>
      </div>

      <input
        placeholder="Search Widgets"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", marginBottom: "2rem", borderRadius: "6px", border: "1px solid #ccc", width: "100%", maxWidth: "800px", margin: "0 auto", display: "block" }}
      />

      {Object.entries(dashboard).map(([category, widgets]) => (
        <div key={category} style={{ maxWidth: "1000px", margin: "2rem auto" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>{category}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {widgets
              .filter((w) =>
                w.name.toLowerCase().includes(search.toLowerCase()) ||
                w.text.toLowerCase().includes(search.toLowerCase())
              )
              .map((widget) => (
                <div
                  key={widget.id}
                  style={{ position: "relative", padding: "1rem", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
                >
                  <button
                    onClick={() => removeWidget(category, widget.id)}
                    style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", fontSize: "18px", color: "#dc3545", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#007bff" }}>{widget.name}</h3>
                  <p style={{ color: "#555", marginTop: "0.5rem" }}>{widget.text}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
