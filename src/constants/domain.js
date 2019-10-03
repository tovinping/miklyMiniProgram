const DOMAIN = {
  development: 'http://192.168.2.101:4001',
  production: 'https://tovinping.cn/api/milky'
}
export default DOMAIN[process.env.NODE_ENV]