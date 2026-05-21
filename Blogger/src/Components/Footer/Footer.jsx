import { FaBlog } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer=()=>{
  return<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary" >© 2024 Company, Inc</p>

    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" ></use> </svg><h2> <FaBlog size={33}/><Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>blogger</Link> </h2>
    </a>

    <ul className="nav col-md-4 justify-content-end" >
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><FaFacebookSquare /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><FaTwitter /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><FaSquareInstagram /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary"><FaTelegram /></a></li>
   
    </ul>
    <p style={{display:"inline-block", margin:"auto"}}>All right reserved. Copyright <b> @blogger</b></p>
   
  </footer>
}
export default Footer