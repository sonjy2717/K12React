import React, { Component } from 'react';

class ViewContents extends Component {
    //상세보기 처리를 위한 state생성. bview는 객체형태로 초기화
    state = {
        bview : {
        content : "여긴 내용"
        }
    };

    //props로 전달된 num을 통해 서버로 상세보기 내용 요청
    componentDidMount() {
        fetch('http://localhost:8081/jsonrestapi/restapi/boardView.do?num=' + this.props.num)
        .then((result) => {
            return result.json();
        })
        .then((json) => {
            console.log(json);
            //콜백데이터를 통해 state변경 및 렌더링
            this.setState({bview:json});
        });
    }


    render() {
        console.log("ViewContents->num", this.props.num)
        return (
            <div className='col-10' id='lay_contents'>
                <h3>게시판 내용보기</h3>
                <table className='table table-bordered'>
                <tbody>
                <tr>
                    <td>번호</td>
                    <td>{this.state.bview.num}</td>
                    <td>작성자</td>
                    <td>{this.state.bview.id}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td>{this.state.bview.postdate}</td>
                    <td>조회수</td>
                    <td>{this.state.bview.visitcount}</td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td colSpan="3">{this.state.bview.title}</td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td colSpan="3" height="100">{
                        this.state.bview.content.split('\n').map(line => {
                            return (
                                <span key={Math.random()}>{line}<br /></span>
                            );
                        })
                    }</td>
                </tr>
                <tr>
                    <td colSpan="4" align="center">
                    <button type='button' onClick={(e) => {
                        e.preventDefault();
                        //부모가 props를 통해 전달해준 함수를 통해 목록으로 화면전환
                        this.props.myBoardList('list');
                    }}>목록보기</button>
                    </td>
                </tr>
                </tbody>
                </table>
            </div>
        );
    }
}

export default ViewContents;