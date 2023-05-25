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
  }, [isFavoritedMode, fetched]);

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

  const handleFollow = (username: string) => {
    try {
      const response = fetch(`http://localhost:3000/api/profiles/${username}/follow`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      });
      setFetched(!fetched);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnfollow = (username: string) => {
    try {
      const response = fetch(`http://localhost:3000/api/profiles/${username}/follow`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      });
      setFetched(!fetched);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFavoritedArticles(): Promise<MultipleArticlesResponse> {
    const response = await fetch(`http://localhost:3000/api/articles?favorited=${user}`, {
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
  
  async function fetchMyArticles(): Promise<MultipleArticlesResponse> {
    const response = await fetch(`http://localhost:3000/api/articles?author=${user}`, {
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

  async function fetchProfile(): Promise<ProfileType> {
    const response = await fetch(`http://localhost:3000/api/profiles/${user}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        'Content-Type': 'application/json'
      }
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.profile as ProfileType;
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
              <button 
                className={item.favorited ? "btn btn-primary btn-sm pull-xs-right" : "btn btn-outline-primary btn-sm pull-xs-right"}
                onClick={item.favorited ? () => handleUnfavorite(item.slug) : () => handleFavorite(item.slug)}
              >
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

  const handleFavorite = (slug: string) => {
    try {
      const response = fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      });
      setFetched(!fetched);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnfavorite = (slug: string) => {
    try {
      const response = fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        }
      });
      setFetched(!fetched);
    } catch (error) {
      console.error(error);
    }
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
                {profile?.username != localStorage.getItem("username") &&
                  <button 
                    className= {profile?.following ? "btn btn-sm btn-secondary action-btn" : "btn btn-outline-primary btn-sm pull-xs-right"}
                    onClick={profile?.following ? () => {handleUnfollow(profile?.username)} : () => {handleFollow(profile?.username as string)}}
                  >
                    <i className="ion-plus-round" />
                    &nbsp; {profile?.following ? "Unfollow" : "Follow"} {profile?.username}
                  </button>
                }
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