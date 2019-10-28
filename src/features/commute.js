import { h } from "dom-chef";
import select from "select-dom";
import axios from "axios";

// RER C not available :(
// Check this link: http://restratpws.azurewebsites.net/api/lines/rer

export default async function commute() {
  const navBarMenu = select(".navbar-sub-nav");
  const { data: bus126AtIssyToStCloud } = await axios.get(
    "https://restratpws.azurewebsites.net/api/Missions/100100126/from/126_685_686/way/A",
  );
  const { data: tramT2AtIssyToVer } = await axios.get(
    "https://restratpws.azurewebsites.net/api/Missions/100112012/from/T2_60113_60213/way/R",
  );
  const margin = {
    margin: "0 2px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
  navBarMenu.appendChild(
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div style={margin}>
        <span style={{ fontWeight: "bold" }}>126</span> Issy to StCloud:{" "}
        <span style={margin}>
          {bus126AtIssyToStCloud.map(time => `${time} `)}
        </span>
      </div>
      |
      <div style={margin}>
        <span style={{ fontWeight: "bold" }}>T2</span> Issy to Ver:{" "}
        <span style={margin}>{tramT2AtIssyToVer.map(time => `${time} `)}</span>
      </div>
    </div>,
  );
}
