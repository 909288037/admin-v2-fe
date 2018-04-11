import MUtil from 'src/util/index.jsx'

const _mm = new MUtil();

class Uesr {
    //  登录
    login(loginInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }

    //  检查登录信息是否合法
    checkLogin(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        //  判断用户名不能为空
        if (username.length === 0 || typeof username !== "string") {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        //  判断密码不能为空
        if (password.length === 0 || typeof password !== "string") {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }

//    退出登录
    logout() {
        return _mm.request({
            type: 'post',
            url: '/user/logout.do',
        })
    }
    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url : '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default Uesr