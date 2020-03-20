import "../assets/styles/bootstrap.min.css";
import "../assets/styles/fontawesome.min.css";
import "../assets/styles/style.scss";
import "../assets/styles/responsive.scss";
import "../assets/styles/animate.min.css";
import "../assets/styles/slick.css";
import "../assets/styles/slick-theme.css";

import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import { DefaultSeo } from "next-seo";
import GoTop from "../components/Shared/GoTop";
import { getToken } from "../services/api";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx, ctx: { store } }) {
      await store.dispatch(getToken());
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Container>
          <DefaultSeo
            title="Glatt Mart - Kosher Market Los Angeles"
            description="Glatt Kosher Groceries, Glatt Kosher Delivery Service, Kosher Groceries Online"
            openGraph={{
              type: "website",
              locale: "en_IE",
              url: "https://www.laglattmart.com/",
              site_name: "Glatt Mart - Kosher Market Los Angeles"
            }}
          />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </Container>
      );
    }
  }
);
