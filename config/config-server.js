var Config = function(){
  this.tweeterApiConfig = {
    consumer_key:         'FEMhF6O38MPXqIRMX63ojGEkB',
    consumer_secret:      'nRWHwkHeVK965SE5gNWvWgc7pMUg9qFYIn4Ss1bSYuirYUAIIN',
    access_token:         '896821440-bBMlOuSIAbcxZ3A2sl8i0ziEgoE7oenDlmGXBOTe',
    access_token_secret:  'rgSx2U3fmcTYfUsAX62JbZb9n0n0x1gWmK9fjwUNFxpyt',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  }
}

module.exports = function(){
  return new Config();
}
