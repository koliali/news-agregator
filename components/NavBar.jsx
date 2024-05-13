
const NavBar = ({navApi,setNavApi}) => {

  const navList = [
    'GuardiansApi',
    'NewYorkTimes',
    'NewsApi'
   ]

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <span className="badge bg-dark">News Aggregator</span>
      </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {
          navList.map((nav,index)=>{
            return  <li className="nav-item" key={index}>
                      <div className={ `nav-link ${navApi === nav ? 'active' : ''}`} onClick={()=>setNavApi(nav)}>{nav}</div>
                    </li>;
          })
        }
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar
