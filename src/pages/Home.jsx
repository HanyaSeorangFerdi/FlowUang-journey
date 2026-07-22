import { useState } from "react"
import CardTotal from "../components/CardTotal"
import TrendChart from "../components/TrendChart"
import CategoryChart from "../components/CategoryChart"

export default function Home({transaksi, onRefresh, setHalaman}) {
  const now = new Date()
  const bln = now.getMonth()+1
  const thn = now.getFullYear()
  const NB = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]
  const NBF = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

  const bulanIni = transaksi.filter(t=>{
    const p=t.tanggal?.split("/"); return p&&parseInt(p[1])===bln&&parseInt(p[2])===thn
  })
  const bulanLalu = transaksi.filter(t=>{
    const p=t.tanggal?.split("/")
    const bl=bln===1?12:bln-1, tl=bln===1?thn-1:thn
    return p&&parseInt(p[1])===bl&&parseInt(p[2])===tl
  })

  const totalBulan = bulanIni.reduce((a,b)=>a+(b.nominal||0),0)
  const totalLalu  = bulanLalu.reduce((a,b)=>a+(b.nominal||0),0)
  const totalSemua = transaksi.reduce((a,b)=>a+(b.nominal||0),0)
  const persen = totalLalu>0?((totalBulan-totalLalu)/totalLalu*100).toFixed(1):null
  const naik = parseFloat(persen)>=0

  const urut = [...transaksi].sort((a,b)=>{
    const ms=t=>{const p=t.tanggal?.split("/");return p&&p.length===3?new Date(`${p[2]}-${p[1]}-${p[0]}`).getTime():0}
    return ms(b)-ms(a)
  })

  const wS = {BCA:"#3b82f6",Struk:"#16a34a",Cash:"#f59e0b"}
  const wK = ["#16a34a","#3b82f6","#f59e0b","#ec4899","#8b5cf6","#06b6d4","#f97316"]

  const sumber = ["BCA","Struk","Cash"].map(s=>({
    s, total:transaksi.filter(t=>t.sumber===s).reduce((a,b)=>a+(b.nominal||0),0),
    n:transaksi.filter(t=>t.sumber===s).length
  }))

  const katMap = {}
  bulanIni.forEach(t=>{const k=t.kategori||"Lainnya";katMap[k]=(katMap[k]||0)+(t.nominal||0)})
  const katData = Object.entries(katMap).sort((a,b)=>b[1]-a[1]).slice(0,5)

  const trend7 = []
  for(let i=6;i>=0;i--){
    const d=new Date(now); d.setDate(d.getDate()-i)
    const dd=String(d.getDate()).padStart(2,"0")
    const mm=String(d.getMonth()+1).padStart(2,"0")
    const yy=d.getFullYear()
    const tot=transaksi.filter(t=>t.tanggal===`${dd}/${mm}/${yy}`).reduce((a,b)=>a+(b.nominal||0),0)
    trend7.push({label:["Min","Sen","Sel","Rab","Kam","Jum","Sab"][d.getDay()],total:tot,isToday:i===0})
  }
  const maxT = Math.max(...trend7.map(t=>t.total),1)

  const totalHariBulan = new Date(thn,bln,0).getDate()
  const rataHari = bulanIni.length>0?Math.round(totalBulan/totalHariBulan):0
  const hariTrxMap = {}
  bulanIni.forEach(t=>{const p=t.tanggal?.split("/");if(p)hariTrxMap[p[0]]=(hariTrxMap[p[0]]||0)+1})
  const hariTerbanyak = Object.entries(hariTrxMap).sort((a,b)=>b[1]-a[1])[0]
  const hariTanpa = totalHariBulan-Object.keys(hariTrxMap).length
  const katTerbanyak = katData.length>0?katData[0]:null

  const fmt = v=>v>=1000000?`Rp ${(v/1000000).toFixed(2)}jt`:v>=1000?`Rp ${(v/1000).toFixed(0)}rb`:`Rp ${v}`

  return(
    <div style={{background:"#f8faf8",width:"100%",minHeight:"100vh"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(160deg,#16a34a 0%,#15803d 70%,#166534 100%)",padding:"16px 20px 24px",color:"white",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"160px",height:"160px",borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>💰</div>
            <div>
              <p style={{margin:0,fontSize:"13px",fontWeight:"700"}}>Dompet Cerdas</p>
              <p style={{margin:0,fontSize:"10px",opacity:0.7}}>{NB[bln-1]} {thn}</p>
            </div>
          </div>
          <button onClick={onRefresh} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"10px",width:"36px",height:"36px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 4v6h6M23 20v-6h-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <p style={{margin:"0 0 2px",fontSize:"11px",opacity:0.7,letterSpacing:"1px"}}>PENGELUARAN BULAN INI</p>
        <p style={{margin:"0 0 4px",fontSize:"32px",fontWeight:"800",letterSpacing:"-1.5px",lineHeight:1.1}}>
          {totalBulan>=1000000?`Rp ${(totalBulan/1000000).toFixed(2)} jt`:`Rp ${totalBulan.toLocaleString("id-ID")}`}
        </p>
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
          <span style={{fontSize:"11px",opacity:0.75}}>{bulanIni.length} transaksi</span>
          <span style={{opacity:0.4}}>•</span>
          <span style={{fontSize:"11px",opacity:0.75}}>Total: {fmt(totalSemua)}</span>
          {persen!==null&&(
            <span style={{fontSize:"11px",background:"rgba(255,255,255,0.2)",padding:"2px 8px",borderRadius:"20px",fontWeight:"700"}}>
              {naik?"↑":"↓"}{Math.abs(parseFloat(persen))}%
            </span>
          )}
        </div>
      </div>

      <div style={{padding:"0 14px",marginTop:"-2px"}}>

        {/* MENU GRID */}
        <div style={{backgroundColor:"white",borderRadius:"20px",padding:"14px",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",marginBottom:"14px",marginTop:"-8px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
            {[
              {icon:"💳",label:"BCA",sub:`${sumber[0].n} trx`,color:"#eff6ff"},
              {icon:"🧾",label:"Struk",sub:`${sumber[1].n} trx`,color:"#f0fdf4"},
              {icon:"💵",label:"Cash",sub:`${sumber[2].n} trx`,color:"#fffbeb"},
              {icon:"📊",label:"Laporan",sub:"Detail",color:"#fdf4ff",action:()=>setHalaman("laporan")},
            ].map((m,i)=>(
              <button key={i} onClick={m.action} style={{background:m.color,border:"none",borderRadius:"14px",padding:"12px 4px",cursor:m.action?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
                <span style={{fontSize:"22px"}}>{m.icon}</span>
                <span style={{fontSize:"11px",fontWeight:"700",color:"#333"}}>{m.label}</span>
                <span style={{fontSize:"9px",color:"#888"}}>{m.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TREND 7 HARI */}
        <TrendChart trend7={trend7} maxT={maxT}/>

        {/* PER SUMBER */}
        <div style={{backgroundColor:"white",borderRadius:"20px",padding:"14px 16px",boxShadow:"0 4px 20px rgba(0,0,0,0.07)",marginBottom:"14px"}}>
          <p style={{margin:"0 0 2px",fontWeight:"700",fontSize:"14px",color:"#222"}}>Per Sumber</p>
          <p style={{margin:"0 0 10px",fontSize:"11px",color:"#aaa"}}>Total semua transaksi</p>
          <div style={{height:"10px",borderRadius:"6px",overflow:"hidden",display:"flex",marginBottom:"12px"}}>
            {sumber.map(({s,total})=>{
              const w=totalSemua>0?(total/totalSemua*100):0
              return w>0?<div key={s} style={{width:`${w}%`,background:wS[s]}}/>:null
            })}
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            {sumber.map(({s,total,n})=>(
              <div key={s} style={{textAlign:"center"}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:wS[s],margin:"0 auto 3px"}}/>
                <p style={{margin:0,fontSize:"11px",fontWeight:"700",color:"#333"}}>{s}</p>
                <p style={{margin:0,fontSize:"10px",color:"#555",fontWeight:"6
