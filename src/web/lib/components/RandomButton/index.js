import React from "react";
import { SketchPicker } from "react-color";
import {
  generateComplementaryTheme,
  generateRandomTheme
} from "../../../../lib/generators";

import "./index.scss";

export const RandomButton = ({ setTheme, theme }) => {
  const handleComplementClick = () => {
    setTheme({ theme: generateComplementaryTheme() });
  };
  const handleRandomClick = () => {
    setTheme({ theme: generateRandomTheme() });
  };

  const handleChange = color => {
    setTheme({ theme: generateComplementaryTheme(color.rgb)});
  };

  return (
    <div className="ideas">
      <button className="button" onClick={handleComplementClick}>
        Complementary
      </button>
      <button className="button" onClick={handleRandomClick}>
        Random
      </button>
      <SketchPicker
        color={theme.colors.toolbar}
        disableAlpha={true}
        onChangeComplete={color => handleChange(color)}
      />
    </div>
  );
};

export default RandomButton;
