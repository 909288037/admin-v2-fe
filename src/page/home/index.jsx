import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'src/util/index.jsx';
import Statistic from 'src/service/statistic-service.jsx';
import PageTitel from 'components/page-title/index.jsx';
import './index.scss'

let _statistic = new Statistic();
let _mm = new MUtil();

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-',
        }

    }
    componentDidMount() {
        this.loadCount();
    }
    loadCount() {
        _statistic.getHomeCount().then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }

    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitel title={"首页"}/>
                <div className="row">
                    <div className="col-md-4">
                        <Link className={"color-box brown"} to={"/user"}>
                            <p className="count">{this.state.userCount}</p>
                            <p className={"desc"}>
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link className={"color-box green"} to={"/product"}>
                            <p className="count">{this.state.productCount}</p>
                            <p className={"desc"}>
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link className={"color-box blue"} to={"/order"}>
                            <p className="count">{this.state.orderCount}</p>
                            <p className={"desc"}>
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;