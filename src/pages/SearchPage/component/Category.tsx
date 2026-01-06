import { Avatar, Box, Card, CardActionArea, CardContent, styled, Typography } from "@mui/material";

// 카테고리 컴포넌트 props 타입 정의
type CategoryProps = {
  id: string;
  name: string;
  iconUrl?: string;
  onClick?: (id: string) => void;
  bgColor: string;
};

const Category = ({ id, name, iconUrl, onClick, bgColor }: CategoryProps) => {
  return (
    <CategoryCard bgColor={bgColor}>
      <CategoryActionArea onClick={() => onClick?.(id)} aria-label={`Open ${name}`}>
        <CategoryContent>
          <CategoryTitle variant="subtitle1">{name}</CategoryTitle>
          <CategorySubTitle variant="body2">Playlist · Topic</CategorySubTitle>
        </CategoryContent>

        <IconWrapper>
          {iconUrl ? (
            <CategoryAvatar src={iconUrl} variant="rounded" />
          ) : (
            <CategoryPlaceholderAvatar variant="rounded" />
          )}
        </IconWrapper>
      </CategoryActionArea>
    </CategoryCard>
  );
};

export default Category;

// 스타일드 컴포넌트
const CategoryCard = styled(Card)<{ bgColor: string }>(({ bgColor, theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: bgColor,
  color: theme.palette.common.white,
  height: 140,
}));

const CategoryActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  height: "100%",

  "&:focus-visible": {
    outline: "2px solid rgba(255,255,255,0.12)",
    outlineOffset: 2,
  },
}));

const CategoryContent = styled(CardContent)(() => ({
  flex: 1,
  padding: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

const CategoryTitle = styled(Typography)(() => ({
  fontWeight: 700,
}));

const CategorySubTitle = styled(Typography)(() => ({
  opacity: 0.8,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const CategoryAvatar = styled(Avatar)(() => ({
  width: 72,
  height: 72,
}));

const CategoryPlaceholderAvatar = styled(Avatar)(() => ({
  width: 72,
  height: 72,
  backgroundColor: "rgba(255,255,255,0.06)",
}));
