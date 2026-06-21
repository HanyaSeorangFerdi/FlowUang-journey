import { useState } from "react";

export default function RiwayatPage() {

  const [keyword, setKeyword] = useState("");
  const [sumber, setSumber] = useState("Semua");

  const transaksi = [
    {
      tanggal: "2026-06-21",
      kategori: "Makanan",
      sumber: "BCA",
      catatan: "Bakso Pak Kumis",
      nominal: 25000
    },
    {
      tanggal: "2026-06-20",
      kategori: "Transportasi",
      sumber: "Cash",
      catatan: "Isi Pertalite",
      nominal: 50000
    },
    {
      tanggal: "2026-06-19",
      kategori: "Belanja",
      sumber: "Struk",
      catatan: "Indomaret",
      nominal: 75000
    }
  ];

  const filtered = transaksi.filter(item => {

    const cocokKeyword =
      item.catatan.toLowerCase()
      .includes(keyword.toLowerCase());

    const cocokSumber =
      sumber === "Semua" ||
      item.sumber === sumber;

    return cocokKeyword && cocokSumber;

  });

  return (

    <div
      style={{
        background:"#f3f4f6",
        minHeight:"100vh",
        padding:20,
        paddingBottom:100
      }}
    >

      <h2>Riwayat Transaksi</h2>

      <input
        placeholder="Cari transaksi..."
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        style={styles.input}
      />

      <select
        value={sumber}
        onChange={(e)=>setSumber(e.target.value)}
        style={styles.input}
      >
        <option>Semua</option>
        <option>Cash</option>
        <option>BCA</option>
        <option>Struk</option>
      </select>

      {
        filtered.map((item,index)=>(

          <div
            key={index}
            style={styles.card}
          >

            <div style={styles.header}>

              <div>
                <div style={{fontWeight:"bold"}}>
                  {item.catatan}
                </div>

                <div style={{fontSize:13,color:"#666"}}>
                  {item.kategori} • {item.sumber}
                </div>

                <div style={{fontSize:12,color:"#999"}}>
                  {item.tanggal}
                </div>
              </div>

              <div
                style={{
                  color:"#ef4444",
                  fontWeight:"bold"
                }}
              >
                Rp {item.nominal.toLocaleString("id-ID")}
              </div>

            </div>

          </div>

        ))
      }

    </div>

  );

}

const styles = {

  input:{
    width:"100%",
    padding:12,
    marginBottom:15,
    borderRadius:12,
    border:"1px solid #ddd",
    boxSizing:"border-box"
  },

  card:{
    background:"#fff",
    padding:15,
    borderRadius:20,
    marginBottom:15
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }

};
