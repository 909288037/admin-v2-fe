import React from 'react'
import MUtil from 'src/util/index.jsx'
import User from 'src/service/user-service/user-service.jsx';
import "./index.scss"

let _user = new User();
const _mm = new MUtil();


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
            // isH: true
        }
    }
    componentWillMount() {
       document.title = "登录 - MMALL ADMIN"
    }
    onInputChange(e) {
        // let reg = /^[a-zA-Z0-9_-]{4,16}$/;
        // if (!reg.test(e.target.value)) {
        //     this.setState({isH: false})
        //     return;
        // }
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue,
            // isH: true
        })
    }

    onSubmit(e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
        checkResult = _user.checkLogin(loginInfo);
        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                _mm.setStorage("userInfo",res)
                    this.props.history.push(this.state.redirect)
                },
                (errMsg) => {
                    _mm.errorTips(errMsg);
                }
            )
        }else {
            _mm.errorTips(checkResult.msg);
        }

    }
    onInputKeyup(e) {
        if (e.keyCode === 13) {
            this.onSubmit()
        }
    }
    render() {
        return (
            <div className={"row"}>
                <div className="col-md-4 login-panel">
                    <div className="panel panel-default ">
                        <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">用户名:</label>
                                    <input type="text" className="form-control" name={"username"} placeholder="请输入用户名"
                                           onChange={(e) => {
                                               this.onInputChange(e)
                                           }}
                                           onKeyUp={(e) => {this.onInputKeyup(e)}}
                                    />
                                    {/*<span style={{color:"red"}} hidden={this.state.isH}>帐号不符合规则哦</span>*/}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">密码:</label>
                                    <input type="password" className="form-control" name={"password"}
                                           placeholder="请输入密码"
                                           onChange={(e) => {
                                               this.onInputChange(e)
                                           }}
                                           onKeyUp={(e) => {this.onInputKeyup(e)}}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block"
                                        onClick={(e) => this.onSubmit(e)}>登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;