import React from "react";

export const ThemeSaveButton = ({
  children,
  name,
  theme,
  generateThemeKey,
  putTheme,
  userHasEdited,
  modifiedSinceSave
}) => {
  const saveTheme = () => putTheme(generateThemeKey(), theme);

  return (
    <button
      className={name}
      onClick={saveTheme}
      title={!userHasEdited || modifiedSinceSave ? "Save" : "Saved!"}
      disabled={!modifiedSinceSave}
    >
      { children }
      <span>{!userHasEdited || modifiedSinceSave ? "Save" : "Saved!"}</span>
    </button>
  );
};

export default ThemeSaveButton;
