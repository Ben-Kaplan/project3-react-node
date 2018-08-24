const express = require('express');
const router = express.Router();
const Games = require('../models/Games');

// Index Route
router.get('/', async (req, res, next) => {
    try  {
      const allGames = await Games.find();
      res.json({
        status: 200,
        data: allGames
      })
    } catch (err){
      res.send(err)
    }
});
// Create Route
router.post('/', async (req, res) => {
    try {
      const createdGame = await Games.create(req.body);
      res.json({
        status: 200,
        data: createdGame
      });

    } catch(err){
      res.send(err);
    }
});
// Show route
router.get('/:id', async (req, res, next) => {
    try  {
        const foundGames = await Games.findById(req.params.id);
        res.json({
          status: 200,
          data: foundGames
        });
    } catch (err){
        res.send(err);
    }
});

module.exports = router;

