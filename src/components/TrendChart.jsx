export default function TrendChart() {

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15
      }}
    >
      <h3>Trend Mingguan</h3>

      <div
        style={{
          height: 150,
          display: "flex",
          alignItems: "flex-end",
          gap: 12
        }}
      >
        <div style={{ width: 30, height: 80, background: "#16a34a" }} />
        <div style={{ width: 30, height: 120, background: "#16a34a" }} />
        <div style={{ width: 30, height: 60, background: "#16a34a" }} />
        <div style={{ width: 30, height: 100, background: "#16a34a" }} />
        <div style={{ width: 30, height: 70, background: "#16a34a" }} />
      </div>
    </div>
  );

}
