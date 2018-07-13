import React, { Fragment } from "react";
import { connect } from "react-redux";

import { actions, selectors } from "../../../../lib/store";

import AppBackground from "../AppBackground";
import AppFooter from "../AppFooter";
import AppHeader from "../AppHeader";
import AppLoadingIndicator from "../AppLoadingIndicator";
import Mobile from "../Mobile";
import SharedThemeDialog from "../SharedThemeDialog";
import TermsPrivacyModal from "../TermsPrivacyModal";
import ThemeBuilder from "../ThemeBuilder";
import Onboarding from "../Onboarding";
import ThemeBuilderNext from "../ThemeBuilderNext";

import "./index.scss";

const mapStateToProps = state => {
  const mappedSelectors = Object.entries(selectors).reduce(
    (acc, [name, selector]) => ({ ...acc, [name]: selector(state) }),
    {}
  );
  return {
    ...mappedSelectors
  };
};

const mapDispatchToProps = dispatch => ({
  setBackground: args =>
    dispatch({
      ...actions.theme.setBackground(args),
      meta: { userEdit: true }
    }),
  setColor: args =>
    dispatch({
      ...actions.theme.setColor(args),
      meta: { userEdit: true }
    }),
  setTheme: args =>
    dispatch({
      ...actions.theme.setTheme(args),
      meta: { userEdit: true }
    }),
  clearPendingTheme: () => dispatch(actions.ui.clearPendingTheme()),
  setSelectedColor: args => dispatch(actions.ui.setSelectedColor(args)),
  setSavedThemesPage: page => dispatch(actions.ui.setSavedThemesPage({ page })),
  setDisplayLegalModal: args => dispatch(actions.ui.setDisplayLegalModal(args)),
  setThemeBuilderPanel: args => dispatch(actions.ui.setThemeBuilderPanel(args)),
  undo: () => dispatch(actions.theme.undo()),
  redo: () => dispatch(actions.theme.redo())
});

export const AppComponent = ({
  loaderQuote,
  isFirefox,
  isMobile,
  addonUrl,
  urlEncodeTheme,
  clipboard,
  theme,
  themeCanUndo,
  themeCanRedo,
  hasExtension,
  firstRun,
  loaderDelayExpired,
  selectedColor,
  setColor,
  pendingTheme,
  savedThemes,
  savedThemesPage,
  setSavedThemesPage,
  hasSavedThemes,
  shouldOfferPendingTheme,
  clearPendingTheme,
  setTheme,
  setSelectedColor,
  setBackground,
  setDisplayLegalModal,
  displayLegalModal,
  undo,
  redo,
  storage,
  userHasEdited,
  modifiedSinceSave,
  themeBuilderPanel,
  setThemeBuilderPanel
}) => (
  <Fragment>
    {isMobile && <Mobile />}
    {!isMobile &&
      !loaderDelayExpired && <AppLoadingIndicator {...{ loaderQuote }} />}
    {!isMobile &&
      loaderDelayExpired && (
        <Fragment>
          <AppHeader {...{
            hasExtension,
            theme,
            userHasEdited,
            modifiedSinceSave,
            storage,
            savedThemes }} />
          <div className="app">
            {hasExtension &&
              shouldOfferPendingTheme && (
                <SharedThemeDialog
                  {...{
                    pendingTheme,
                    setTheme,
                    clearPendingTheme
                  }}
                />
              )}
            <AppBackground {...{ theme }} />
            <main className="app__content">
              <ThemeBuilder
                {...{
                  clipboard,
                  modifiedSinceSave,
                  redo,
                  savedThemes,
                  selectedColor,
                  setBackground,
                  setColor,
                  setSelectedColor,
                  storage,
                  theme,
                  themeCanRedo,
                  themeCanUndo,
                  undo,
                  urlEncodeTheme,
                  userHasEdited,
                  hasExtension,
                  firstRun,
                  isFirefox,
                  addonUrl
                }}
              />
              <ThemeBuilderNext
                {...{
                  theme,
                  setTheme,
                  savedThemes,
                  savedThemesPage,
                  setSavedThemesPage,
                  hasSavedThemes,
                  storage,
                  themeBuilderPanel,
                  setThemeBuilderPanel,
                  setBackground,
                  selectedColor,
                  setColor,
                  setSelectedColor
                }}
              />
            </main>
            <AppFooter {...{ hasExtension, setDisplayLegalModal }} />
            <TermsPrivacyModal
              {...{
                displayLegalModal,
                setDisplayLegalModal
              }}
            />
            {firstRun && <Onboarding />}
          </div>
        </Fragment>
      )}
  </Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
