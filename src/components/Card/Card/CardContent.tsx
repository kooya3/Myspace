import { Image } from "src/components/Card/Image/Image";
import Description from "src/components/Card/Description/Description";
import { CardInterface } from "src/Interfaces";
import { Title } from "../Title/Title";

export const CardContent = ({ project, mobile }: CardInterface) => {
  return (
    <>
      <article
        className={`imageAndDescription ${
          mobile ? "imageAndDescriptionMobile" : ""
        }`}
      ></article>
    </>
  );
};
