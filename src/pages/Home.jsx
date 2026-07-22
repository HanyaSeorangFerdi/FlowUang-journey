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
    const p=t.tanggal?.split("/"); return p&&parseInt(p[1])===bln&&par
