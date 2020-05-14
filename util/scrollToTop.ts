import { AppTheme } from "../themes/AppTheme";

export function scrollToTop() {
  if (document) {
    document.getElementById(AppTheme.mainContainerId)?.scrollTo(0,0);
  }
}