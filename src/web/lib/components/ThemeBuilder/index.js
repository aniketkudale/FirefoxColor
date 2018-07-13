import React from "react";
import BrowserPreview from "../BrowserPreview";
import ThemeUrl from "../ThemeUrl";
import Banner from "../Banner";

import "./index.scss";

export const ThemeBuilder = ({
  clipboard,
  modifiedSinceSave,
  redo,
  savedThemes,
  selectedColor,
  setSelectedColor,
  storage,
  theme,
  urlEncodeTheme,
  userHasEdited,
  hasExtension,
  isFirefox,
  addonUrl
}) => (
  <BrowserPreview {...{ theme, size: "large" }}>
    <div className="app__theme-element-pickers">

    </div>
    {!hasExtension && (
      <Banner
        {...{
          isFirefox,
          addonUrl,
          selectedColor,
          setSelectedColor
        }}
      />
    )}
    {hasExtension && (
      <div className="theme-share-save">
        <ThemeUrl {...{ theme, urlEncodeTheme, clipboard }} />
      </div>
    )}
  </BrowserPreview>
);

export default ThemeBuilder;
