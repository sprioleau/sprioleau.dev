/* eslint-disable @next/next/no-img-element */

import { FiGithub, FiExternalLink } from "react-icons/fi"
import { HiOutlineCode } from "react-icons/hi"
import { selectedWork } from "../../constants"

const SelectedWork = () => {
  return (
	<div className="selected-work">
		<ul className="selected-work__works">
			{selectedWork.map(({ imageSrc, title, description, tags, links: { gitHubUrl, sourceCodeUrl, deployedUrl }, emoji }, index) => (
				<li key={index} className="selected-work__work">
					<div className="selected-work__image">
						<a href={deployedUrl} className="button" target="_blank" rel="noreferrer">
							<img src={imageSrc} alt={title} />
						</a>
					</div>
					<div className="selected-work__details">
						<h3 className="selected-work__title">{title}{emoji && <span className="emoji" role="img"> {emoji}</span>}</h3>
						<p className="selected-work__description">{description}</p>
						<ul className="selected-work__tags">
							{tags.map((tag) => (
								<li key={tag} className="selected-work__tag"><p>{tag}</p></li>
							))}
						</ul>
						<div className="selected-work__icon-links">
							{gitHubUrl && <a aria-label="link" href={gitHubUrl} rel="noreferrer" className="selected-work__icon-link" target="_blank"><FiGithub /></a>}
							{sourceCodeUrl && <a aria-label="link" href={sourceCodeUrl} rel="noreferrer" className="selected-work__icon-link" target="_blank"><HiOutlineCode /></a>}
							{deployedUrl && <a aria-label="link" href={deployedUrl} rel="noreferrer" className="selected-work__icon-link" target="_blank"><FiExternalLink /></a>}
						</div>
					</div>
				</li>
			))}
		</ul>
	</div>
  )
}

export default SelectedWork
