import { useState } from "react";

import Home from "./pages/Home";
import RiwayatPage from "./pages/RiwayatPage";
import TambahPage from "./pages/TambahPage";
import LaporanPage from "./pages/LaporanPage";

import Navbar from "./components/Navbar";

export default function App() {

  const [page, setPage] = useState("home");

  return (
  <div style={{
    width:"100%",
    maxWidth:"480px",
    margin:"0 auto",
    minHeight:"100vh",
    minHeight:"-webkit-fill-available",
    backgroundColor:"#f8faf8",
    fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    position:"relative",
    overflowX:"hidden"
  }}>
    <div style={{paddingBottom:"72px"}}>
      {halaman==="home"      && <Home transaksi={transaksi} onRefresh={ambilData} setHalaman={setHalaman}/>}
      {halaman==="transaksi" && <RiwayatPage transaksi={transaksi}/>}
      {halaman==="tambah"    && <TambahPage tambahTransaksi={tambahTransaksi} setHalaman={setHalaman}/>}
      {halaman==="laporan"   && <LaporanPage transaksi={transaksi}/>}
    </div>

    <nav style={{
      position:"fixed",
      bottom:0,
      left:"50%",
      transform:"translateX(-50%)",
      width:"100%",
      maxWidth:"480px",
      backgroundColor:"white",
      borderTop:"1px solid #f0f0f0",
      display:"flex",
      height:"68px",
      zIndex:200,
      boxShadow:"0 -4px 24px rgba(0,0,0,0.07)",
      paddingBottom:"env(safe-area-inset-bottom)"
    }}>
