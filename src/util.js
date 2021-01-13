export function getRedirectPath({ type, avatar }) {
  //根据用户信息
  //user。type /boss /genius
  //user.avatar /bossinfo /geniusinfo
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}
export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}

export function filterArr(Arr, src) {
  let newarr = {}
  return Arr.reduce((ok, item) => {
    // eslint-disable-next-line no-unused-expressions
    newarr[item[src]] ? '' : (newarr[item[src]] = true && ok.push(item))
    return ok
  }, [])
}
