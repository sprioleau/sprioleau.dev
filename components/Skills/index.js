/* eslint-disable no-param-reassign */
import React from "react";
import { sortAlphaByKey } from "../../utils"
import PageSectionLayout from "../PageSectionLayout"
import icons from "../Icons";
import { FadeInAndUp } from "../AnimationLibrary";

const Skills = ({ skills }) => {
	const skillsListObject = skills.map((skill) => ({ ...skill, category: skill.category[0] })).sort((a, b) => (b.category > a.category) ? 1 : -1).reduce((skillsObject, skill) => {
		if (!skillsObject[skill.category]) {
			skillsObject[skill.category] = [skill];
		} else {
			skillsObject[skill.category].push(skill);
		}
		return skillsObject;
	}, {});

	return (
		<PageSectionLayout sectionId="skills" sectionTitle="Relevant Skills">
			<div className="skills__main-content">
				{Object.entries(skillsListObject).map(([category, skillsData]) => (
					<React.Fragment key={category}>
						<h3 className="skills__category-name">{category}</h3>
						<ul className="skills__list">
						{skillsData.sort((a, b) => sortAlphaByKey(a, b, "techName")).map(({ techName, iconKey }) => (
								<FadeInAndUp
									key={techName}
									tag="li"
									className="skills__list-item"
								>
									{iconKey && <div className="skills__icon">{icons[iconKey]}</div>}
									<p className="skills__label">{techName}</p>
								</FadeInAndUp>
							))}
						</ul>
					</React.Fragment>
					))}
			</div>
		</PageSectionLayout>
  )
}

export default Skills;