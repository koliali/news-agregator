import { useEffect, useState } from "react"
import SingleNews from "../components/SingleNews"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const NewsList = ({ navApi }) => {

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const categoryList = [
    { id: '', title: 'None' },
    { id: 'entertainment', title: 'Entertainment' },
    { id: 'general', title: 'General' },
    { id: 'health', title: 'Health' },
    { id: 'science', title: 'Science' },
    { id: 'sports', title: 'Sports' },
    { id: 'technology', title: 'Technology' }
  ];

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {

    let url = ``;

    if (navApi == "NewsApi") {
      const formattedStartDate = startDate ? format(startDate, 'y-MM-dd') : '';
      const formattedEndDate = endDate ? format(endDate, 'y-MM-dd') : '';
      url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
      if (search) {
        url += `&q=${search}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      if (formattedStartDate) {
        url += `&from=${formattedStartDate}`;
      }
      if (formattedEndDate) {
        url += `&to=${formattedEndDate}`;
      }
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 429) { // Check if status is rate limited
            throw new Error('Rate limited. Please try again later or upgrade to a paid plan.');
          } else {
            throw new Error('Failed to fetch articles. Please try again later.');
          }
        })
        .then(data => {
          if (data && data.articles) {
            setArticles(data.articles);
          } else {
            throw new Error('Invalid response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching articles: ', error);
          setArticles([]);
        });
    }
    else if (navApi == "GuardiansApi") {
      const formattedStartDate = startDate ? format(startDate, 'y-MM-dd') : '';
      const formattedEndDate = endDate ? format(endDate, 'y-MM-dd') : '';
      url = `https://content.guardianapis.com/search?api-key=${import.meta.env.VITE_GUARDIANS_API_KEY}`;
      if (search) {
        url += `&q=${encodeURIComponent(search)}`;
      }
      if (category) {
        url += `&tag=${encodeURIComponent(category)}`;
      }
      if (formattedStartDate) {
        url += `&date-from=${formattedStartDate}`;
      }
      if (formattedEndDate) {
        url += `&date-to=${formattedEndDate}`;
      }
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 429) { // Check if status is rate limited
            throw new Error('Rate limited. Please try again later or upgrade to a paid plan.');
          } else {
            throw new Error('Failed to fetch articles. Please try again later.');
          }
        })
        .then(data => {
          if (data && data.response.results) {
            setArticles(data.response.results);
          } else {
            throw new Error('Invalid response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching articles: ', error);
          setArticles([]);
        });
      ;
    }
    else if (navApi == "NewYorkTimes") {
      const formattedStartDate = startDate ? format(startDate, 'yMMdd') : '';
      const formattedEndDate = endDate ? format(endDate, 'yMMdd') : '';
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${import.meta.env.VITE_NYTIMES_API_KEY}`;
      if (search) {
        url += `&q=${search}`;
      }
      if (category) {
        url += `&fq=${category}`;
      }
      if (formattedStartDate) {
        url += `&begin_date=${formattedStartDate}`;
      }
      if (formattedEndDate) {
        url += `&end_date=${formattedEndDate}`;
      }
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 429) { // Check if status is rate limited
            throw new Error('Rate limited. Please try again later or upgrade to a paid plan.');
          } else {
            throw new Error('Failed to fetch articles. Please try again later.');
          }
        })
        .then(data => {
          if (data && data.response.docs) {
            setArticles(data.response.docs);
          } else {
            throw new Error('Invalid response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching articles: ', error);
          setArticles([]);
        });
      ;
    }
  }, [navApi,category, search, startDate, endDate])

  return (
    <div className="p-4">
      <h2 className="text-center">Latest <span className="badge bg-primary fs-4">News API</span></h2>
      <div className="container py-4">
        <div className="row  align-items-center">
          <div className="col-12 col-md-6 ">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {/* <div className="col-2">
            <div className="input-group mb-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="y-MM-dd"
                className="form-control"
                placeholderText="Select Start Date"
              />
            </div>
          </div>
          <div className="col-2">
            <div className="input-group mb-3">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="y-MM-dd"
                className="form-control"
                placeholderText="Select End Date"
              />
            </div>
          </div> */}
          <div className="col-12 col-md-6">
            <div className="row">
              {/* <div className="col-12">
                <h1>Categories</h1>
              </div> */}
              {categoryList.map((cat, index) => {
                return <div className="col mb-2" key={index}>
                  <div className={`btn btn-outline-primary rounded-pill d-block ${category === cat.id ? 'btn-primary text-white' : 'btn-outline-primary'}`} onClick={() => setCategory(cat.id)}>{cat.title}</div>
                </div>;
              })}
            </div>
          </div>

        </div>
        <div className="row g-4">
          {
            articles.length > 0 ? (
              articles.map((news, index) => {
                if (navApi === "NewsApi") {
                  return (
                    <SingleNews
                      key={index}
                      title={news.title}
                      description={news.description}
                      image={news.urlToImage}
                      url={news.url}
                    />
                  );
                }
                else if (navApi === "GuardiansApi") {
                  return (
                    <SingleNews
                      key={index}
                      title={news.webTitle}
                      description={null}
                      image={`https://picsum.photos/id/${Math.floor(Math.random() * (99 + 1)) + 0}/400/250`}
                      url={news.webUrl}
                    />
                  );
                }
                else if (navApi === "NewYorkTimes") {
                  return (
                    <SingleNews
                      key={index}
                      title={news.abstract}
                      description={news.lead_paragraph}
                      image={news.multimedia?.[0]?.url ? `https://static01.nyt.com/${news.multimedia?.[0]?.url}` : `https://picsum.photos/id/${Math.floor(Math.random() * (0 - 99 + 1)) + 0}/400/250` }
                      url={news.web_url}
                    />
                  );
                }
              })
            ) : (
              <div className="alert alert-warning text-center" role="alert">
                No data available
              </div>
            )}

        </div>
      </div>
    </div>
  )
}

export default NewsList
