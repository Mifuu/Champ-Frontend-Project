import { useEffect, useState } from "react";

import { Article as Arti } from "typing";
import { formatDate } from "ArticleList";

const Article = () => {

  const slug = window.location.href.split('/').pop();

  const [data, setData] = useState<Arti | null>(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const fetch1 = await fetchArticle(slug as string) as Arti;
          setData(fetch1);
        } catch (error) {
          console.error(error)
        }
    }

    console.log("slug: " + slug);
      fetchData();
  }, [fetched])

  const handleFavorite = async (slug: string) => {
    console.log("test");
    try {
      const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
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

  const RenderArticle = (data: any) => {
    const item: Arti = data.article as Arti;
  
    return <>
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{item.title}</h1>
  
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
              className= {item.author.following ? "btn btn-sm btn-secondary" : "btn btn-sm btn-outline-secondary"}
              onClick={item.author.following ? () => {handleUnfollow(item.author.username)} : () => {handleFollow(item.author.username as string)}}
            >
              <i className="ion-plus-round" />
              &nbsp; {item.author.following ? "Unfollow" : "Follow"} {item.author.username}
            </button>
            &nbsp;&nbsp;
            <button 
              className={item.favorited ? "btn btn-primary btn-sm pull-xs-right" : "btn btn-outline-primary btn-sm pull-xs-right"}
              onClick={item.favorited ? () => handleUnfavorite(item.slug) : () => handleFavorite(item.slug)}
            >
              <i className="ion-heart" /> 
              &nbsp; Favorite Post <span className="counter">({item.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
  
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{item.description}</p>
            {/*}<h2 id="introducing-ionic">{item.body}</h2>{*/}
            <p>{item.body}</p>
          </div>
        </div>
  
        <hr />
  
        <div className="article-actions">
          <div className="article-meta">
            <a href="/#/profile/ericsimmons">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="/#/profile/ericsimmons" className="author">
                Eric Simons
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button 
              className={item.favorited ? "btn btn-primary btn-sm pull-xs-right" : "btn btn-outline-primary btn-sm pull-xs-right"}
              onClick={item.favorited ? () => handleUnfavorite(item.slug) : () => handleFavorite(item.slug)}
            >
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({item.favoritesCount})</span>
            </button>
          </div>
        </div>
  
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
  
            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>
  
            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  }

  return (
    <>

      {data === null ?
        <p>Loading the article...</p>
      :
        <RenderArticle {...data}/>
      }

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

async function fetchArticle(slug: string): Promise<Arti> {
  const response = await fetch('http://localhost:3000/api/articles/' + slug, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
      'Content-Type': 'application/json'
    }
  });
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData as Arti;
}

export default Article;