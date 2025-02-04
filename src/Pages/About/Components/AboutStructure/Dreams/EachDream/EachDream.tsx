import { motion, Variants } from "framer-motion";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Styled } from "./Styled";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { LanguageAtom } from "src/Recoil/Atoms/LanguageAtom";
import { getTextByLang } from "src/utils/getTextByLang";
import { IDream } from "src/Models/Texts/dreamsText/DreamList";
import useMedia from "src/hooks/useMedia";
import { baseTheme } from "src/styles/theme/baseTheme";
//

const EachDream = ({ dream }: { dream: IDream }) => {
  const { breakpoints } = baseTheme;

  const smallerThanTablet = useMedia(breakpoints.tablet);

  const l = useRecoilValue(LanguageAtom);
  const dreamName = getTextByLang(l.code, dream.title);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 1,
      },
    },
  };
  const cardVariantsDelay: Variants = {
    offscreen: {
      width: 0,
    },
    onscreen: {
      width: "104%",
      transition: {
        delay: 0.5,
        type: "spring",
        bounce: 0.5,
        duration: 1,
      },
    },
  };

  return (
    <motion.li
      key={dream.id}
      initial={smallerThanTablet ? "onscreen" : "offscreen"}
      whileInView="onscreen"
      viewport={{ once: true, amount: "all" }}
      variants={cardVariants}
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
    >
      <Styled done={dream.status}>
        {dream.status === "done" && (
          <>
            <motion.div
              className="line"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: "all" }}
              variants={cardVariantsDelay}
            ></motion.div>
            <RiCheckboxCircleLine className="done" />
          </>
        )}
        {dream.status === "loading" && (
          <AiOutlineLoading3Quarters className="loadingIcon" />
        )}
        {dream.status === "false" && (
          <RiCheckboxBlankCircleLine className="notDone" />
        )}
        <span>{dreamName}</span>
      </Styled>
    </motion.li>
  );
};

export default EachDream;
