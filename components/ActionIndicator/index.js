/* eslint-disable @next/next/no-img-element */

import { FiArrowDown } from "react-icons/fi"

const ActionIndicator = ({ rotation = "0deg", size = "1em", variant = "" }) => {
  return (
		<div className="action-indicator" style={{ fontSize: size }}>
			<div style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				transform: `rotate(${rotation})`,
				padding: "0.25rem",
			}}>
				{variant === "big" ? (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.86 281.25" width="1em" height="1em">
						<path id="arrow" d="M155.43,278,3.21,125.82,38.67,90.36,130.35,182V2.27H180.5V182l91.69-91.68,35.46,35.46Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4.54"/>
					</svg>
				) : (
					<FiArrowDown />
				)}
			</div>
		</div>
  )
}

export default ActionIndicator;
