export default function Navbar({halaman, setHalaman}) {
  const NavIcon = ({type, active}) => {
    const c = active?"#16a34a":"#bbb"
    if(type==="home") return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>
    if(type==="list") return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
    if(type==="chart") return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
    return null
  }

  return (
    <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",backgroundColor:"white",borderTop:"1px solid #f0f0f0",display:"flex",height:"68px",zIndex:200,boxShadow:"0 -4px 24px rgba(0,0,0,0.07)"}}>
      {[
        {id:"home",icon:"home",label:"Beranda"},
        {id:"transaksi",icon:"list",label:"Riwayat"},
        {id:"tambah",icon:"plus",label:""},
        {id:"laporan",icon:"chart",label:"Laporan"},
      ].map(m=>(
        <button key={m.id} onClick={()=>setHalaman(m.id)} style={{flex:1,border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"3px",position:"relative",padding:0}}>
          {m.id==="tambah"?(
            <div style={{width:"52px",height:"52px",borderRadius:"16px",background:"linear-gradient(135deg,#16a34a,#15803d)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 20px rgba(22,163,74,0.4)",marginTop:"-20px"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
          ):(
            <>
              <NavIcon type={m.icon} active={halaman===m.id}/>
              <span style={{fontSize:"10px",fontWeight:"600",color:halaman===m.id?"#16a34a":"#bbb"}}>{m.label}</span>
              {halaman===m.id&&<div style={{position:"absolute",top:"4px",width:"4px",height:"4px",borderRadius:"50%",background:"#16a34a"}}/>}
            </>
          )}
        </button>
      ))}
    </nav>
  )
}
