import http from '@/assets/api/http.js'

export class ApiService {

  basicUrl = ""

  constructor (basicUrl) {
    this.basicUrl = basicUrl
  }

  //获取所有列表数据
  fetchAllSessions () {
    return http.get(this.basicUrl, '/proxy/session/')
  }
  fetchAllTcp () {
    return http.get(this.basicUrl, '/proxy/tcp/')
  }
  fetchAllUdp () {
    return http.get(this.basicUrl, '/proxy/udp/')
  }
  fetchAllHttp () {
    return http.get(this.basicUrl, '/proxy/http/')
  }
  fetchAllSettings () {
    return http.get(this.basicUrl, '/proxy/setting/')
  }
  // 创建一个
  createOneSession (data) {
    return http.post(this.basicUrl, '/proxy/session/',data)
  }
  createOneTcp (data) {
    return http.post(this.basicUrl, '/proxy/tcp/',data)
  }
  createOneUdp (data) {
    return http.post(this.basicUrl, '/proxy/udp/',data)
  }
  createOneHttp (data) {
    return http.post(this.basicUrl, '/proxy/http/',data)
  }
  createOneSetting (data) {
    return http.post(this.basicUrl, '/proxy/setting/',data)
  }
  createOneVPN (id) {
    return http.post(this.basicUrl, '/proxy/vpn/'+id)
  }
  // 获取一条数据的详情
  fetchOneSession (id) {
    return http.get(this.basicUrl, '/proxy/session/'+id)
  }
  fetchOneTcp (id) {
    return http.get(this.basicUrl, '/proxy/tcp/'+id)
  }
  fetchOneUdp (id) {
    return http.get(this.basicUrl, '/proxy/udp/'+id)
  }
  fetchOneHttp (id) {
    return http.get(this.basicUrl, '/proxy/http/'+id)
  }
  fetchOneSetting (id) {
    return http.get(this.basicUrl, '/proxy/setting/'+id)
  }
  // 删除一条数据
  deleteOneSession (id) {
    return http.delete(this.basicUrl, '/proxy/session/'+id)
  }
  deleteOneTcp (id) {
    return http.delete(this.basicUrl, '/proxy/tcp/'+id)
  }
  deleteOneUdp (id) {
    return http.delete(this.basicUrl, '/proxy/udp/'+id)
  }
  deleteOneHttp (id) {
    return http.delete(this.basicUrl, '/proxy/http/'+id)
  }
  deleteOneSetting (id) {
    return http.delete(this.basicUrl, '/proxy/setting/'+id)
  }
  deleteOneVPN () {
    return http.delete(this.basicUrl, '/proxy/vpn/')
  }
  //:TODO websocket 连接
}