
    //let req = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=76eeab503841bf7dfe6e123f9b0a8b45ccd226b6ac3487fd840b0e93a532`;


    const Eth = require('ethjs');
    const provider = new Eth.HttpProvider('https://mainnet.infura.io');
    const BlockTracker = require('eth-block-tracker')
    const Suggestor = require('eth-gas-price-suggestor')
    
    const blockTracker = new BlockTracker({ provider })
    blockTracker.start()
    
    const suggestor = new Suggestor({
     blockTracker,
     historyLength: 10, // number of blocks to average, default 20.
     defaultPrice: 20000000000, // In case of network error. Default 20 gwei.
    })
    
    setInterval(async function() {
      try {
        const suggested = await suggestor.currentAverage()
        console.log('CURRENT SUGGESTION in GWEI: ' + Eth.fromWei(suggested, 'gwei'))
      } catch (e) {
        console.log('failed: ', e)
      }
    }, 10000)