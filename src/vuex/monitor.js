export default {
  state: {
    menuList:[
      {
        name: '一级区域',
        icon: 'fa-video-camera',
        children: [
          {name: '电收尘', link: '/monitorPage'},
          {name: '一线窑头', link: '/'},
          {name: '煤粉制备', link: '/'},
          {name: '一线原料磨', link: '/'},
          {name: '一线均化库', link: '/'},
        ]
      },
      {
        name: '二线区域',
        icon: 'fa-video-camera',
        link:'/'
      },
      {
        name: '发电区域',
        icon: 'fa-video-camera',
        children: [
          {name: '一线汽轮机', link: '/'},
          {name: '一线锅炉', link: '/'},
          {name: '二线汽轮机', link: '/'},
          {name: '二线锅炉', link: '/'},
          {name: '纯水制备', link: '/'},
        ]
      },
      {
        name: '公共区域',
        icon: 'fa-video-camera',
        children: [
          {name: '供水供暖', link: '/'},
        ]
      },
      {
        name: '矿山区域',
        icon: 'fa-video-camera',
        children: [
          {name: '矿山工艺线', link: '/'},
        ]
      },
      {
        name: '水泥区域',
        icon: 'fa-video-camera',
        children: [
          {name: '水泥磨工艺', link: '/'},
          {name: '水泥入库', link: '/'},
          {name: '水泥出库', link: '/'},
        ]
      }
    ],
    headerActive:'',
    menuActive:''
  },
  mutations: {
  }
}
