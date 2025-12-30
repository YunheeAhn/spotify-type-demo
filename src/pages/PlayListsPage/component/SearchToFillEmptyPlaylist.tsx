import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";

// 진행 중

const SearchToFillEmptyPlaylist = () => {
  const [keyword, setKeyword] = useState<string>(""); // useState의 제네릭
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    // React.ChangeEvent<HTMLInputElement> : input에서 오는 event의 타입
    // keyword를 입력하면 입력 값 보여주기
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let’s fill this playlist!
      </Typography>

      <TextField value={keyword} onChange={handleSearchKeyword} />
    </div>
  );
};

export default SearchToFillEmptyPlaylist;
