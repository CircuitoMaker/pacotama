const correios = require('correios-rastreamento')

correios.sroV2.rastrearObjeto('QC392769152BR').then(function(res){
    console.log(res)
    //console.log(res.status_list[4].status)
})


// para executar -> node public/javascripts/home.js