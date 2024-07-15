const express = require('express');

const router = express.Router();

// Example endpoint to get content for the website
router.get('/videos', (req, res) => {
  // Fetch videos from database (this is just a placeholder)
  const videos = [
    { id: 1, title: 'Video 1', url: 'videos/video1.mp4' },
    { id: 2, title: 'Video 2', url: 'videos/video2.mp4' },
    { id: 3, title: 'Video 3', url: 'videos/video3.mp4' }
  ];
  res.json(videos);
});

router.get('/events', (req, res) => {
  // Fetch events from database (this is just a placeholder)
  const events = [
    { id: 1, title: 'Event 1', date: '2024-08-01' },
    { id: 2, title: 'Event 2', date: '2024-09-15' },
    { id: 3, title: 'Event 3', date: '2024-10-30' }
  ];
  res.json(events);
});

module.exports = router;
