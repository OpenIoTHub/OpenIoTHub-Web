export class WsUrlFactory {

  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  
  createSSH (runId, remoteIp, remotePort, userName, passWord) {
    let uri = [
      'runId='+runId,
      'remoteIp='+remoteIp,
      'remotePort='+remotePort,
      'userName='+userName,
      'passWord='+passWord,
    ].join("&")
    return new WebSocket(this.baseUrl + '/proxy/ws/connect/ssh' + "?" + uri)
  }

  createWebsockifyUrl (runId, remoteIp, remotePort) {
    let uri = [
      'runId='+runId,
      'remoteIp='+remoteIp,
      'remotePort='+remotePort,
    ].join("&")
    return this.baseUrl + '/proxy/ws/connect/websockify' + "?" + uri
  }
}

