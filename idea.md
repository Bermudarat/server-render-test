### serverEntity
服务端渲染
1. 根据url匹配路由，决定渲染组件（match）
2. 获取组件的static方法，获取数据之后，进行服务端渲染，并将state防止在window上（全局），方便client渲染。
3. 客户端根据props，将其传递给下层组件，使其初始化。
