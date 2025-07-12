import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AskQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTags() {
      const res = await API.get('/tags');
      setAllTags(res.data.map(tag => ({ value: tag._id, label: tag.name })));
    }
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagValues = tags.map(tag => tag.value);
    try {
      await API.post('/questions', { title, description, tags: tagValues });
      alert('Question submitted!');
      navigate('/');
    } catch (err) {
      alert('Error submitting question');
    }
  };

  return (
    <div className="ask-container" style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2>Ask a New Question</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Enter detailed description"
        />
        <Select
          isMulti
          options={allTags}
          onChange={setTags}
          placeholder="Select tags"
        />
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
}

export default AskQuestion;
