export default function CardTotal({
  title,
  amount,
  color
}) {

  return (
    <div
      style={{
        background: color,
        borderRadius: 20,
        padding: 20,
        color: "#fff",
        marginBottom: 15
      }}
    >
      <div style={{ fontSize: 14 }}>
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 10
        }}
      >
        Rp {amount.toLocaleString("id-ID")}
      </div>
    </div>
  );

}
