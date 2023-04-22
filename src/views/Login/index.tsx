import { useEffect } from 'react'
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '@/types/index'
import { selectCaptcha, fetchCaptcha } from '@/store/captchaSlice'
import { getLogin } from '@/store/userSlice'


import initBg from './init.ts'
import styles from './index.module.scss'
import './index.scss'

type Props = {}



const Login = (props: Props) => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const data = useAppSelector(selectCaptcha)
    const dispatch = useAppDispatch()

    // 事件处理
    const handleClick = () => {
        dispatch(fetchCaptcha())
    }

    const onFinishFailed = (errorInfo: any) => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    const onFinish = async (values: {
        username: string,
        password: string,
        code: string
    }) => {
        const { type } = await dispatch(getLogin({
            ...values,
            uuid: localStorage.getItem('uuid')!
        }))
        // 成功跳转
        if (type.includes('/fulfilled')) {
            navigate('/')
        }

    };

    //  背景初始化
    useEffect(() => {
        initBg()
        window.onresize = () => {
            initBg()
        }
    }, [])

    // 获取验证码图片
    useEffect(() => {
        dispatch(fetchCaptcha())
    }, [])

    return (
        <div className={styles.loginPage}>
            {contextHolder}
            <canvas id='canvas' style={{ display: 'block' }}></canvas>
            <div className={styles.loginBox + ' loginBox'}>
                <div className={styles.title}>
                    <h1>Management</h1>
                </div>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="密码" />

                    </Form.Item>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: 'Please input your captcha!' }]
                                }
                            >
                                <Input placeholder="验证码" />
                            </Form.Item></Col>
                        <Col span={6} offset={2}>
                            <img src={data.img} style={{
                                width: '100%',
                                height: 30,
                                cursor: 'pointer'
                            }} alt="captcha" onClick={handleClick} />
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Login