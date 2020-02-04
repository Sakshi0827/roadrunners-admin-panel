const Fitness_group = require('../models/fitness_group');

exports.fitnessGroup_list = function (req, res) {
    res.locals = {  title: 'Fitness Group' };
    try{
        Fitness_group.findAll({ }).then(fitness_group => {
            console.log("All Fitness Group:", JSON.stringify(fitness_group, null, 4));
            return res.render('Fitness-group/fitness_group', {
                status: 200,
                data: fitness_group,
                message: "Fitness Group fetched successfully."
            })
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Fitness Group fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};


exports.add_fitnessGroup = function (req, res) {
    res.locals = {  title: 'Add Fitness Group' };
    res.render('Fitness-group/add_fitness_group');
};


exports.add_fitnessGroup_post = function (req, res) {
    const fitness_group_name = req.body.fitness_group_name;
    console.log(req.body);
    //DB
    Fitness_group.sync({ force: false }).then((result) => {
        console.log("Result of sync", result);
        Fitness_group.create(
            req.body
        ).then(fitness_group_name => {
            console.log("New Fitness Group's auto-generated ID:", fitness_group_name.fitness_group_id);
            // return res.json({
            //     status: 200,
            //     data: fitness_group_name,
            //     message: "New Fitness Group created successfully."
            // })
            res.redirect('/fitness-group')
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "New Fitness Group creation failed."
            })
        });
    }).catch((exception) => {
        console.log("An error was encountered during the synchronization", error);
    })
};

//Delete fitness group
exports.delete_fitnessGroup = function (req, res){
    console.log(`Attempting to destroy a fitnessGroup with fitness_group_id ${req.params.fitness_group_id}`);
    Fitness_group.destroy({
        where: {
            fitness_group_id: req.params.fitness_group_id
        }
    }).then((result) => {
        if(result){
            console.log("The fitness group was deleted.", result);
            return res.json({
                status: 200,
                data: result,
                message: "fitness group delete successful."
            })
        } else {
            console.log("fitness group delete failed.", result);
            return res.json({
                status: 404,
                data: result,
                message: "fitness group delete failed, no record found to delete."
            })
        }
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "fitness group deletion failed."
        })
    });
};
