import { useState, useEffect } from "react"
import Home from "./pages/Home"
import RiwayatPage from "./pages/RiwayatPage"
import TambahPage from "./pages/TambahPage"
import LaporanPage from "./pages/LaporanPage"
import Navbar from "./components/Navbar"

const API_URL = "https://script.google.com/macros/s/AKfycbz2cvVBxFE91BhkfPzKU6dDmdN0KhJPQt5SJUvdCWQ1e53qRHN4SqSmQT2wP9nj57QUGw/exec"

export default function App() {
  const [halaman, setHalaman] = useState("home")
  const [transaksi, setTransaksi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => { ambilData() }, [])

  const ambilData = async () => {
    try {
      setLoading(true); setError("")
      const res = await fetch(API_URL)
      const json = await res.json()
      setTransaksi(json.data || [])
    } catch { setError("Gagal memuat data.") }
    finally { setLoading(false) }
  }

  const tambahTransaksi = async (baru) => {
    try {
      await fetch(API_URL, { method:"POST", body:JSON.stringify(baru) })
      await ambilData()
    } catch {}
  }

  if (loading) return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",gap:"16px",background:"#f8faf8"}}>
      <div style={{width:"56px",height:"56px",borderRadius:"16px",background:"linear-gradient(135deg,#16a34a,#15803d)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",boxShadow:"0 8px 24px rgba(22,163,74,0.3)"}}>💰</div>
      <p style={{color:"#888",fontSize:"13px",margin:0}}>Memuat data...</p>
    </div>
  )

  if (error) return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",gap:"12px",padding:"20px",textAlign:"center"}}>
      <p style={{fontSize:"40px"}}>😵</p>
      <p style={{color:"#dc2626",fontSize:"14px"}}>{error}</p>
      <button onClick={ambilData} style={{padding:"12px 28px",background:"linear-gradient(135deg,#16a34a,#15803d)",color:"white",border:"none",borderRadius:"24px",cursor:"pointer",fontSize:"14px",fontWeight:"700"}}>Coba Lagi</button>
    </div>
  )

  return (
    <div style={{width:"100%",maxWidth:"480px",margin:"0 auto",minHeight:"100vh",backgroundColor:"#f8faf8",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",position:"relative",overflowX:"hidden"}}>
      <div style={{paddingBottom:"72px"}}>
        {halaman==="home"      && <Home transaksi={transaksi} onRefresh={ambilData} setHalaman={setHalaman}/>}
        {halaman==="transaksi" && <RiwayatPage transaksi={transaksi}/>}
        {halaman==="tambah"    && <TambahPage tambahTransaksi={tambahTransaksi} setHalaman={setHalaman}/>}
        {halaman==="laporan"   && <LaporanPage transaksi={transaksi}/>}
      </div>
      <Navbar halaman={halaman} setHalaman={setHalaman}/>
    </div>
  )
}
