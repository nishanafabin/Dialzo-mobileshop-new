import './Footer.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-brand">
        <h2 className="footer-title">Dialzo</h2>
      </div>

      <p className="footer-text">
        Your trusted store for mobiles and accessories.
        <br />
        Connect with us
      </p>

      <div className="footer-socials">
        <img
          className="social-icon"
          src="https://res.cloudinary.com/df90uk4xi/image/upload/v1749626980/App_Logo_Inspiraton_111_qil4lw.png"
          alt="facebook"
        />
        <img
          className="social-icon"
          src="https://res.cloudinary.com/df90uk4xi/image/upload/v1749627083/instagram_hliype.png"
          alt="instagram"
        />
        <img
          className="social-icon"
          src="https://res.cloudinary.com/df90uk4xi/image/upload/v1749627277/Frame_11_qnoymu.png"
          alt="twitter"
        />
        <img
          className="social-icon"
          src="https://res.cloudinary.com/df90uk4xi/image/upload/v1749627365/Frame_13_mrjfqu.png"
          alt="linkedin"
        />
      </div>
    </div>
  )
}
