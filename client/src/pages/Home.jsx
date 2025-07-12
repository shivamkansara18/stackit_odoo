import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await API.get('/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      <Link to="/ask">
        <button>+ Ask a Question</button>
      </Link>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <Link to={`/question/${q._id}`}>
              <h3>{q.title}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: q.description.slice(0, 100) + '...' }} />
            <p>Tags: {q.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
