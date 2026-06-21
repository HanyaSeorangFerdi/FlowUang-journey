import { useState } from "react";
import { saveData } from "../utils/api";

export default function TambahPage() {

  const [nominal, setNominal] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [sumber, setSumber] = useState("Cash");
  const [catatan, setCatatan] = useState("");
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);

  async function handleSave() {

    if (!nominal) {
      alert("Nominal wajib diisi");
      return;
    }

    try {

      setLoading(true);

      const data = {
        nominal: Number(nominal),
        kategori,
        sumber,
        catatan,
        tanggal
      };

      await saveData(data);

      alert("Transaksi berhasil disimpan");

      // reset form
      setNominal("");
      setKategori("Makanan");
      setSumber("Cash");
      setCatatan("");
      setTanggal(
        new Date().toISOString().split("T")[0]
      );

    } catch (error) {

      console.error(error);

      alert("Gagal menyimpan transaksi");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 100,
        background: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      <h2>Tambah Transaksi</h2>

      <div style={styles.card}>

        <label>Nominal</label>

        <input
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          style={styles.input}
        />

        <label>Kategori</label>

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={styles.input}
        >
          <option>Makanan</option>
          <option>Transportasi</option>
          <option>Belanja</option>
          <option>Tagihan</option>
          <option>Lainnya</option>
        </select>

        <label>Sumber</label>

        <select
          value={sumber}
          onChange={(e) => setSumber(e.target.value)}
          style={styles.input}
        >
          <option>Cash</option>
          <option>BCA</option>
          <option>Struk</option>
        </select>

        <label>Catatan</label>

        <input
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          style={styles.input}
          placeholder="Catatan transaksi"
        />

        <label>Tanggal</label>

        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

      </div>

    </div>
  );

}

const styles = {

  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 2px 10px rgba(0,0,0,.08)"
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 12,
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: 15
  },

  button: {
    width: "100%",
    padding: 15,
    background: "#16a34a",
    color: "#fff",
    border: 0,
    borderRadius: 15,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer"
  }

};
