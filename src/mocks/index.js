import Mock from 'mockjs';

Mock.mock('/api/users', 'get', (options) => {
    // options 参数包含了请求的详细信息，例如请求头、请求参数等
    console.log(options);
    // 从请求参数中获取具体的参数值
    // 进行相应的处理逻辑
    // ...
    // 返回模拟的响应数据
    return Mock.mock({
        data: {
            'users|5': [
                {
                    'id|+1': 1,
                    'name': '@cname',
                    'age|18-60': 1,
                    'gender|1': ['男', '女'],
                    'email': '@email',
                },
            ],
        }
    });
});

Mock.mock('/api/captcha', 'get', () => ({
    img: Mock.Random.dataImage('100x40', Mock.Random.string('0123456789abcdefghijklmnopqrstuvwxyz', 4)),
    uuid: Mock.mock('@guid')
}))

Mock.mock('/api/login', 'post', () => {
    return {
        username: 'Yasuo',
        token: Mock.mock(/[a-fA-F0-9]{32}/)

    }
})

Mock.setup({
    timeout: '2000-3000'
})
