import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => Promise.resolve(import("./NavBar")), { ssr: false });

const Wrapper = styled("div")({
  maxWidth: "100vw",
  minHeight: "100vh",
});

const PageContent = styled("div")((p) => ({
  padding: p.theme.spacing(2),
  width: "100%",
}));

export const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Stack width="100%">
        <Stack direction="row" width="100%">
          <NavBar />
          <PageContent>{props.children}</PageContent>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
