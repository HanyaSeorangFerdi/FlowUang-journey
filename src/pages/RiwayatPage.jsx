import { useEffect, useState } from "react";
import { getData } from "../utils/api";

export default function RiwayatPage() {

  const [transaksi, setTransaksi] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sumber, setSumber] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      setLoading(true);

      const data = await getData();

      setTransaksi(data || []);

    } catch (error) {

      console.error(error);
      alert("Gagal mengambil data");

    } finally {

      setLoading(false);

    }

  }

  const filtered = transaksi.filter(item => {

    const cocokKeyword =
      (item.catatan || "")
        .toLowerCase()
        .includes(keyword.toLowerCase());

    const cocokSumber =
      sumber === "Semua" ||
      item.sumber === sumber;

    return cocokKeyword && cocokSumber;

  });

  return (

    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: 20,
        paddingBottom: 100
      }}
    >

      <h2>Riwayat Transaksi</h2>

      <input
        placeholder="Cari transaksi..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={styles.input}
      />

      <select
        value={sumber}
        onChange={(e) => setSumber(e.target.value)}
        style={styles.input}
      >
        <option>Semua</option>
        <option>Cash</option>
        <option>BCA</option>
        <option>Struk</option>
      </select>

      <button
        onClick={loadData}
        style={styles.refreshButton}
      >
        Refresh
      </button>

      {loading && (
        <div style={{ textAlign: "center" }}>
          Memuat data...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center" }}>
          Tidak ada transaksi
        </div>
      )}

      {!loading &&
        filtered.map((item, index) => (

          <div
            key={index}
            style={styles.card}
          >

            <div style={styles.header}>

              <div>

                <div style={styles.title}>
                  {item.catatan}
                </div>

                <div style={styles.subtitle}>
                  {item.kategori} • {item.sumber}
                </div>

                <div style={styles.date}>
                  {item.tanggal}
                </div>

              </div>

              <div style={styles.amount}>
                Rp {Number(item.nominal).toLocaleString("id-ID")}
              </div>

            </div>

          </div>

        ))}

    </div>

  );

}

const styles = {

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 12,
    border: "1px solid #ddd",
    boxSizing: "border-box"
  },

  refreshButton: {
    width: "100%",
    padding: 12,
    background: "#16a34a",
    color: "#fff",
    border: 0,
    borderRadius: 12,
    marginBottom: 20,
    fontWeight: "bold"
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,.08)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontWeight: "bold",
    fontSize: 16
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 5
  },

  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 5
  },

  amount: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16
  }

};
