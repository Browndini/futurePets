import BankPage from "../BankPage";
import ArcadePage from "../ArcadePage";
import HomePage from "../HomePage";
import PetStorePage from "../PetStorePage";
import CasinoPage from "../CasinoPage";
import VideoStorePage from "../VideoStorePage";
import FarmersMarketPage from "../FarmersMarketPage";
export default function nextPage(page, navigator) {
  switch (page) {
    case "bank":
      return {
        component: BankPage,
        title: `${page} Page`,
        passProps: {
          color: "ccc",
          navigator: navigator
        }
      };
      break;
    case "arcade":
      return {
        component: ArcadePage,
        title: `${page} Page`,
        passProps: {
          color: "26547C",
          navigator: navigator
        }
      };
      break;
    case "pet_store":
      return {
        component: PetStorePage,
        title: `${page} Page`,
        passProps: {
          color: "493843",
          navigator: navigator
        }
      };
      break;
    case "casino":
      return {
        component: CasinoPage,
        title: `${page} Page`,
        passProps: {
          color: "FFD166",
          navigator: navigator
        }
      };
      break;
    case "video_store":
      return {
        component: VideoStorePage,
        title: `${page} Page`,
        passProps: {
          color: "EABDA8",
          navigator: navigator
        }
      };
      break;
    case "farmers_market":
      return {
        component: FarmersMarketPage,
        title: `${page} Page`,
        passProps: {
          color: "A0B2A6",
          navigator: navigator
        }
      };
      break;
    default:
      return {
        component: HomePage,
        title: "Home Page",
        passProps: {
          color: "000",
          navigator: navigator
        }
      };
      break;
  }
}
