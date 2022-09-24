import { lazy } from "react";

export const AboutPageAsync = lazy(
  () =>
    new Promise(() => {
      //Так в реальных проектах делать не стоит, все это делается, потому что локально подргужается
      // если вдруг будут ошибки, ts-igonre к вашим услугам
      setTimeout(() => {
        import("./AboutPage");
      }, 1500);
    })
);
// export const AboutPageAsync = lazy(() => import("./AboutPage"))
