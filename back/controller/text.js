const { Op } = require('sequelize');
const Text = require('../model/Text');
const Like = require('../model/Like');
const User = require('../model/User');

exports.create = async (req, res, next) => {
    try{
        const text = await Text.create({
            ...req.body,
            UserId: res.locals.userId
        });
        res.status(201).json(text);
    }
    catch(error){
        res.status(500).json(error);
    }
};

exports.modify = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id);
        const amendedText = await text.update(req.body);
        res.status(200).json(amendedText);
    }
    catch(error){
        res.status(404).json(error);
    }
};

exports.delete = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id);
        const amendedText = await text.destroy();
        res.status(200).json({message: "Le texte a été supprimé."});
    } 
    catch(error){
        res.status(404).json(error);
    }
}

exports.restore = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id, { paranoid: false });
        text.restore();
        res.status(200).json({message: "Texte restauré"})
    }
    catch(error){
        res.status(404).json(error);
    }
}

exports.destroy = async (req, res, next) => {
    try{
        Text.destroy({
            where: {
                parent: req.params.id
            },
            force: true
        })
        const text = await Text.findByPk(req.params.id, { paranoid: false });
        text.destroy({ force: true });
        res.status(200).json({message: "Texte supprimé."})
    }
    catch(error){
        res.status(404).json(error);
    }
}

exports.show = async (req, res, next) => {
    try{
        const text = await Text.findByPk(req.params.id, {
            include : [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'role']
                },
                {
                    model: Like,
                    attributes: ['UserId'],
                    include: User
                },
                {
                    model: Text,
                    include: [Like, User]
                }
            ]
            // include: {all: true, nested: true}
        });
        res.status(200).json(text);
    }
    catch(error){
        res.status(404).json(error);
    }
}

exports.showAll = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const texts = await Text.findAndCountAll({
            include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'role']
                    },
                    Text,
                    Like
                ],
            where: {
                ParentId: null
            },
            offset: offset,
            limit: 9,
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(texts);
    }
    catch(error){
        res.status(500).json(error);
    }
}

exports.showDeleted = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const texts = await Text.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                Like,
                Text
            ],
            where: {
                [Op.not]: {
                    deletedAt: null
                }
            },
            offset: offset,
            limit: 9,
            order: [
                ['createdAt', 'DESC']
            ],
            paranoid: false
        });
        res.status(200).json(texts);
    }
    catch(error){
        res.status(500).json(error);
    }
}

exports.showResponses = async (req, res, next) => {
    const offset = (req.params.page - 1 ) * 9;
    try{
        const responses = await Text.findAndCountAll({
           include : [
               {
                   model: User,
                   attributes: ['id', 'firstName', 'lastName', 'role']
               },
               {
                   model: Like,
                   attributes: ['UserId']
               }
           ],
           where: {
               ParentId: req.params.id
           },
           offset: offset,
           limit: 9,
           order: [
            ['createdAt', 'ASC']
            ]
        })
        res.status(200).json(responses);
    } catch(error){
        res.status(500).json(error);
    }
}