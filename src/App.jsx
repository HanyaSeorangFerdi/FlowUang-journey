import { useState } from "react";
import Home from "./pages/Home";
import RiwayatPage from "./pages/RiwayatPage";
import TambahPage from "./pages/TambahPage";
import LaporanPage from "./pages/LaporanPage";
import Navbar from "./components/Navbar";

export default function App() {

  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <Home />}
      {page === "riwayat" && <RiwayatPage />}
      {page === "tambah" && <TambahPage />}
      {page === "laporan" && <LaporanPage />}

      <Navbar page={page} setPage={setPage} />
    </>
  );
}
