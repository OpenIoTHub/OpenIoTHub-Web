export class WsConnectionFactory {

  constructor (baseUrl, protocols) {
    this.baseUrl = baseUrl
    this.protocols = protocols
  }
  
  create (runId, remoteIp, remotePort, userName, passWord) {
    let uri = [
      'runId='+runId,
      'remoteIp='+remoteIp,
      'remotePort='+remotePort,
      'userName='+userName,
      'passWord='+passWord,
    ].join("&")
    return new WebSocket(this.baseUrl + '/proxy/ws/connect/ssh' + "?" + uri)
  }
}

