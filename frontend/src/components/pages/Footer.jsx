import linkedin from "../../assets/images/linkedin.png";
import x from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";

const Footer = () => {
   return (
      <>
         <footer className="border-t border-t-gray-200 py-8 mt-[100px]">

            <div className="container mx-auto px-4">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                     <h2 className="text-xl font-bold">B. Job Hunt</h2>
                     <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
                  </div>

                  <div className="flex space-x-4 mt-1 md-mt-0 gap-5">

                     <a
                        href="https://www.linkedin.com/in/ahsan-gulzar-565418243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                        <img src={linkedin} className="w-9 h-9" alt="linkedin" />
                     </a>

                     <a href="https://x.com/ahsangulzar009?t=m007Ch5X86okrXclt4ki6g&s=09" target="_blank">
                        <img src={x} className="w-9 h-9" alt="X" />
                     </a>

                     <a href="https://www.instagram.com/imahsanbhutta?igsh=MTl4Y3M2bW9xcmhnMA==" target="_blank">
                        <img src={instagram} className="w-9 h-9" alt="Instagram" />
                     </a>

                     <a href="https://www.facebook.com/ahsan.gulzar.75?mibextid=ZbWKwL" target="_blank">
                        <img src={facebook} className="w-9 h-9" alt="Facebook" />
                     </a>

                  </div>
               </div>
            </div>

         </footer>
      </>
   )
}

export default Footer
