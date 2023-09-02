const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
require('dotenv/config')

//add a post
router.post('/', (req, res) => {
  const { title ,description} = req.body
  const post = new Post({
    title: title,
    description: description
  })
  post.save()
  .then(data => {
    res.json(data)
  }).catch(err => {
    res.json({message : err})
  })
  //res.json({title: title,description: description})
});

// get all posts
router.get('/', async (req, res) => {
  try{
    const post = await Post.find() 
    res.json(post)
  }catch(err){
    res.json({message : err})
  }
})

// get a specific post
router.get('/:postId', async (req,res)=>{
  const {postId} = req.params
  try{
    const post = await Post.findById(postId)
    res.json(post)
  }catch(err){
    res.json({message : err})
  }
})

//delete a specific post
router.delete('/:postId', async (req,res)=>{
  try{
    const {postId} = req.params
    const removedPost = await Post.deleteOne({_id: postId})
    res.json(removedPost)
  }catch(err){
    res.status(400).json({message : err})
  }
})


//modigicar a specific post
router.patch('/:postId', async (req,res)=>{
  const {postId} = req.params
  const {title, description} = req.body
  try{
    const updatedPost = await Post.updateOne({_id: postId},{$set: { title: title, description: description}}) 
    res.json(updatedPost)
  }catch(err){
    res.json({message : err})
  }
})
module.exports = router
