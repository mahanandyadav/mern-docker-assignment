const express = require('express');
const User = require('../model/model');

const routes = express.Router();

routes.get('/', async (req, res, next) => {
    if (!req.session.countClick) {
        req.session.countClick = 0
        console.log('if runs')
    }
    req.session.countClick++;
    console.log(req.session.countClick)
    res.send({
        "countCokkie":req.session.countClick,
        "count":{"update":updateCount,"add":addCount}
    })
})

var addCount=0;
var updateCount=0;
routes.post('/', async (req, res) => {

    // console.log(req.body)
    console.log("post method")
    const user = new User(req.body)
   
    try {
        await user.save()
        if (!req.session.countClick) {
            req.session.countClick = 0
            console.log('if runs')
            console.log(req.session);
        }
            req.session.countClick++  
            // addCount++;
            res.cookie("add",addCount++)      
        res.send({ "user": user, "countClick": req.session.countClick });
    } catch (e) {
        res.send(e)
    }
})

routes.patch('/', async (req, res) => {
    const _id = req.query.id;
    console.log("post patch")
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']
    const isValidUpdateOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidUpdateOperation) {
        return res.status(405).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findOne({ _id })
        if (!user) {
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();
        updateCount++;
        res.cookie('update',updateCount++)
       console.log(req.cookies)
        res.send(user);
    } catch (e) {
        res.send(e)
    }
})
module.exports = routes;