import { useInfiniteQuery } from "@tanstack/react-query"

// 진행 중

// 키워드 검색 결과 가져오는 훅
const useSearchItemsByKeyword = (params:) => {
    retrun useInfiniteQuery({
        queryKey:["search", params],
        queryFn : ({pageParam = 0}) => {
            retrun SearchItemsByKeyword(params)
        },
        initialPageParam : 0,
        getNextPageParam:(lastPage)=>{}
    })
}