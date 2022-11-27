import "./index.css";
import avatar from "./images/avatar.png";
import React from "react";
import { v4 as uuid } from "uuid";

// 时间格式化
function formatDate(time) {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
}

class App extends React.Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: "热度",
        type: "hot",
      },
      {
        id: 2,
        name: "时间",
        type: "time",
      },
    ],
    active: "hot",
    list: [
      {
        id: 1,
        author: "刘德华",
        comment: "给我一杯忘情水",
        time: new Date("2021-10-10 09:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
      },
      {
        id: 2,
        author: "周杰伦",
        comment: "哎哟，不错哦",
        time: new Date("2021-10-11 09:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
      },
      {
        id: 3,
        author: "五月天",
        comment: "不打扰，是我的温柔",
        time: new Date("2021-10-11 10:09:00"),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
      },
    ],
    comment: "请输入内容", //评论框的内容
  };

  // 切换Tab的回调函数
  switchTab = (type) => {
    //实现思路: 点击了那个tab 就将其作为当前得Tab,然后把type属性交给state中active
    this.setState({
      active: type,
    });
  };

  // 输入评论的回调函数
  textAreaChange = (e) => {
    // this.setState = { comment: e.target.value }; // 错误写法 **** 会导致无法输入
    this.setState({ comment: e.target.value });
    console.log("输入的comment是", this.state.comment);
  };

  // 提交评论的回调函数, 逻辑在于将comment的state 添加到 state list 中当做新的一项
  submitComment = () => {
    this.setState({
      list: [
        ...this.state.list,
        {
          // id: this.state.list.length + 1, // 可以使用uuid 这个包,生成独一无二的id
          id: uuid(),
          author: "谢霆锋",
          comment: this.state.comment,
          time: new Date(),
          // 1: 点赞 0：无态度 -1:踩
          attitude: 0,
        },
      ],
    });
  };

  // 删除评论的回调函数
  delComment = (id) => {
    // 使用filter 来过滤
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  };

  // 切换喜欢的回调函数
  changeAttitude = (currItem) => {
    // 1: 点赞 0：无态度 -1:踩
    const { attitude, id } = currItem;
    this.setState({
      list: this.state.list.map((item) => {
        // 如果点击的item,与遍历到的item匹配到了,就更新它的attitude
        if (item.id === id) {
          return {
            ...item,
            attitude: attitude === 1 ? 0 : 1,
          };
        } else {
          return item;
        }
      }),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序Tab */}
          <div className="tabs-order">
            <ul className="sort-container">
              {this.state.tabs.map((tab) => (
                <li
                  onClick={() => this.switchTab(tab.type)}
                  key={tab.id}
                  className={tab.type === this.state.active ? "on" : ""}
                >
                  按{tab.name}排序
                </li>
              ))}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            {/* 输入框,使用受控组件来进行控制,这样我们得state能够立即拿到 输入框得内容 */}
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textAreaChange}
              />
              <button className="comment-submit" onClick={this.submitComment}>
                发表评论
              </button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map((item) => (
              <div className="list-item" key={item.id}>
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{item.author}</div>
                  <p className="text">{item.comment}</p>
                  <div className="info">
                    <span className="time">{formatDate(item.time)}</span>
                    <span
                      onClick={() => this.changeAttitude(item)}
                      className={item.attitude === 1 ? "like liked" : "like"}
                    >
                      <i className="icon" />
                    </span>
                    <span
                      className={item.attitude === -1 ? "hate hated" : "hate"}
                    >
                      <i className="icon" />
                    </span>
                    <span
                      className="reply btn-hover"
                      onClick={() => this.delComment(item.id)}
                    >
                      删除
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
