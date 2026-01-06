import { useMemo } from "react";
import { useNavigate } from "react-router";
import useGetCategories from "../../hooks/useGetCategories";
import { InputAdornment, styled, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Category from "./component/Category";
import { getRandomRGBColor } from "../../utils/color";

const SearchPage = () => {
  const { data, isLoading, error } = useGetCategories({ country: "KR", limit: 12 });
  const navigate = useNavigate();

  // 카테고리 ID별 색상 매핑 상태
  const colorMapping = useMemo(() => {
    const map: Record<string, string> = {};
    data?.categories.items.forEach((cat) => {
      map[cat.id] = getRandomRGBColor();
    });
    return map;
  }, [data]);

  return (
    <SearchSection>
      {/* 검색어 입력 */}
      <TextArea>
        <SearchInput
          placeholder="What do you want to contents?"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          aria-label="Search"
        />
      </TextArea>

      <SearchTitle variant="h4">Browse all</SearchTitle>

      {/* 로딩 중 */}
      {isLoading && <LoadingSpinner />}

      {/* 에러 */}
      {error && <ErrorMessage message="카테고리 로드에 실패 했습니다" />}

      {/* 카테고리 그리드 */}
      <CategoryGrid>
        {data?.categories.items.map((cat) => {
          return (
            <CategoryItem key={cat.id}>
              <Category
                id={cat.id}
                name={cat.name}
                iconUrl={cat.icons[0]?.url}
                bgColor={colorMapping[cat.id] ?? getRandomRGBColor()}
                onClick={(id) => navigate(`/search?category=${id}`)}
              />
            </CategoryItem>
          );
        })}
      </CategoryGrid>
    </SearchSection>
  );
};

export default SearchPage;

// 스타일드컴포넌트
const SearchSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TextArea = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SearchTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  // TextField root
  "& .MuiOutlinedInput-root": {
    borderRadius: 999,
    backgroundColor: "#121212",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },

    "& input": {
      color: theme.palette.common.white,
    },

    "& .MuiInputAdornment-root": {
      color: theme.palette.common.white,
    },
  },
}));

const CategoryGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
  gap: theme.spacing(2),
}));

const CategoryItem = styled("div")(() => ({}));
