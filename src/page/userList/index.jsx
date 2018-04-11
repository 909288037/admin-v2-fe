import React from 'react';
import {Link} from 'react-router-dom';
import User from 'src/service/user-service/user-service.jsx';
import MUtil from 'src/util/index.jsx'

import PageTitle from 'components/page-title/index.jsx';
import Pagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';

const _mm = new MUtil();
let _user = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res,() => {
                this.setState({
                    firstLoading: false
                })
            })
            console.log(this.state);
        }, (errMsg) => {
            _mm.errorTips(errMsg)
        })
    }

    onChange(current, pageSize) {
        this.setState({
                pageNum: current
            }, () => {
                this.loadUserList()
            }
        )
        console.log('onChange:current=', current);
        console.log('onChange:pageSize=', pageSize);
    }

    render() {
        let listBody = (
            this.state.list.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleString()}</td>
                    </tr>
                )
            })
        )
        let listError = (
            <tr>
                <td colSpan={"5"} className={"text-center"}>{this.state.firstLoading ? "正在加载中...." : "暂无数据哦...."}</td>
            </tr>
        )
        let tableBody = this.state.list.length > 0 ? listBody : listError;
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"用户列表"}/>
                <div className="row">
                    <div className="col-md-12">
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>注册时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    hideOnSinglePage
                    showPrevNextJumpers
                    showQuickJumper
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={(pageNum) => this.onChange(pageNum)}
                    total={this.state.total}
                    current={this.state.pageNum}
                />
            </div>
        )
    }

}

export default UserList