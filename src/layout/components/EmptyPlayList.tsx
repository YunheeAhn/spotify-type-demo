import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const EmptyPlayList = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton variant="contained" color="secondary">
        Create playlist
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,

  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

export default EmptyPlayList;
