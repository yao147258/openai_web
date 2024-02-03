import {GptVersion} from "@/app/constants";
import {useAccessStore} from "@/app/store/access";
import {MessageRole} from "@/types/chat";
import {DashScopeModel} from "../app/constants";

// 构建前把localhost修改为你的公网IP或者域名地址
// const apiHostUrl = "http://localhost:8080";

// const apiHostUrl = "http://47.96.81.41:80";
const apiHostUrl = "http://172.17.0.7:80";

/**
 * Header 信息
 */
function getHeaders() {
    const accessState = useAccessStore.getState()

    const headers = {
        token: accessState.token,
        'Content-Type': 'application/json;charset=utf-8'
    }

    return headers
}

/**
 * Role 角色获取接口
 */
export const getRoleList = () => {
    // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) => res.json());
};

/**
 * 流式应答接口
 * @param data
 */
export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: DashScopeModel
}) => {
    return fetch(`${apiHostUrl}/openAi/completionStream`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
};

/**
 * 登录鉴权接口
 * @param token
 */
export const login = (token: string) => {
    const accessState = useAccessStore.getState()
    return fetch(`${apiHostUrl}/auth/doLogin/` + `${accessState.accessCode}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // body: `code=${accessState.accessCode}`,
    });
};

/**
 * 商品列表查询
 */
export const queryProductList = () => {
    return fetch(`${apiHostUrl}/product/queryPage`, {
        method: "post",
        headers: getHeaders(),
        body: JSON.stringify({page: 1, limit: 100})
    });
}

/**
 * 用户商品下单，获得支付地址 url
 */
export const createPayOrder = (productId: number) => {
    return fetch(`${apiHostUrl}/order/createOrder?goodsId=${productId}&payChannel=0`, {
        method: "get",
        headers: getHeaders()
    });
}


