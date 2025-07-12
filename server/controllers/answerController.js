const Answer = require('../models/Answer');

exports.postAnswer = async (req, res) => {
  const { content } = req.body;
  try {
    const answer = await Answer.create({
      content,
      author: req.user.id,
      question: req.params.questionId,
    });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.voteAnswer = async (req, res) => {
  const { vote } = req.body; // 1 for upvote, -1 for downvote
  try {
    const answer = await Answer.findById(req.params.id);
    const existingVote = answer.voters.find(v => v.userId === req.user.id);
    if (existingVote) {
      return res.status(400).json({ msg: 'Already voted' });
    }
    answer.voters.push({ userId: req.user.id, vote });
    answer.votes += vote;
    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};