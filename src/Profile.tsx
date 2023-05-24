import { useEffect, useState } from "react";

import { User, MultipleArticlesResponse, Profile as ProfileType } from "typing";
import { formatDate } from "ArticleList";

export default function Profile() {

  const user = window.location.href.split('/').pop();

  const [isFavoritedMode, setIsFavoritedMode] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [data, setData] = useState<MultipleArticlesResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFavoritedMode) {
          const fetch1 = await fetchFavoritedArticles();
          setData(fetch1); 
          const fetch2 = await fetchProfile();
          console.log(fetch2);
          setProfile(fetch2);
          setFetched(true);
        } else {
          const fetch1 = await fetchMyArticles();
          setData(fetch1); 
          const fetch2 = await fetchProfile();
          console.log(fetch2);
          setProfile(fetch2);
          setFetched(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [isFavoritedMode]);

  const handleSelectMy = (event: any) => {
    event.preventDefault();
    setFetched(false);
    setIsFavoritedMode(false);
  }

  const handleSelectFavorite = (event: any) => {
    event.preventDefault();
    setFetched(false);
    setIsFavoritedMode(true);
  }

  async function fetchFavoritedArticles(): Promise<MultipleArticlesResponse> {
    const response = await fetch(`http://localhost:3000/api/articles?favorited=${user}`);
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData as MultipleArticlesResponse;
  }
  
  async function fetchMyArticles(): Promise<MultipleArticlesResponse> {
    const response = await fetch(`http://localhost:3000/api/articles?author=${user}`);
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData as MultipleArticlesResponse;
  }

  async function fetchProfile(): Promise<ProfileType> {
    const response = await fetch(`http://localhost:3000/api/profiles/${user}`);
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.profile as ProfileType;
  }

  return (
    <>

      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {profile?.image === null || profile?.image === "" ?
                  <img 
                    src="http://i.imgur.com/Qr71crq.jpg" 
                    className="user-img" 
                  />
                :
                  <img 
                    src={profile?.image as string}
                    className="user-img" 
                  />
                }
                <h4>{profile?.username}</h4>
                <p>
                  {profile?.bio}
                </p>
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {profile?.username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a 
                      className={!isFavoritedMode ? "nav-link active" : "nav-link"}
                      onClick={handleSelectMy}
                    >
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={isFavoritedMode ? "nav-link active" : "nav-link"} 
                      onClick={handleSelectFavorite}
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {!fetched ? 
                <p>Loading articles...</p>
              :
                <RenderArticles {...data as MultipleArticlesResponse}/>
              }

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

const RenderArticles = (data: MultipleArticlesResponse) => {

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

  return <>{data.articles.map((item) => {
    return (
      <>
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
      </>
    )
  })
  }</>
}