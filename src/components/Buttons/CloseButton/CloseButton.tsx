import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IProject } from "src/Interfaces";
import { useRecoilState } from "recoil";
import { projectSelectedAtom } from "src/Recoil/Atoms/ProjectSelectedAtom";
import { emptyProject } from "src/utils/empties/Project";

interface StyleProps {
  color: string;
}
const CloseButtonStyled = styled.div<StyleProps>`
  position: absolute;
  right: 10px;
  z-index: 5;
  top: 10px;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .closeButton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    :hover {
      background-color: ${({ color }) => color};
      filter: brightness(0.7);
    }
  }
`;
const CloseButton = ({ project }: { project: IProject }) => {
  const [, setSomeProjectSelected] = useRecoilState(projectSelectedAtom);
  const handleClick = () => {
    setSomeProjectSelected(emptyProject);
  };
  return (
    <CloseButtonStyled color={project.backgroundColor}>
      <Link to={`/`} onClick={handleClick} className={"closeButton"}>
        <GrFormClose size={25} />
      </Link>
    </CloseButtonStyled>
  );
};

export default CloseButton;
