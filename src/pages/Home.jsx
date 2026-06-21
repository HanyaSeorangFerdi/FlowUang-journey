import CardTotal from "../components/CardTotal";
import TrendChart from "../components/TrendChart";
import CategoryChart from "../components/CategoryChart";

export default function Home() {

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: 20,
        paddingBottom: 100
      }}
    >

      <h1>Dompet Cerdas</h1>

      <CardTotal
        title="Saldo Bulan Ini"
        amount={2500000}
        color="#16a34a"
      />

      <CardTotal
        title="Pengeluaran"
        amount={1350000}
        color="#ef4444"
      />

      <TrendChart />

      <CategoryChart />

    </div>
  );

}
