import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={267}
    height={428}
    viewBox="0 0 267 428"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="577" y="184" rx="0" ry="0" width="250" height="240" />
    <rect x="-3" y="277" rx="0" ry="0" width="267" height="88" />
    <rect x="39" y="17" rx="19" ry="19" width="184" height="244" />
    <rect x="127" y="382" rx="4" ry="4" width="134" height="44" />
    <rect x="2" y="383" rx="0" ry="0" width="93" height="44" />
    <rect x="232" y="3" rx="0" ry="0" width="27" height="65" />
  </ContentLoader>
);

export default Skeleton;
