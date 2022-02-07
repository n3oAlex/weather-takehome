import Head from "next/head";

type HeadOptions = {
  description?: string;
  overrideTitle?: boolean;
};

type Props = { title: string; options?: HeadOptions };
export const GiveHead = (props: Props) => {
  return (
    <Head>
      {props.options?.overrideTitle ? (
        <title>{props.title}</title>
      ) : (
        <title>Weather takehome {props.title !== "" ? "- " + props.title : ""}</title>
      )}
      {props.options?.description ? (
        <meta name="description" content={props.options.description} />
      ) : null}
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
  );
};
