import express from 'express'
import flats from './flats.json' assert { type: "json" }
import cors from 'cors'

const app = express()
const port = 3000

import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('flats.db', sqlite3.OPEN_READWRITE);

app.use(cors())

flats.forEach(flat => {
    const collectedKeyValues = []
    for (let value of Object.values(flat)){
        if (typeof value === 'string')
            value = value.replace(',','.')
        collectedKeyValues.push('"' + value + '"')
    }
    console.log(collectedKeyValues.join(', '))
    db.run(`INSERT INTO flatList (flat_id, floor, pos_on_floor, price, rooms, area_total, area_kitchen, area_live, layout_image) VALUES (${collectedKeyValues.join(', ')})`)
})

app.get('/flat-list', (req, res) => {
    let list = []
    db.all('SELECT *, flat_id as id FROM flatList', (err, rows) => {
        res.json(rows)
    })
    // res.json(list)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})