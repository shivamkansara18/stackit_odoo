import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ReactQuill from 'react-quill';

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get(`/questions/${id}`);
        setQuestion(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, refresh]);

  const postAnswer = async () => {
    if (!localStorage.getItem('token')) {
      alert('Login required to post answer');
      navigate('/login');
      return;
    }
    try {
      await API.post(`/answers/${id}`, { content: answer });
      setAnswer('');
      setRefresh(!refresh);
    } catch (err) {
      alert('Posting answer failed');
    }
  };

  const acceptAnswer = async (answerId) => {
    await API.put(`/questions/${id}/accept/${answerId}`);
    alert('Answer accepted!');
    setRefresh(!refresh);
  };

  return question ? (
    <div>
      <h2>{question.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: question.description }} />
      <p>Tags: {question.tags.map(tag => tag.name).join(', ')}</p>

      <h3>Answers:</h3>
      <ul>
        {question.answers.map((ans) => (
          <li key={ans._id}>
            <div dangerouslySetInnerHTML={{ __html: ans.content }} />
            <p>By: {ans.author?.username} | Votes: {ans.votes}</p>
            {user?.id === question.author._id && (
              <button onClick={() => acceptAnswer(ans._id)}>Accept Answer</button>
            )}
            {question.acceptedAnswer === ans._id && <strong>✔ Accepted</strong>}
          </li>
        ))}
      </ul>

      <h4>Your Answer:</h4>
      <ReactQuill value={answer} onChange={setAnswer} />
      <button onClick={postAnswer}>Post Answer</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default QuestionDetail;
