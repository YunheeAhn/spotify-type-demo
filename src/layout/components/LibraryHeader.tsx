import React from "react";

import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

const LibraryHeader = () => {
  return (
    <Head>
      <HeadBox display={"flex"}>
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </HeadBox>

      <ButtonBox>
        <Button>
          <AddIcon />
        </Button>
      </ButtonBox>
    </Head>
  );
};

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
});

const HeadBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const ButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
});

export default LibraryHeader;
