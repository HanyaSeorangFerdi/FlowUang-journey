export default function Navbar({ page, setPage }) {

  const menus = [
    {
      key: "home",
      label: "🏠",
      text: "Home"
    },
    {
      key: "riwayat",
      label: "📋",
      text: "Riwayat"
    },
    {
      key: "tambah",
      label: "➕",
      text: "Tambah"
    },
    {
      key: "laporan",
      label: "📊",
      text: "Laporan"
    }
  ];

  return (
    <div style={styles.navbar}>
      {menus.map(menu => (
        <div
          key={menu.key}
          onClick={() => setPage(menu.key)}
          style={{
            ...styles.menu,
            color: page === menu.key ? "#16a34a" : "#888"
          }}
        >
          <div style={{ fontSize: 22 }}>
            {menu.label}
          </div>

          <div style={{ fontSize: 12 }}>
            {menu.text}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {

  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    boxShadow: "0 -2px 10px rgba(0,0,0,.1)"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer"
  }

};
