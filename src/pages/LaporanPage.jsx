export default function LaporanPage() {

  const transaksi = [
    {
      kategori: "Makanan",
      nominal: 25000
    },
    {
      kategori: "Makanan",
      nominal: 50000
    },
    {
      kategori: "Transportasi",
      nominal: 75000
    },
    {
      kategori: "Belanja",
      nominal: 100000
    }
  ];

  const totalPengeluaran = transaksi.reduce(
    (sum, item) => sum + item.nominal,
    0
  );

  const totalTransaksi = transaksi.length;

  const rataRata =
    totalPengeluaran / totalTransaksi;

  const kategoriMap = {};

  transaksi.forEach(item => {

    kategoriMap[item.kategori] =
      (kategoriMap[item.kategori] || 0)
      + item.nominal;

  });

  const kategoriTerbesar =
    Object.entries(kategoriMap)
      .sort((a,b)=>b[1]-a[1])[0];

  return (

    <div
      style={{
        background:"#f3f4f6",
        minHeight:"100vh",
        padding:20,
        paddingBottom:100
      }}
    >

      <h2>Laporan</h2>

      <div style={styles.grid}>

        <div style={styles.card}>
          <div>Total Transaksi</div>
          <h2>{totalTransaksi}</h2>
        </div>

        <div style={styles.card}>
          <div>Total Pengeluaran</div>
          <h2>
            Rp {totalPengeluaran.toLocaleString("id-ID")}
          </h2>
        </div>

        <div style={styles.card}>
          <div>Rata-rata</div>
          <h2>
            Rp {Math.round(rataRata).toLocaleString("id-ID")}
          </h2>
        </div>

        <div style={styles.card}>
          <div>Kategori Terbesar</div>
          <h2>
            {kategoriTerbesar?.[0]}
          </h2>
        </div>

      </div>

      <div style={styles.chartCard}>

        <h3>Top Kategori</h3>

        {
          Object.entries(kategoriMap)
          .sort((a,b)=>b[1]-a[1])
          .map(([nama,total])=>(

            <div
              key={nama}
              style={styles.row}
            >

              <span>{nama}</span>

              <strong>
                Rp {total.toLocaleString("id-ID")}
              </strong>

            </div>

          ))
        }

      </div>

    </div>

  );

}

const styles = {

  grid:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:15
  },

  card:{
    background:"#fff",
    borderRadius:20,
    padding:20
  },

  chartCard:{
    background:"#fff",
    borderRadius:20,
    padding:20,
    marginTop:20
  },

  row:{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px 0",
    borderBottom:"1px solid #eee"
  }

};
