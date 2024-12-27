import type {ReactElement} from "react";
import HeroNotFound from "~/svg/not-found-hero.svg";

function NotFound(): ReactElement {
  return (
    <div className="layout min-h-[80vh] tw-flex tw-flex-col tw-h-[100vh] tw-gap-5 tw-text-white tw-items-center tw-justify-center">
      <h2 style={{color: "white"}} >Oops!... Page Not Found.</h2>
      <h3 style={{color: "white"}}>Sorry,  we can’t find  the page you’re looking for...</h3>
      <HeroNotFound  className ="tw-max-w-[530px] tw-mt-10"/>
    </div>
  );
}

export default NotFound;
