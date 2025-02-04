import { IoIosArrowDown } from "react-icons/io";
import { useRecoilState } from "recoil";
import GenericWrapper from "src/components/Layout/Wrapper/GenericWrapper";
import {
  availableLanguages,
  IAvailableLanguages,
} from "src/Constants/Languages";
import useMedia from "src/hooks/useMedia";
import {
  LanguageAtom,
  viewLangSelectorModal,
} from "src/Recoil/Atoms/LanguageAtom";
import { baseTheme } from "src/styles/theme/baseTheme";
import { LanguageButtons } from "./Styled";

export default function CustomSelect() {
  const [language, setLanguage] = useRecoilState(LanguageAtom);
  const [langSelector, setLangSelector] = useRecoilState(viewLangSelectorModal);
  const handleTrigger = () => {
    setLangSelector(!langSelector);
  };
  const isSmallerThanTablet = useMedia(baseTheme.breakpoints.tablet);
  return (
    <LanguageButtons onClick={handleTrigger} isSelectingLanguage={langSelector}>
      {langSelector && (
        <>
          <div className="selectorLanguage">
            {availableLanguages.map((lang: IAvailableLanguages) => {
              return (
                <div
                  key={lang.code}
                  className={`option ${
                    lang.code === language.code ? "active" : ""
                  }`}
                  onClick={() => {
                    setLanguage(lang);
                    setLangSelector(false);
                  }}
                >
                  <span className="flag">{lang.flag}</span>
                  <p className="langName">
                    {isSmallerThanTablet ? lang.code : lang.name}
                  </p>
                </div>
              );
            })}
          </div>
          <GenericWrapper onClick={() => setLangSelector(false)} />
        </>
      )}
      <div className="trigger">
        <span className="flag">{language.flag}</span>
        <p className="arrow">
          <span className={`icon ${langSelector ? "active" : ""}`}>
            <IoIosArrowDown size={25} />
          </span>
        </p>
      </div>
    </LanguageButtons>
  );
}
