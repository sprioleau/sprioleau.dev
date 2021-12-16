import React from "react"
import { FiGithub } from "react-icons/fi";
import { HiOutlineCode } from "react-icons/hi";

const InfoRails = () => {
	return (
		<>
			<div className="info-rail left">
				<ul className="info-rail__link-list">
					<li className="info-rail__link-list-item">
						<a aria-label="link" href="https://github.com/sprioleau" rel="noreferrer" className="info-rail__link" target="_blank"><span className="icon"><FiGithub /></span></a>
					</li>
					<li className="info-rail__link-list-item">
						<a aria-label="link" href="https://vscode.dev/github/sprioleau/sprioleau.dev" rel="noreferrer" className="info-rail__link" target="_blank"><span className="icon"><HiOutlineCode /></span></a>
					</li>
				</ul>
				<div className="info-rail__accent-line" />
			</div>
			<div className="info-rail right">
				<ul className="info-rail__link-list">
					<li className="info-rail__link-list-item">
						<a aria-label="link" href="mailto:sq.prioleau@gmail.com" className="info-rail__link text-link">sq.prioleau@gmail.com</a>
					</li>
				</ul>
				<div className="info-rail__accent-line" />
			</div>
		</>
  )
}

export default InfoRails;
