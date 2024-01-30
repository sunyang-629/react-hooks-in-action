import { FC, Suspense } from "react";
import { useQuery } from "react-query";

interface ImgProps {
  src: string;
  alt: string;
  [key: string]: unknown; // Allow additional props
}

const Img: FC<ImgProps> = ({ src, alt, ...props }) => {
  const { data: imgObject } = useQuery<HTMLImageElement>(
    src,
    () =>
      new Promise((resole) => {
        const img = new Image();
        img.onload = () => resole(img);
        img.src = src;
      }),
    { suspense: true }
  );

  return <img src={imgObject!.src} alt={alt} {...props} />;
};

interface IUserAvatarProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  [key: string]: unknown;
}

const UserAvatar: FC<IUserAvatarProps> = ({
  src,
  alt,
  fallbackSrc,
  ...props
}) => {
  return (
    <div className="use-avatar">
      <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar" />}>
        <Img src={src} alt={alt} {...props} />
      </Suspense>
    </div>
  );
};

export default UserAvatar;
