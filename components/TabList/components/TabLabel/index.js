/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from "react"
import { formatJobDates, handleKeyDown } from "../../../../utils"

const TabLabel = ({
  labelData: {
    _id,
    label,
    fromDate,
    toDate,
    currentlyInRole
  },
  index,
  currentTabIndex,
  showSublabel = true,
  subLabelAsDates = true,
  handleUpdateCurrentTab
}) => {

  const getLabelContents = () => {
    if (!showSublabel) return null; 
    const formattedDates = formatJobDates(fromDate, toDate, currentlyInRole);
    const currentText = currentlyInRole ? "Current" : null;
    const labelContents = subLabelAsDates ? formattedDates : currentText;
    return labelContents;
  }

  return (
    <li
      key={_id}
      className={["tab-list__label", currentTabIndex === index ? "active" : ""].join(" ").trimEnd()}
      onClick={() => handleUpdateCurrentTab(index)}
      onKeyDown={(e) => handleKeyDown(e, () => handleUpdateCurrentTab(index))}
      role="button"
      tabIndex={0}
    >
      <h4 className="tab-list__label-title">{label}</h4>
      <span className="tab-list__sublabel">
        {getLabelContents()}
      </span>
    </li>
  )
}

export default TabLabel