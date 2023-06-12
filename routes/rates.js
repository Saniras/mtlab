    const express = require('express');
    const Rate = require('../models/Rate.js');
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });
    const readXlsxFile = require('read-excel-file/node');
    const router = express.Router();


    router.get('/rates', async (req, res) => {
        const rates = await Rate.find().sort({ name: 1 });
        res.render('rates', {
            posts: rates
        });

        if (!rates)
            return res.status(404).send('Not found!');
    });

    router.post('/upload', upload.single('file'), async (req, res) => {
        try {
            let rows = await readXlsxFile(req.file.path);
            rows.shift(); // To remove header if you have in your excel file

            rows.forEach(async row => {
                const rate = new Rate({
                    liner: row[0] || 'Unknown',
                    mode: row[1] || 'Unknown',
                    pol: row[2] || 'Unknown',
                    pod: row[3] || 'Unknown',
                    loading: row[4] || 'Unknown',
                    discharge: row[5] || 'Unknown',
                    country: row[6] || 'Unknown',
                    dep: row[7] || 'Unknown',
                    unit: row[8] || 'Unknown',
                    oft: row[9] || 0,
                    lss: row[10] || 0,
                    d_port: row[11] || 0,
                    rail: row[12] || 0,
                    convoy: row[13] || 0,
                    d_thc: row[14] || 0,
                    dpb: row[15] || 0,
                    dps: row[16] || 0,
                    ttl: row[17] || 0,
                    valid: row[18] || 'Unknown',
                    remark: row[19] || 'No remarks'
                });

                try {
                    await rate.save();
                } catch (error) {
                    console.log(error)
                }
            });

            res.redirect('rates');
        } catch(err) {
            console.log(err);
            res.status(500).send('An error occurred while uploading the file.');
        }
    });


    router.get('/create', (req, res) => {
        res.render('create');
    }); 


    router.post('/create', async (req, res) => {
            const rate = new Rate({
                liner: req.body.liner,
                mode: req.body.mode,
                pol: req.body.pol, 
                pod: req.body.pod, 
                loading: req.body.loading,
                discharge: req.body.discharge,
                country: req.body.country,
                dep: req.body.dep,
                unit: req.body.unit,
                oft: req.body.oft,
                lss: req.body.lss,
                d_port: req.body.d_port,
                rail: req.body.rail,
                convoy: req.body.convoy,
                d_thc: req.body.d_thc,
                dpb: req.body.dpb,
                dps: req.body.dps,
                ttl: req.body.ttl,
                valid: req.body.valid,
                remark: req.body.remark
             });

            if (checkRate.length > 0)
                return res.status(400).render('create', {
                    errorCheck: 'Already exist!'
                });

        const rate = new Rate({
            liner: req.body.liner,
                mode: req.body.mode,
                pol: req.body.pol, 
                pod: req.body.pod, 
                loading: req.body.loading,
                discharge: req.body.discharge,
                country: req.body.country,
                dep: req.body.dep,
                unit: req.body.unit,
                oft: req.body.oft,
                lss: req.body.lss,
                d_port: req.body.d_port,
                rail: req.body.rail,
                convoy: req.body.convoy,
                d_thc: req.body.d_thc,
                dpb: req.body.dpb,
                dps: req.body.dps,
                ttl: req.body.ttl,
                valid: req.body.valid,
                remark: req.body.remark
             });

        try {
            await rate.save();
            res.redirect('/rates')
        } catch (error) {
            console.log(error)
        }
    });

    router.post('/rates', async (req, res) => {
        await Rate.findByIdAndUpdate(req.body.rateId, {
            liner: req.body.liner,
                mode: req.body.mode,
                pol: req.body.pol, 
                pod: req.body.pod, 
                loading: req.body.loading,
                discharge: req.body.discharge,
                country: req.body.country,
                dep: req.body.dep,
                unit: req.body.unit,
                oft: req.body.oft,
                lss: req.body.lss,
                d_port: req.body.d_port,
                rail: req.body.rail,
                convoy: req.body.convoy,
                d_thc: req.body.d_thc,
                dpb: req.body.dpb,
                dps: req.body.dps,
                ttl: req.body.ttl,
                valid: req.body.valid,
                remark: req.body.remark
        }, {new: true}, (err, res) => {
           if (err) 
               console.log(err);

        });

        res.redirect('/rates');
    });



    router.post('/delrate', async (req, res) => {
        await Rate.findByIdAndDelete(req.body.delId, (err, res) => {
            if (err)
                return console.log(err);
        })

        res.redirect('/rates');
    });

    module.exports = router;

