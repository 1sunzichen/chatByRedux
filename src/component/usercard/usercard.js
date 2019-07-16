import React from 'react';
import {Card, WingBlank,WhiteSpace} from 'antd-mobile';
import Proptypes from 'prop-types';
class Usercard extends React.Component{
    static propTypes={
        userlists:Proptypes.array.isRequired
    }
    constructor(props){
        super(props);
    }
    handleChick(v){
        console.log(v,this.props);
        this.props.history.push(`/chat/${v._id}`)
        
    }
    render(){
        console.log(this.props.userlists);
        
        return(
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlists?this.props.userlists.map(v=>(
                    v.avatar?<Card key={v._id}
                        onClick={()=>this.handleChick(v)}
                     >
                        <Card.Header
                            className="headerCard"
                            title={v.user}
                            thumb={require(`../../component/image/${v.avatar}.jpg`)}
                        ></Card.Header>
                        <Card.Body>
                            <div>
                                {v.desc.split('\n').map(vItem=>(
                                    <div key={vItem}>{vItem}</div>
                                ))}
                                {v.type=="boss"?<div>薪资:{v.money}</div>:null}
                                {v.type=="boss"?<div>公司:{v.company}</div>:null}
                            </div>
                        </Card.Body>
                    </Card>:null
                )):null}
            </WingBlank>
        )
    }
}
export default Usercard;