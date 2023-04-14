import Head from "next/head";
import { useMemo } from "react";

import { APP_TITLE } from "../constants/app-info";

export type SeoLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const SeoLayout: React.FC<SeoLayoutProps> = ({ title, children }) => {
  const appTitle = useMemo(() => {
    const message = title?.concat(" | ");
    return `${message}${APP_TITLE}`;
  }, [title]);

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      {children}
    </>
  );
};
