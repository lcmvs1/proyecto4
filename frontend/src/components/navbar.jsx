import "./../css/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        CINEMA-LS
      </div>

      <ul>
        <li>Cartelera</li>
        <li>Próximamente</li>
        <li>Promociones</li>
      </ul>

    </nav>
  );
}

export default Navbar;