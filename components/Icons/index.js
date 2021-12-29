import { FaFigma, FaGitAlt, FaNodeJs, FaNpm, FaReact, FaSass } from "react-icons/fa"
import { SiCss3, SiCypress, SiExpress, SiGraphql, SiHtml5, SiJavascript, SiJest, SiNextdotjs, SiRedux, SiTypescript, SiSocketdotio } from "react-icons/si"
import { TiArrowSync } from "react-icons/ti"
import { VscJson } from "react-icons/vsc"
import AdobeXd from "./AdobeXd";
import AdobePhotoshop from "./AdobePhotoshop";
import AdobeIllustrator from "./AdobeIllustrator";

const icons = {
  figma: <FaFigma />, 
  git: <FaGitAlt />, 
  api: <VscJson />, 
  node: <FaNodeJs />, 
  npm: <FaNpm />, 
  react: <FaReact />, 
  sass: <FaSass />, 
  css: <SiCss3 />, 
  cypress: <SiCypress />, 
  express: <SiExpress />, 
  graphql: <SiGraphql />, 
  html: <SiHtml5 />, 
  es6: <SiJavascript />, 
  javascript: <SiJavascript />, 
  jest: <SiJest />, 
  nextjs: <SiNextdotjs />, 
  redux: <SiRedux />, 
  typescript: <SiTypescript />, 
  async: <TiArrowSync />, 
  xd: <AdobeXd />, 
  photoshop: <AdobePhotoshop />, 
  illustrator: <AdobeIllustrator />,
  socketio: <SiSocketdotio />,
}

export default icons;