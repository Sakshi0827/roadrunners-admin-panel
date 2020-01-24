const Blogs = require('../models/blogs');
const Blogs_category = require('../models/blogs_category');

const upload = require('../index');

exports.blogs_list = function (req, res) {
    res.locals = {  title: 'Blog List' };
    res.render('Blogs/blogs_list');
    console.log(upload);
};

exports.blogs_category =  function (req, res) {
    res.locals = {  title: 'Blog Category' };
    try{
        Blogs_category.sync({ force: false }).then((result) => {
        console.log("Result of sync", result);
        Blogs_category.findAll({ }).then(blogs_category => {
        console.log("All blogs_category:", JSON.stringify(blogs_category, null, 4));
        if(!blogs_category.length){
            return res.json({
                status: 404,                        
                message: "blogs_category not found."
            })    
        }
        return res.render('Blogs/blogs_category', {
            status: 200,
            data: blogs_category,
            message: "blogs_category fetched successfully."
        })
    })
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    return res.json({
        status: 500,
        data: err,
        message: "company fetching failed."
    })
    });
} catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
    }
};

exports.add_blogs =  function (req, res) {
    res.locals = {  title: 'Add Blogs' };
    res.render('Blogs/add_blogs');
};

exports.add_blogs_category =  function (req, res) {
    res.locals = {  title: 'Add Blogs Category' };
    res.render('Blogs/add_blogs_category');
};

//POST 

exports.add_blogs_post =  function (req, res) {
    res.locals = {  title: 'Add Blogs' };
    Blogs.sync({ force: false }).then((result) => {
        console.log("Result of sync", result);
        Blogs.create(
            req.body
        ).then(blogs => {
            console.log("New Blog's auto-generated ID:", blogs_name.blogs_id);
            return res.redirect('/blogs-list');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "New Blogs creation failed."
            })
        });
    }).catch((exception) => {
        console.log("An exception was encountered during the synchronization", exception);
    })
};


exports.add_blogs_category_post =  function (req, res) {
    // const blogs_category_name = req.body.blogs_category_name;
    // console.log(req.body);
    //DB
    Blogs_category.sync({ force: false }).then((result) => {
        console.log("Result of sync", result);
        Blogs_category.create(
            req.body
        ).then(blogs_category_name => {
            console.log("New Blog Category's auto-generated ID:", blogs_category_name.blogs_category_id);
            return res.redirect('/blogs-category');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "New Blogs Category creation failed."
            })
        });
    }).catch((exception) => {
        console.log("An exception was encountered during the synchronization", exception);
    })
};