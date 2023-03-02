import React from "react";

const Footer = ({
  fontColor,
  backgroundColor,
  setFontColor,
  setBackgroundColor,
}) => {
  return (
    <footer style={{ backgroundColor: backgroundColor }}>
      <h2 style={{ color: fontColor }}>Footer</h2>
      <label>Change Font Color</label>
      <input
        autoFocus
        type="color"
        placeholder="Change Font Color"
        value={fontColor}
        onChange={(e) => setFontColor(e.target.value)}
      />

      <label>Change Background Color</label>
      <input
        autoFocus
        type="color"
        placeholder="Change Background Color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
    </footer>
  );
};

export default Footer;
