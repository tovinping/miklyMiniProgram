import { Swiper, SwiperItem, Image } from '@tarojs/components';
// 这里接收的props要给初始值,因为子组件要比父组件选渲染
export default function ({banner = []}) {
  return (
    <Swiper
      circular
      indicatorDots
      indicatorColor="#999"
      indicatorActiveColor="#bf708f"
      autoplay
    >
      {banner.map(item => (
        <SwiperItem key={item}>
          <Image mode="widthFix" src={item} style={{width: '100%'}} />
        </SwiperItem>
      ))}
    </Swiper>
  );
}
