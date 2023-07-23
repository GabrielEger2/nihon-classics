import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai'
import { BsGlobeAmericas } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="footer bottom-0 p-10 bg-base-100 border-t border-base-300 text-base-content">
        <div>
            <span className="footer-title">LICENSE</span> 
            <a href="https://en.wikipedia.org/wiki/MIT_License" target='_blank' className="link link-hover">MIT License</a> 
            <a href="https://github.com/GabrielEger2/imaginAI" target='_blank' className="link link-hover">Project</a> 
        </div> 
        <div>
            <span className="footer-title">CREATOR</span> 
            <a href="https://gabrieleger.netlify.app" target='_blank' className="link link-hover">Contact</a> 
            <a href="https://www.buymeacoffee.com/GabrielEger" target='_blank' className="link link-hover">Support</a> 
        </div> 
        <div>
            <span className="footer-title">Social</span> 
            <div className="grid grid-flow-col gap-4">
                <a href="https://github.com/GabrielEger2" target='_blank' className="hover:scale-125 transition-all duration-300 ease-in-out">
                    <AiOutlineGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/gabrieleger/" target='_blank' className="hover:scale-125 transition-all duration-300 ease-in-out">
                    <AiFillLinkedin size={24} />
                </a>
                <a href="https://gabrieleger.netlify.app/" target='_blank' className="hover:scale-125 transition-all duration-300 ease-in-out">
                    <BsGlobeAmericas size={24} />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer