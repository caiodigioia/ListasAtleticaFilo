const router = require('express').Router();

const Person = require('../models/Person'); 

// Create
router.post('/person', async (req, res) => {

    

    // req.body
    const { nome, email } = req.body

    if (!nome) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    if (!email) {
        res.status(422).json({error: 'O e-mail é obrigatório!'})
        return
    }

    const person = {
        nome,
        email
    }

    try {
        // criando dados
        await Person.create(person)

        res.status(201).json({message: 'pessoa inserida no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({erro: error})
    }

})

// Read
router.get('/person', async (req, res) => {

    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({erro: error})
    }
})

// read usuario por id
router.get('/person/:id', async (req, res) => {

    // extrair dado da req, pela URL = req.params
    const id = req.params.id

    try {
        
        const person = await Person.findOne({ _id: id })

        if (!person) {
             res.status(422).json({message: 'O usuário não foi encontrado!'})
             return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({erro: error})
    }

})

// Update (PUT e PATCH)
router.patch('/person/:id', async (req, res) => {

    const id = req.params.id

    const { nome, email } = req.body

    const person = {
        nome,
        email 
    }

    try {

        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
             return
        }
         
        res.status(200).json(person)

    } catch(error) {
        res.status(500).json({erro: error})
    }

})

// Delete

router.delete('/person/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

        if (!person) {
             res.status(422).json({message: 'O usuário não foi encontrado!'})
             return
        }

        try {
            
            await Person.deleteOne({_id: id})
            res.status(200).json({message: 'Usuário excluído com sucesso'})

        } catch (error) {
            res.status(500).json({erro: error})
        }

})



module.exports = router;