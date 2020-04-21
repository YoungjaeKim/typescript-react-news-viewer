import React from 'react';
import styled from 'styled-components';
import NewsItem, { Article } from "./NewsItem";
import axios from 'axios';
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

type Props = {
    category: string;
}

const NewsList = ({category}: Props) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=1a0ae4a4efa74e94aa8672940761fb7a`,
        );
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    // 아직 articles 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }

    if (error) {
        return <NewsListBlock>에러 발생</NewsListBlock>;
    }

    // response 값이 유효할 때
    const { articles } = response.data;
    return (
      <NewsListBlock>
          {articles.map((article: Article) => (
              <NewsItem key={article.url} article={article}/>
          ))}
      </NewsListBlock>
  );
};

export default NewsList;
