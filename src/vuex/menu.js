export default {
  state: {
    menuList:'',
    headerActive:'',
    menuActive:'',
    menuData: {
      "工艺流程": [
        {
          name: '一级区域',
          icon: 'fa-video-camera',
          children: [
            {name: '电收尘', link: '/monitorPage'},
            {name: '一线窑头', link: '/monitorPage'},
            {name: '煤粉制备', link: '/monitorPage'},
            {name: '一线原料磨', link: '/monitorPage'},
            {name: '一线均化库', link: '/monitorPage'},
          ]
        },
        {
          name: '二线区域',
          icon: 'fa-video-camera',
          children: [
            {name: '二线烧成', link: '/monitorPage'},
            {name: '二线窑头', link: '/monitorPage'},
            {name: '煤粉制备', link: '/monitorPage'},
          ]
        },
        {
          name: '发电区域',
          icon: 'fa-video-camera',
          children: [
            {name: '一线汽轮机', link: '/monitorPage'},
            {name: '一线锅炉', link: '/monitorPage'},
            {name: '二线汽轮机', link: '/monitorPage'},
            {name: '二线锅炉', link: '/monitorPage'},
            {name: '纯水制备', link: '/monitorPage'},
          ]
        },
        {
          name: '公共区域',
          icon: 'fa-video-camera',
          children: [
            {name: '供水供暖', link: '/monitorPage'},
          ]
        },
        {
          name: '矿山区域',
          icon: 'fa-video-camera',
          children: [
            {name: '矿山工艺线', link: '/monitorPage'},
          ]
        },
        {
          name: '水泥区域',
          icon: 'fa-video-camera',
          children: [
            {name: '水泥磨工艺', link: '/monitorPage'},
            {name: '水泥入库', link: '/monitorPage'},
            {name: '水泥出库', link: '/monitorPage'},
          ]
        }
      ],
      "设备管理": [
        {
          name: '设备台账',
          link: '/equipmentLedger',
          children: [
            {name: '水泥磨工艺', link: '/equipmentDetails'},
            {name: '水泥入库', link: '/equipmentEdit'},
            {name: '水泥出库', link: '/equipmentUtil'},
          ]
        },
        {
          name: '设备实例',
          link: '/'
        },
        {
          name: '在用设备列表',
          link: '/'
        },
      ]
    }
  },
  mutations: {
  }
}
