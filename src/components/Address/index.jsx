export default ({data={}, handleDel}) => {
  return(
    <View className="address-item">
      <View>
        <Text className="name">{data.userName}</Text>
        <Text className="tel">{data.telNumber}</Text>
      </View>
      <Text className="detail">{data.provinceName+data.cityName+data.countyName+data.detailInfo}</Text>
      <Image className="del" src={require('@/images/trash.png')} alt="删除" onClick={() => handleDel(data)} />
    </View>
  )
}