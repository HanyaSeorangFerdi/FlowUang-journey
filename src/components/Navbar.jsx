export default function Navbar({ page, setPage }) {

  return (
    <>
      <button onClick={() => setPage("home")}>
        Home
      </button>

      <button onClick={() => setPage("riwayat")}>
        Riwayat
      </button>

      <button onClick={() => setPage("tambah")}>
        Tambah
      </button>

      <button onClick={() => setPage("laporan")}>
        Laporan
      </button>
    </>
  );

}
