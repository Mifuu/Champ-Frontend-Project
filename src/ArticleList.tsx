import { useEffect, useState } from "react";

import { Article, MultipleArticlesResponse } from "typing";

const ArticleList = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState<MultipleArticlesResponse | null>(null);
  const [isGlobalMode, setIsGlobalMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch1 = await fetchArticles();
        setData(fetch1);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [fetched]);

  async function fetchArticles(): Promise<MultipleArticlesResponse> {
    if (isGlobalMode) {
      const response = await fetch('http://localhost:3000/api/articles');
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData as MultipleArticlesResponse;
    } else {
      const response = await fetch('http://localhost:3000/api/articles/feed', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      });
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData as MultipleArticlesResponse;
    }
  }

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a 
                      className={!isGlobalMode ? "nav-link active"  : "nav-link disabled" }
                      onClick={() => {setIsGlobalMode(false); setData(null); setFetched(!fetched);}}
                    >
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a 
                      className={isGlobalMode ? "nav-link active"  : "nav-link disabled" }
                      onClick={() => {setIsGlobalMode(true); setData(null); setFetched(!fetched);}}
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {data === null ? 
                <p>Loading articles...</p>
              :
                <RenderFeed {...data as MultipleArticlesResponse}/>
              }

            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}

const RenderFeed = (data: MultipleArticlesResponse) => {

  

  /*
  const data: Article = {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: Profile
  }
  */
 if (data === undefined || data === null || data.articles === undefined) {
  return <>
    <p>No data...</p>
  </>
 }

  return <>{data.articles.map((item) => {
    return (
      <div className="article-preview" key={item.slug}>
        <div className="article-meta">
          <a href={`/#/profile/${item.author.username}`}>
            {(item.author.image === "") ? 
            <img src="http://i.imgur.com/Qr71crq.jpg" />
            :
            <img src={item.author.image} />
            }
          </a>
          <div className="info">
            <a href={`/#/profile/${item.author.username}`} className="author">
              {item.author.username}
            </a>
            <span className="date">{formatDate(item.createdAt)}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> {item.favoritesCount}
          </button>
        </div>
        <a href={`/#/${item.slug}`} className="preview-link">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    )
  })
  }</>
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
}

export default ArticleList;