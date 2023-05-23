import { useEffect, useState } from "react";

import { Article as Arti } from "typing";
import { formatDate } from "ArticleList";

const Article = () => {

  const slug = window.location.href.split('/').pop();

  const [data, setData] = useState<Arti | null>(null);

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
  }, [])

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>

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
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            &nbsp; Follow {item.author.username} <span className="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
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
          <button className="btn btn-sm btn-outline-primary">
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

async function fetchArticle(slug: string): Promise<Arti> {
  const response = await fetch('http://localhost:3000/api/articles/' + slug);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData as Arti;
}

export default Article;