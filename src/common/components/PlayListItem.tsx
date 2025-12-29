import { ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from "@mui/material";

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
  selected?: boolean;
}

const PlayListItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  return (
    <PlayListItemContainer onClick={() => handleClick(id)} selected={selected || false}>
      {/* 이미지 섹션 */}
      <PlaylistAvatar className="image-sec">
        {image ? <img src={image} alt={name} /> : "No image"}
      </PlaylistAvatar>

      {/* 텍스트 섹션 */}
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
        secondary={
          <Typography variant="body1" color="text.secondary">
            {artistName}
          </Typography>
        }
      />
    </PlayListItemContainer>
  );
};
export default PlayListItem;

// 스타일드 컴포넌트
const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  padding: "5px",
  boxSizing: "border-box",
  alignItems: "center",
  borderRadius: "8px",
  backgroundColor: selected ? theme.palette.action.active : "",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& + &": {
    marginTop: "10px",
  },

  "& .image-sec": {
    transition: "all 0.3s ease",
  },
  "&:hover .image-sec": {
    transform: "rotate(360deg)",
    transition: "all 6s ease",
  },
}));

const PlaylistAvatar = styled(ListItemAvatar)({
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  overflow: "hidden",
  fontSize: "14px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "5px",
  //   transition: "all .3s ease",

  "& img ": {
    width: "100%",
    height: "100%",
    objetFit: "cover",
  },
});

const PlaylistName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  width: "calc(100% - 60px)",
}));
